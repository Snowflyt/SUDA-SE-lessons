import mu.KotlinLogging
import java.io.BufferedWriter
import java.io.File
import java.io.FileOutputStream
import java.io.OutputStreamWriter
import java.util.Calendar
import java.util.Locale

private val LOGGER = KotlinLogging.logger {}

private const val DATA_DIR = "data/"
private const val ACCOUNT_BIG = 5000 * 10000 * 10L
private const val FILENUM_BIG = 200
private const val ACCOUNT_SMALL = ACCOUNT_BIG / 10
private const val FILENUM_SMALL = FILENUM_BIG / 10
private const val ACCOUNT_TINY = ACCOUNT_BIG / 100
private const val FILENUM_TINY = FILENUM_BIG / 100

fun main() {
    generateDataSet(DatasetScale.BIG)
    generateDataSet(DatasetScale.SMALL)
    generateDataSet(DatasetScale.TINY)
}

private fun createAccountData(accountNum: Long, dir: String, fileNum: Int) {
    val dataDir = File(dir)
    if (!dataDir.exists()) {
        dataDir.mkdirs()
    }
    try {
        var idx = 0L
        val key = 100000000000L * fileNum
        for (i in 1000 until (1000 + fileNum)) {
            val filename = "$dir/part_$i"
            val f = File(filename)
            val flag = f.createNewFile()
            if (!flag) {
                LOGGER.info { "File $filename already exists." }
            }
            OutputStreamWriter(FileOutputStream(f)).use { write ->
                BufferedWriter(write).use { writer ->
                    val singleFileAccount = accountNum / fileNum
                    LOGGER.info { "Begin Write [${f.absolutePath}] Single File Lines Count=$singleFileAccount" }
                    for (j in 0 until singleFileAccount) {
                        val left = (key + Math.random() * key).toLong()
                        val center = (key + Math.random() * key).toLong()
                        val right = (key + Math.random() * key).toLong()
                        val content = "$left|$center|$right"
                        writer.write(content)
                        writer.write("\n")
                        if (idx % 500000 == 0L) {
                            LOGGER.info { "$idx:$left=>$center=>$right" }
                        }
                        idx++
                    }
                    writer.flush()
                }
            }
            LOGGER.info { "Write file complete! ${f.absolutePath}\n" }
        }
    } catch (e: Exception) {
        e.printStackTrace()
    }
}

private fun generateDataSet(scale: DatasetScale) {
    val accountNum: Long
    val fileNum: Int
    when (scale) {
        DatasetScale.BIG -> {
            accountNum = ACCOUNT_BIG
            fileNum = FILENUM_BIG
        }

        DatasetScale.SMALL -> {
            accountNum = ACCOUNT_SMALL
            fileNum = FILENUM_SMALL
        }

        DatasetScale.TINY -> {
            accountNum = ACCOUNT_TINY
            fileNum = FILENUM_TINY
        }
    }
    val start = Calendar.getInstance().timeInMillis
    createAccountData(
        accountNum, DATA_DIR + "account_db_" + scale.name.lowercase(Locale.getDefault()) + "_a", fileNum
    )
    createAccountData(
        accountNum, DATA_DIR + "account_db_" + scale.name.lowercase(Locale.getDefault()) + "_b", fileNum
    )
    val end = Calendar.getInstance().timeInMillis
    LOGGER.info { "Generate dataset ${scale.name} cost ${end - start} ms\n\n" }
}
