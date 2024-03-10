// Write a program that takes an integer n,
// reads in n - 1 distinct integers between 1 and n, and determines the missing value.

import java.util.Scanner;

public class Additional2 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();

        int[] arr = new int[n];
        System.out.print("Enter " + (n - 1) + " distinct integers between 1 and " + n + ": ");
        for (int i = 0; i < n - 1; i++) {
            int num = sc.nextInt();
            if (num < 1 || num > n) {
                System.out.println("Invalid input");
                System.exit(1);
            }
            arr[num - 1] = 1;
        }
        sc.close();

        /* Find the missing value */
        for (int i = 0; i < n; i++) {
            if (arr[i] == 0) {
                System.out.println("The missing value is " + (i + 1));
                break;
            }
        }
    }
}
