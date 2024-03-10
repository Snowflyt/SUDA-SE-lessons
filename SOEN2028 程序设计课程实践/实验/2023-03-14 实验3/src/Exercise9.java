public class Exercise9 {

    public static void main(String[] args) {
        // e = 1 + 1/1! + 1/2! + 1/3! + 1/4! + 1/5! + 1/6! + 1/7! + ... + 1/i!
        // Write a program that displays the e value for i = 10000, 20000, ..., 100000.
        double e = 1;
        double factorial = 1;
        for (int i = 1; i <= 100000; i++) {
            factorial *= 1.0 / i;
            e += factorial;
            if (i % 10000 == 0) {
                System.out.println("i = " + i + ", e = " + e);
            }
        }
    }

}
