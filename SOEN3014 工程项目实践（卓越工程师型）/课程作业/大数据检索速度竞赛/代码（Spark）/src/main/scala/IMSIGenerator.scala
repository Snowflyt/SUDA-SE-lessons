import com.typesafe.scalalogging.StrictLogging

import java.io.{BufferedWriter, File, FileOutputStream, OutputStreamWriter}
import java.util.Calendar

object IMSIGenerator extends App with StrictLogging :

  generateDataSet(DatasetScale.BIG)
  generateDataSet(DatasetScale.SMALL)
  generateDataSet(DatasetScale.TINY)

  def generateDataSet(scale: DatasetScale): Unit =
    val start = Calendar.getInstance.getTimeInMillis
    createAccountData(scale.ACCOUNT_NUM, scale.DATA_FOLDER_A, scale.FILE_NUM)
    createAccountData(scale.ACCOUNT_NUM, scale.DATA_FOLDER_B, scale.FILE_NUM)
    val end = Calendar.getInstance.getTimeInMillis
    val name = scale.toString
    logger.info(s"Generate dataset $name cost ${end - start} ms\n\n")

  def createAccountData(accountNum: Long, dir: String, fileNum: Int): Unit =
    val dataDir = new File(dir)
    if !dataDir.exists then
      val flag = dataDir.mkdirs
      if (!flag)
        logger.error(s"create dir $dir failed")
        return None

    try
      var idx = 0
      val key = 100_000_000_000L * fileNum
      for i <- 1000 until (1000 + fileNum) do
        val filename = dir + "/part_" + i
        val f = new File(filename)

        val flag = f.createNewFile
        if !flag then
          logger.info(s"File $filename already exists.")

        val write = new OutputStreamWriter(new FileOutputStream(f))
        val writer = new BufferedWriter(write)
        try
          val singleFileAccount = accountNum / fileNum
          logger.info(s"Begin Write [${f.getAbsolutePath}] Single File Lines Count=$singleFileAccount")

          for _ <- 0L until singleFileAccount do
            val left = (key + Math.random * key).toLong
            val center = (key + Math.random * key).toLong
            val right = (key + Math.random * key).toLong
            val content = s"$left|$center|$right"
            writer.write(content)
            writer.write("\n")

            if idx % 500_000 == 0 then
              logger.info(s"$idx:$left=>$center=>$right")

            idx += 1

          writer.flush()
        finally
          if write != null then
            write.close()
          if writer != null then
            writer.close()

        logger.info(s"Write file complete! ${f.getAbsolutePath}\n")
    catch
      case e: Exception =>
        e.printStackTrace()
