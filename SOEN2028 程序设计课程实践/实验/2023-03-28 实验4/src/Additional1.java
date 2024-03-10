import java.util.Scanner;

public class Additional1 {
    /**
     * Calculate the binomial coefficient.
     * 
     * @param n
     * @param k
     * @return
     */
    private static int binomialCoefficient(int n, int k) {
        if (k == 0 || k == n) {
            return 1;
        } else {
            return binomialCoefficient(n - 1, k - 1) + binomialCoefficient(n - 1, k);
        }
    }

    /**
     * Print Pascal's triangle (not use array).
     * 
     * @param n
     */
    private static void printPascalTriangle1(int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print("  ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", binomialCoefficient(i, j));
            }
            System.out.println();
        }
    }

    /**
     * Print Pascal's triangle (use a 2d array).
     *
     * @param n
     */
    private static void printPascalTriangle2(int n) {
        int[][] pascalTriangle = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j <= i; j++) {
                if (j == 0 || j == i) {
                    pascalTriangle[i][j] = 1;
                } else {
                    pascalTriangle[i][j] = pascalTriangle[i - 1][j - 1] + pascalTriangle[i - 1][j];
                }
            }
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print("  ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", pascalTriangle[i][j]);
            }
            System.out.println();
        }
    }

    /**
     * Print Pascal's triangle (use a 1d array).
     *
     * @param n
     */
    private static void printPascalTriangle3(int n) {
        int[] pascalTriangle = new int[n * (n + 1) / 2];
        int index = 0;

        for (int i = 0; i < n; i++) {
            for (int j = i; j >= 0; j--) {
                if (j == 0 || j == i) {
                    pascalTriangle[index + j] = 1;
                } else {
                    pascalTriangle[index + j] = pascalTriangle[index - i + j - 1] + pascalTriangle[index - i + j];
                }
            }
            index += i + 1;
        }

        index = 0;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i; j++) {
                System.out.print("  ");
            }
            for (int j = 0; j <= i; j++) {
                System.out.printf("%4d", pascalTriangle[index + j]);
            }
            System.out.println();
            index += i + 1;
        }
    }

    public static void main(String[] args) {
        // Get user input
        System.out.print("Enter n: ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();

        // Print Pascal's triangle
        System.out.println("Pascal's triangle (not use array):");
        printPascalTriangle1(n);

        System.out.println();

        System.out.println("Pascal's triangle (use a 2d array):");
        printPascalTriangle2(n);

        System.out.println();

        System.out.println("Pascal's triangle (use a 1d array):");
        printPascalTriangle3(n);
    }
}
