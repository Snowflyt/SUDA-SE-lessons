enum DatasetScale(val ACCOUNT_NUM: Long,
                  val FILE_NUM: Int,
                  val DATA_FOLDER_A: String,
                  val DATA_FOLDER_B: String):

  case BIG extends DatasetScale(
    5000 * 10000 * 10L,
    200,
    "data/account_db_big_a",
    "data/account_db_big_b"
  )

  case SMALL extends DatasetScale(
    BIG.ACCOUNT_NUM / 10,
    BIG.FILE_NUM / 10,
    "data/account_db_small_a",
    "data/account_db_small_b"
  )

  case TINY extends DatasetScale(
    BIG.ACCOUNT_NUM / 100,
    BIG.FILE_NUM / 100,
    "data/account_db_tiny_a",
    "data/account_db_tiny_b"
  )
