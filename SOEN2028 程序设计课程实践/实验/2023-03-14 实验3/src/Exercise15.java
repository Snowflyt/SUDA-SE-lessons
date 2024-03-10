import java.util.Scanner;

public class Exercise15 {

    private static final int BUFFER_SIZE = 100;

    public static void main(String[] args) {
        // Get user input.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a few numbers (separated by space, end by 0): ");
        int[] nums = new int[BUFFER_SIZE];
        int len;
        for (len = 0; (nums[len] = sc.nextInt()) != 0; len++)
            ;
        sc.close();
        if (len == 0) {
            System.out.println("No numbers entered.");
            return;
        }

        // Calculate the average.
        double sum = 0;
        for (int i = 0; i < len; i++) {
            sum += nums[i];
        }
        double avg = sum / len;

        // Calculate the standard deviation.
        double sum2 = 0;
        for (int i = 0; i < len; i++) {
            sum2 += Math.pow(nums[i] - avg, 2);
        }
        double stdDev = Math.sqrt(sum2 / (len - 1));

        // Print result.
        System.out.println("Average: " + avg);
        System.out.println("Standard deviation: " + stdDev);
    }

}
