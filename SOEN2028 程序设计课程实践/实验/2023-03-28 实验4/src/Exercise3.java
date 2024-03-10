import java.util.Scanner;

public class Exercise3 {
    /**
     * Judge whether a number is prime.
     * 
     * @param number
     * @return
     */
    private static boolean isPrime(int number) {
        if (number < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Reverse a number.
     * 
     * @param number
     * @return
     */
    private static int reverse(int number) {
        int result = 0;
        while (number != 0) {
            result = result * 10 + number % 10;
            number /= 10;
        }
        return result;
    }

    /**
     * Judge whether a number is a palindrome.
     * 
     * @param number
     * @return
     */
    private static boolean isPalindrome(int number) {
        return number == reverse(number);
    }

    /**
     * Judge whether a number is a palindromic prime (a prime number that is also a
     * palindrome).
     * 
     * @param number
     * @return
     */

    private static boolean isPalindromicPrime(int number) {
        return isPrime(number) && isPalindrome(number);
    }

    /**
     * Judge whether a number is an inverse prime (a prime number that is the
     * reversal of another prime number, and is not a palindromic prime).
     * 
     * @param number
     * @return
     */
    private static boolean isInversePrime(int number) {
        return !isPalindromicPrime(number) && isPrime(reverse(number));
    }

    /**
     * Judge whether a number is a Mersenne prime (a prime number that is one less
     * than a power of 2).
     * 
     * @param number
     * @return
     */
    private static boolean isMersennePrime(int number) {
        return isPrime(number) && Math.log(number + 1) / Math.log(2) % 1 < 1e-6;
    }

    public static void main(String[] args) {
        // Print palindromes
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of palindromes to display: ");
        for (int i = 0, amount = sc.nextInt(), count = 0; count < amount; i++) {
            if (isPalindrome(i)) {
                System.out.printf("%8d", i);
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }

        System.out.println();
        System.out.println();

        // Print inverse primes
        System.out.print("Enter the number of inverse primes to display: ");
        for (int i = 0, amount = sc.nextInt(), count = 0; count < amount; i++) {
            if (isInversePrime(i)) {
                System.out.printf("%8d", i);
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }
        sc.close();

        System.out.println();
        System.out.println();

        // Print Mersenne primes that are less or equal to 2^31 - 1
        System.out.println("Mersenne primes that are less or equal to 2^31 - 1:");
        for (int i = 0, count = 0; i <= 31; i++) {
            int number = (int) Math.pow(2, i) - 1;
            if (isMersennePrime(number)) {
                System.out.printf("%8d", number);
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }
    }
}
