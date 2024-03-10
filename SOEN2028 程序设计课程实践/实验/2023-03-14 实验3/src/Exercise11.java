public class Exercise11 {

    /**
     * Returns true if the number is a perfect number.
     * 
     * @param number
     * @return
     */
    private static boolean isPerfectNumber(int number) {
        int sum = 0;
        for (int i = 1; i < number; i++) {
            if (number % i == 0) {
                sum += i;
            }
        }
        return sum == number;
    }

    public static void main(String[] args) {
        // Print perfect numbers between 1 and 10000.
        for (int i = 1; i <= 10000; i++) {
            if (isPerfectNumber(i)) {
                System.out.println(i);
            }
        }
    }

}
