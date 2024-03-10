import java.util.Random;

public class Additional2 {
    private static final Random rand = new Random();

    /**
     * Return a random number between min and max, inclusive.
     */
    private static int generateRandomNumber(int min, int max) {
        return rand.nextInt(max - min + 1) + min;
    }

    public static void main(String[] args) {
        // Generate 10000 random numbers between 10 and 99
        // and count the occurrences of each number
        int[] counts = new int[90];
        for (int i = 0; i < 10000; i++) {
            int n = generateRandomNumber(10, 99);
            counts[n - 10]++;
        }

        // Display the counts
        for (int i = 0; i < counts.length; i++) {
            System.out.printf("%3d: %3d ", i + 10, counts[i]);
            if (i % 10 == 9) {
                System.out.println();
            }
        }
    }
}
