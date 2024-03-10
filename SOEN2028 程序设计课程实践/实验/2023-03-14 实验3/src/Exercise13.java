import java.util.Scanner;

public class Exercise13 {

    public static void main(String[] args) {
        // Get user input.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a few numbers (separated by space, end by 0): ");
        int max = Integer.MIN_VALUE;
        int count = 0;
        int num;
        while ((num = sc.nextInt()) != 0) {
            if (num > max) {
                max = num;
                count = 1;
            } else if (num == max) {
                count++;
            }
        }
        sc.close();

        // Print result.
        System.out.println("Max: " + max);
        System.out.println("Count: " + count);
    }

}
