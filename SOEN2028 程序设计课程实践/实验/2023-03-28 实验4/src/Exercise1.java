import java.util.Scanner;

public class Exercise1 {
    /**
     * Return the reversal of an integer, i.e., reverse(456) returns 654.
     * 
     * @param number
     * @return
     */
    public static int reverse(int number) {
        int reverse = 0;
        while (number != 0) {
            reverse = reverse * 10 + number % 10;
            number /= 10;
        }
        return reverse;
    }

    /**
     * Return true if number is a palindrome.
     * 
     * @param number
     * @return
     */
    public static boolean isPalindrome(int number) {
        return number == reverse(number);
    }

    public static void main(String[] args) {
        // Get user input
        System.out.print("Enter an integer: ");
        Scanner sc = new Scanner(System.in);
        int number = sc.nextInt();
        sc.close();

        // Print result
        System.out.println(number + " is " + (isPalindrome(number) ? "" : "not ") + "a palindrome.");
    }
}
