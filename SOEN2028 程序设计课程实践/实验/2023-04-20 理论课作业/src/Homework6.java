import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Homework6 {
    private static final int READ_TIMES = 6;

    private static final Path SOURCE_PATH = Paths.get("D:", "test.png");
    private static final Path TARGET_PATH = Paths.get("E:", "test.png");

    public static void main(String[] args) throws IOException {
        InputStream inputStream = new FileInputStream(SOURCE_PATH.toFile());

        // Create target file if not exists
        if (!TARGET_PATH.toFile().exists()) {
            TARGET_PATH.toFile().createNewFile();
        }
        OutputStream outputStream = new FileOutputStream(TARGET_PATH.toFile());

        long fileLength = SOURCE_PATH.toFile().length();
        byte[] buffer = new byte[(int) (fileLength / READ_TIMES) + 1];

        try {
            int readCount;
            int count = 0;
            while ((readCount = inputStream.read(buffer)) != -1) {
                count++;
                outputStream.write(buffer, 0, readCount);
            }
            System.out.println("Read " + count + " times");
        } catch (Exception e) {
            throw e;
        } finally {
            try {
                inputStream.close();
                outputStream.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        System.out.println("Done");
    }
}
