import java.util.Scanner;

public class Additional2 {
    public static void main(String[] args) {
        // Get user input
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of rows: ");
        int n = sc.nextInt();
        int[][] lights = new int[n][n];
        System.out.print("Enter the lights of the last row (separated by spaces, 0 for dark, 1 for light): ");
        for (int i = 0; i < n; i++) {
            lights[n - 1][i] = sc.nextInt();
        }
        sc.close();

        // Calculate the lights of the previous rows
        for (int i = n - 2; i >= 0; i--) {
            for (int j = 0; j <= i; j++) {
                lights[i][j] = lights[i + 1][j] ^ lights[i + 1][j + 1];
            }
        }

        // Print the result
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                System.out.print(lights[i][j] + " ");
            }
            System.out.println();
        }
    }
}
