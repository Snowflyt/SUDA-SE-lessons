public class Exercise2 {

    public static void main(String[] args) {
        double halfOfPi = 1;
        double n = 0;
        for (int i = 0; i < 100; i++) {
            n = Math.sqrt(2 + n);
            halfOfPi *= 2 / n;
        }
        double pi = 2 * halfOfPi;
        System.out.println(pi);
    }

}
