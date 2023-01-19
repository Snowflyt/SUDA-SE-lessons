import org.apache.spark.sql.SparkSession
import org.apache.spark.sql.expressions.Window
import org.apache.spark.sql.functions.*
import org.apache.spark.sql.types.{LongType, StructField, StructType}

import java.nio.file.{Files, Path}

object SparkSolution extends App :

  val DATASET_SCALE = DatasetScale.BIG
  val OUTPUT_PATH = "data/result.txt"

  val start = System.currentTimeMillis()

  val spark = SparkSession
    .builder()
    .appName("SparkSolution")
    .master("local[*]")
    .getOrCreate()

  val paths = List(DATASET_SCALE.DATA_FOLDER_A, DATASET_SCALE.DATA_FOLDER_B)
    .flatMap(folder => Range(1000, 1000 + DATASET_SCALE.FILE_NUM).map(i => s"$folder/part_$i"))

  val schema = StructType(List(
    StructField("c1", LongType, nullable = false),
    StructField("c2", LongType, nullable = false),
    StructField("c3", LongType, nullable = false)
  ))
  val df = spark.read.schema(schema).option("delimiter", "|").csv(paths *)

  val window = Window.partitionBy("sum")
  val result = df
    .withColumn("sum", col("c1") + col("c2") + col("c3"))
    .withColumn("dupeCount", count("*").over(window))
    .where(col("dupeCount") > 1)
    .drop("dupeCount")
    .sort(col("sum"))
    .collect()

  var end = System.currentTimeMillis()
  println(s"Spark spent: ${(end - start) / 1000.0} s")

  Files.write(
    Path.of(OUTPUT_PATH),
    result
      .map(row => s"${row(3)} ${row(0)}|${row(1)}|${row(2)}")
      .mkString("\n")
      .getBytes
  )

  end = System.currentTimeMillis()
  println(s"Total time spent: ${(end - start) / 1000.0} s")
