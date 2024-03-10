import java.util.Scanner;

public class Exercise3 {

    /**
     * Judge whether an integer is a palindrome.
     * 
     * @param num The integer to be judged.
     */
    private static boolean isPalindrome(int num) {
        // The max value of integer in Java is 2147483647,
        // so we use an array of size 10.
        byte[] digits = new byte[10];

        // Get digits of the integer and store them to an array in inverse order.
        int idx = 0;
        while (num > 0) {
            digits[idx++] = (byte) (num % 10);
            num /= 10;
        }

        // Compare the digits.
        for (int i = 0; i < idx; i++) {
            if (digits[i] != digits[idx - i - 1]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        // Input an integer with 3 digits.
        System.out.print("Input a 3-digit integer: ");
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        sc.close();

        // Print the result.
        System.out.println(
                "Integer " + num + " is" +
                        (isPalindrome(num) ? "" : " not") +
                        " a palindrome.");
    }

}
