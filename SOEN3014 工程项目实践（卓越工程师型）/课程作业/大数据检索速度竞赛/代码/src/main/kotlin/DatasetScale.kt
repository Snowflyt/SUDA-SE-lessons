enum class DatasetScale(
    val accountNum: Long,
    val fileNum: Int,
    val dataFolderA: String,
    val dataFolderB: String
) {

    BIG(
        5000 * 10000 * 10L,
        200,
        "data/account_db_big_a",
        "data/account_db_big_b"
    ),

    SMALL(
        BIG.accountNum / 10,
        BIG.fileNum / 10,
        "data/account_db_small_a",
        "data/account_db_small_b"
    ),

    TINY(
        BIG.accountNum / 100,
        BIG.fileNum / 100,
        "data/account_db_tiny_a",
        "data/account_db_tiny_b"
    )

}
