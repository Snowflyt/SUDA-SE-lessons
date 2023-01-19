import com.typesafe.scalalogging.StrictLogging

import scala.jdk.CollectionConverters.*
import java.io.PrintWriter
import java.nio.file.{DirectoryStream, Files, Path, Paths}
import java.util


object IoDivisionSolution extends App with StrictLogging :

  val DATASET_SCALE = DatasetScale.BIG
  val PART_SIZE = 100_000_000_000L
  val CACHE_FOLDER_A = "data/cache_a"
  val CACHE_FOLDER_B = "data/cache_b"
  val OUTPUT_PATH = "data/result.txt"

  val generateKey = 100_000_000_000L * DATASET_SCALE.FILE_NUM

  val totalStart = System.currentTimeMillis

  logger.info("Caching data...\n")
  var start = System.currentTimeMillis

  val (writersA, writersB) = generateCacheFiles(generateKey)
  for (folder, writers) <- List(
    (DATASET_SCALE.DATA_FOLDER_A, writersA),
    (DATASET_SCALE.DATA_FOLDER_B, writersB)
  ) do
    cacheData(folder, writers)
    writers.values.foreach(_.close())

  var end = System.currentTimeMillis
  logger.info(s"Caching finished in ${(end - start) / 1000.0} seconds\n\n")

  logger.info("Outputting duplicated data...")
  start = System.currentTimeMillis

  val lo = 3L * generateKey
  val hi = 2L * lo
  val result = for i <- lo until hi by PART_SIZE yield
    val pathA = Paths.get(CACHE_FOLDER_A, i.toString)
    val pathB = Paths.get(CACHE_FOLDER_B, i.toString)
    // print progress
    logger.info(s"Progress ${(i - lo) / PART_SIZE + 1}/${(hi - lo) / PART_SIZE}")
    findDuplicatedData(pathA, pathB)

  Files.write(Paths.get(OUTPUT_PATH), result.flatten.mkString("\n").getBytes())

  end = System.currentTimeMillis
  logger.info(s"Outputting finished in ${(end - start) / 1000.0} seconds\n\n")

  val totalEnd = System.currentTimeMillis
  logger.info(s"Task finished in ${(totalEnd - totalStart) / 1000.0} seconds")

  /**
   * Generate cache files of dataset a and b in cache folder
   *
   * @param key the key to generate cache files
   * @return (writersA, writersB)
   */
  def generateCacheFiles(key: Long): (Map[Long, PrintWriter], Map[Long, PrintWriter]) =
    val lo = 3 * key
    val hi = 2 * lo

    // create cache folder (if already exists, it will be deleted)
    for folder <- List(CACHE_FOLDER_A, CACHE_FOLDER_B) do
      val path = Paths.get(folder)
      if Files.exists(path) then
        // delete all files in the path
        val stream = Files.newDirectoryStream(path)
        stream.forEach(p => Files.delete(p))
      else
        Files.createDirectory(path)

    // create cache files and return writers of cache folder A and B
    List(CACHE_FOLDER_A, CACHE_FOLDER_B)
      .map(folder => for i <- lo until hi by PART_SIZE yield
        val path = Paths.get(folder, i.toString)
        val writer = new PrintWriter(path.toFile)
        (i -> writer)
      )
      .map(_.toMap) match
      case List(a, b) => (a, b)
      case _ => throw new Exception("Unexpected error")

  /**
   * Cache data from data folder to cache files
   *
   * @param dataFolder the folder of source data
   * @param writers    writers of cache files
   */
  def cacheData(dataFolder: String, writers: Map[Long, PrintWriter]): Unit =
    for i <- 0 until DATASET_SCALE.FILE_NUM do
      val start = System.currentTimeMillis

      val input = Paths.get(dataFolder, String.format("part_1%03d", i))
      logger.info(s"Reading $input")

      // read data and store to cache
      val lines = Files.readAllLines(input)
      for j <- 0 until lines.size do
        val line = lines.get(j)
        val sum = line.split("\\|", 3).map(_.toLong).sum

        // print data to cache file
        writers
          .getOrElse(sum / PART_SIZE * PART_SIZE, throw new RuntimeException("No writer found"))
          .println(sum + " " + line)

        // print progress
        if j % 500_000L == 500_000L - 1L then
          logger.info(s"Progress: ${j + 1}/${lines.size}")

      logger.info("Flushing data to disk...")

      val end = System.currentTimeMillis
      logger.info(s"Reading finished in ${(end - start) / 1000.0} seconds\n")

  /**
   * Find duplicated data from two cache files
   *
   * @param pathA path of cache file a
   * @param pathB path of cache file b
   * @return duplicated data
   */
  def findDuplicatedData(pathA: Path, pathB: Path): List[String] =
    List(pathA, pathB)
      .flatMap(Files.readAllLines(_).asScala
        .map(line => line.splitAt(line.indexOf(" ")))
        .map(pair => (pair._1.toLong, pair._2))
      )
      .groupBy(_._1)
      .filter(_._2.size > 1)
      .toList
      .sortBy(_._1)
      .reverse
      .flatMap(_._2)
      .map(pair => s"${pair._1} ${pair._2}")
