import kotlinx.coroutines.*
import mu.KotlinLogging
import one.util.streamex.StreamEx
import org.apache.commons.lang3.StringUtils
import java.io.PrintWriter
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.stream.Collectors

private val LOGGER = KotlinLogging.logger {}

private const val OUTPUT_PATH = "data/result.txt"
private const val PART_SIZE = 100000000000L
private const val FILE_NUM = 200
private const val DATA_FOLDER_A = "data/account_db_big_a"
private const val DATA_FOLDER_B = "data/account_db_big_b"
private const val CACHE_FOLDER_A = "data/cache_a"
private const val CACHE_FOLDER_B = "data/cache_b"

fun main() {
    val generateKey = 100000000000L * FILE_NUM

    val totalStart = System.currentTimeMillis()

    LOGGER.info { "Caching data...\n" }
    var start = System.currentTimeMillis()

    val (cacheWritersA, cacheWritersB) = generateCacheFiles(generateKey)
    listOf(
        Pair(DATA_FOLDER_A, cacheWritersA), Pair(DATA_FOLDER_B, cacheWritersB)
    ).forEach { (dataFolder, cacheWriters) -> cacheData(dataFolder, cacheWriters) }
    listOf(cacheWritersA, cacheWritersB).flatMap { it.values }.forEach { it.close() }

    var end = System.currentTimeMillis()
    LOGGER.info { "Caching finished in ${(end - start) / 1000.0} seconds\n\n" }

    LOGGER.info { "Outputting duplicated data..." }
    start = System.currentTimeMillis()

    val resultWriter = PrintWriter(OUTPUT_PATH, "UTF-8")
    for (i in 3 * generateKey until 6 * generateKey step PART_SIZE) {
        val pathA = Paths.get(CACHE_FOLDER_A, i.toString())
        val pathB = Paths.get(CACHE_FOLDER_B, i.toString())
        findDuplicatedDataAndOutput(pathA, pathB, resultWriter)
        // print progress
        LOGGER.info { "Progress: ${(i - 3 * generateKey) / PART_SIZE + 1} / ${3 * generateKey / PART_SIZE}" }
    }
    resultWriter.close()

    end = System.currentTimeMillis()
    LOGGER.info { "Outputting finished in ${(end - start) / 1000.0} seconds\n\n" }

    start = System.currentTimeMillis()
    LOGGER.info { "Sorting result..." }

    sortResult()

    end = System.currentTimeMillis()
    LOGGER.info { "Sorting finished in ${(end - start) / 1000.0} seconds\n\n" }

    val totalEnd = System.currentTimeMillis()
    LOGGER.info { "Task finished in ${(totalEnd - totalStart) / 1000.0} seconds" }
}

private fun sortResult() {
    val path = Paths.get(OUTPUT_PATH)
    val sorted = Files.lines(path).sorted { o1, o2 -> -o1.toLong().compareTo(o2.toLong()) }.collect(Collectors.toList())
    Files.write(path, sorted)
}

private fun findDuplicatedDataAndOutput(pathA: Path, pathB: Path, writer: PrintWriter) {
    val start = System.currentTimeMillis()
    LOGGER.info { "Calculating duplicated data of $pathA and $pathB..." }

    // StreamEx.of(Files.lines(path)).parallel().distinct(2).forEach { writer.println(it) }
    val bCache = Files.lines(pathB).parallel().collect(Collectors.toSet())
    val aCache = Files.lines(pathA).parallel().filter { bCache.contains(it) }.collect(Collectors.toSet())
    aCache.forEach { writer.println(it) }

    val end = System.currentTimeMillis()
    LOGGER.info { "Calculating duplicated data of $pathA and $pathB finished in ${(end - start) / 1000.0} seconds" }
}

private fun generateCacheFiles(key: Long): Pair<Map<Long, PrintWriter>, Map<Long, PrintWriter>> {
    val lo = 3 * key
    val hi = 2 * lo

    // create cache folder (if already exists, it will be deleted)
    for (cacheFolder in listOf(CACHE_FOLDER_A, CACHE_FOLDER_B)) {
        val path = Paths.get(cacheFolder)
        if (Files.exists(path)) {
            Files.newDirectoryStream(path).use { stream ->
                stream.forEach { p -> Files.delete(p) }
            }
        } else {
            Files.createDirectory(path)
        }
    }

    return Pair((lo until hi step PART_SIZE).associateWith { PrintWriter("$CACHE_FOLDER_A/$it") },
        (lo until hi step PART_SIZE).associateWith { PrintWriter("$CACHE_FOLDER_B/$it") })
}

private suspend fun cacheLine(line: String, writers: Map<Long, PrintWriter>) = coroutineScope {
    val sum = StringUtils.split(line, "|", 3).sumOf { it.toLong() }
    writers[sum / PART_SIZE * PART_SIZE]!!.println("$sum")
}

private suspend fun cacheFile(path: Path, writers: Map<Long, PrintWriter>) = coroutineScope {
    withContext(Dispatchers.IO) {
        LOGGER.info { "Reading $path..." }
        val start = System.currentTimeMillis()

        Files.newBufferedReader(path).use { reader ->
            var line = reader.readLine()
            while (line != null) {
                cacheLine(line, writers)
                line = reader.readLine()
            }
        }

        val end = System.currentTimeMillis()
        LOGGER.info { "Caching $path finished in ${(end - start) / 1000.0} seconds" }
    }
}

private fun cacheData(dataFolder: String, writers: Map<Long, PrintWriter>) = runBlocking {
    withContext(Dispatchers.IO) { Files.newDirectoryStream(Paths.get(dataFolder)) }.forEach { path ->
        launch { cacheFile(path, writers) }
    }
}
