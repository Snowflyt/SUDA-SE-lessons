"""Pyspark solution for the problem.
"""

import time
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count
from pyspark.sql.types import StructType, StructField, LongType
from pyspark.sql.window import Window

from dataset_scale import DatasetScale

if __name__ == '__main__':

    DATASET_SCALE = DatasetScale.BIG
    OUTPUT_PATH = "data/result.txt"

    start = time.time()

    spark = (SparkSession
             .builder
             .appName("PysparkSolution")
             .master("local[*]")
             .getOrCreate())

    paths = []
    for folder in (DATASET_SCALE.value.data_folder_a,
                   DATASET_SCALE.value.data_folder_b):
        for i in range(1000, 1000 + DATASET_SCALE.value.file_num):
            paths.append(f'{folder}/part_{i}')

    schema = StructType([
        StructField("c1", LongType(), nullable=False),
        StructField("c2", LongType(), nullable=False),
        StructField("c3", LongType(), nullable=False)
    ])
    df = spark.read.schema(schema).option("delimiter", "|").csv(paths)

    window = Window.partitionBy("sum")
    result = (df
              .withColumn("sum", col("c1") + col("c2") + col("c3"))
              .withColumn("dupeCount", count("*").over(window))
              .where(col("dupeCount") > 1)
              .drop("dupeCount")
              .sort(col("sum"))
              .collect())

    end = time.time()
    print(f'Spark spent: {(end - start) / 1000} s')
    print(f'{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}')

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        f.writelines(f'{row[3]} {row[0]}|{row[1]}|{row[2]}\n' for row in result)
