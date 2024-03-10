public class Additional1 {

    /**
     * Calculate the factorial of a number.
     * 
     * @param n
     * @return
     */
    private static int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    public static void main(String[] args) {
        for (int i = 100; i < 1000; i++) {
            int a = i / 100;
            int b = i / 10 % 10;
            int c = i % 10;
            if (i == factorial(a) + factorial(b) + factorial(c)) {
                System.out.println(i);
            }
        }
    }

}
