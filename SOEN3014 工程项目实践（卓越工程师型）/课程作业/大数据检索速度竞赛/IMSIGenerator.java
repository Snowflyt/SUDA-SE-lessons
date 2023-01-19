import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


enum DatasetScale {
    BIG, SMALL, TINY
}

/**
 * @author wangyan
 *
 */
public class IMSIGenerator {

    private static final Logger LOGGER = LoggerFactory.getLogger(IMSIGenerator.class);

    private static final String DATA_DIR = "data/";

    private static final long ACCOUNT_BIG = 5000 * 10000 * 10L;

    private static final int FILENUM_BIG = 200;

    private static final long ACCOUNT_SMALL = ACCOUNT_BIG / 10;

    private static final int FILENUM_SMALL = FILENUM_BIG / 10;

    private static final long ACCOUNT_TINY = ACCOUNT_BIG / 100;

    private static final int FILENUM_TINY = FILENUM_BIG / 100;

    private static void createAccountData(long accountNum, String dir, int fileNum) {
        File dataDir = new File(dir);
        if (!dataDir.exists()) {
            dataDir.mkdirs();
        }
        try {
            long idx = 0;
            long key = 100_000_000_000L * fileNum;
            for (int i = 1000; i < (1000 + fileNum); i++) {
                String filename = dir + "/part_" + i;
                File f = new File(filename);

                boolean flag = f.createNewFile();
                if (!flag) {
                    LOGGER.info("File {} already exists.", filename);
                }

                try (OutputStreamWriter write = new OutputStreamWriter(new FileOutputStream(f));
                        BufferedWriter writer = new BufferedWriter(write);) {
                    long singleFileAccount = accountNum / fileNum;
                    LOGGER.info(
                            "Begin Write [{}] Single File Lines Count={}",
                            f.getAbsolutePath(),
                            singleFileAccount);

                    for (long j = 0; j < singleFileAccount; j++) {
                        long left = (long) (key + Math.random() * key);
                        long center = (long) (key + Math.random() * key);
                        long right = (long) (key + Math.random() * key);
                        String content = left + "|" + center + "|" + right;
                        writer.write(content);
                        writer.write("\n");

                        if (idx % 500_000 == 0) {
                            LOGGER.info("{}:{}=>{}=>{}", idx, left, center, right);
                        }

                        idx++;
                    }
                    writer.flush();
                }

                LOGGER.info("Write file complete! {}\n", f.getAbsolutePath());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static void generateDataSet(DatasetScale scale) {
        long accountNum = 0;
        int fileNum = 0;
        switch (scale) {
            case BIG:
                accountNum = ACCOUNT_BIG;
                fileNum = FILENUM_BIG;
                break;
            case SMALL:
                accountNum = ACCOUNT_SMALL;
                fileNum = FILENUM_SMALL;
                break;
            case TINY:
                accountNum = ACCOUNT_TINY;
                fileNum = FILENUM_TINY;
                break;
            default:
                break;
        }

        long start = Calendar.getInstance().getTimeInMillis();
        createAccountData(accountNum, DATA_DIR + "account_db_" + scale.name().toLowerCase() + "_a", fileNum);
        createAccountData(accountNum, DATA_DIR + "account_db_" + scale.name().toLowerCase() + "_b", fileNum);
        long end = Calendar.getInstance().getTimeInMillis();
        String name = scale.name();
        LOGGER.info("Generate dataset {} cost {} ms\n\n", name, end - start);
    }

    public static void main(String[] args) {
        // generateDataSet(DatasetScale.BIG);
        generateDataSet(DatasetScale.SMALL);
        generateDataSet(DatasetScale.TINY);
    }

}
