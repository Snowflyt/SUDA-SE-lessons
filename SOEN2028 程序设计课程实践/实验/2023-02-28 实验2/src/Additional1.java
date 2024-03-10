public class Additional1 {

    public static void main(String[] args) {
        // Calculate the sum of 2/1, 3/2, 5/3, 8/5, 13/8, 21/13, ...
        // Calculate the first 100 terms.
        double sum = 0;
        double numerator = 2;
        double denominator = 1;
        for (int i = 0; i < 100; i++) {
            sum += numerator / denominator;
            double tmp = numerator;
            numerator += denominator;
            denominator = tmp;
        }
        System.out.println(sum);
    }

}
