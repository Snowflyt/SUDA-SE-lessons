import java.util.Scanner;

public class Additional1 {
    /**
     * Return true if n is a power of 2.
     * 
     * @param n
     * @return
     */
    private static boolean isPowerOf2(int n) {
        return (n & (n - 1)) == 0;
    }

    public static void main(String[] args) {
        // Get user input
        System.out.print("Enter a positive integer: ");
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();

        // Use bitwise operation to check if n is a power of 2
        System.out.println(n + " is " + (isPowerOf2(n) ? "" : "not ") + "a power of 2.");
    }
}
