import java.util.Scanner;

public class Exercise3 {

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

        // Calculate the number of positive numbers and the sum of all numbers.
        int numPos = 0;
        int sum = 0;
        for (int i = 0; i < len; i++) {
            if (nums[i] > 0) {
                numPos++;
            }
            sum += nums[i];
        }

        // Print result.
        System.out.println("Number of positive numbers: " + numPos);
        System.out.println("Number of negative numbers: " + (len - numPos));
        System.out.println("Sum of all numbers: " + sum);
        System.out.println("Average of all numbers: " + (double) sum / len);
    }

}
