public class Exercise3 {

    public static void main(String[] args) {
        double halfOfPi = 1;
        double n = 1;
        for (int i = 1; i < 100; i++) {
            n *= i / (double)(2 * i + 1);
            halfOfPi += n;
        }
        double pi = 2 * halfOfPi;
        System.out.println(pi);
    }

}
