public class Exercise2 {
    /**
     * Calculate m(i) = 1 + 2/3 + 3/4 + ... + i/(i+1)
     * 
     * @param i
     * @return
     */
    private static double m1(int i) {
        double sum = 0;
        for (int j = 1; j <= i; j++) {
            sum += j / (j + 1.0);
        }
        return sum;
    }

    /**
     * Calculate m(i) = 4(1 - 1/3 + 1/5 - 1/7 + ... + (-1)^(i+1)/(2i-1))
     * 
     * @param i
     * @return
     */
    private static double m2(int i) {
        double sum = 0;
        for (int j = 1; j <= i; j++) {
            sum += Math.pow(-1, j + 1) / (2 * j - 1);
        }
        return 4 * sum;
    }

    public static void main(String[] args) {
        // Print m1
        System.out.println("i\tm(i)");
        System.out.println("--------------------");
        for (int i = 1; i <= 20; i++) {
            System.out.printf("%d\t%.4f", i, m1(i));
            System.out.println();
        }

        System.out.println();

        // Print m2
        System.out.println("i\tm(i)");
        System.out.println("--------------------");
        for (int i = 1; i <= 901; i += 100) {
            System.out.printf("%d\t%.4f", i, m2(i));
            System.out.println();
        }
    }
}
