public class Exercise2 {

    /**
     * Checks if a number is prime.
     * 
     * @param num
     * @return
     */
    private static boolean isPrime(int num) {
        if (num == 2) {
            return true;
        }

        for (int i = 2; i < Math.sqrt(num) + 1; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        // Print the first 50 prime numbers.
        int count = 0;
        int num = 2;
        while (count < 50) {
            if (isPrime(num)) {
                System.out.print(num + " ");
                count++;
            }
            num++;
        }
    }

}
