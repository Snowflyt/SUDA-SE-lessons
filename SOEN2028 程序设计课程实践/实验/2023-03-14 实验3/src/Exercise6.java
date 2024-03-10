import java.util.Scanner;

public class Exercise6 {

    public static void main(String[] args) {
        // Prompt the user to enter a number between 1 and 15.
        System.out.print("Enter a number between 1 and 15: ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();

        // Print the pyramid.
        for (int i = 1; i <= n; i++) {
            // Print spaces.
            for (int j = 1; j <= n - i; j++) {
                System.out.print("   ");
            }
            // Print numbers.
            for (int j = i; j >= 1; j--) {
                System.out.printf("%2d ", j);
            }
            for (int j = 2; j <= i; j++) {
                System.out.printf("%2d ", j);
            }
            System.out.println();
        }
    }

}
