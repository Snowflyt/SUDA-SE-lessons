public class Exercise3 {

    public static void main(String[] args) {
        double result = 1;
        for (int i = 19999; i > 2; i -= 2) {
            result *= i - 1;
            result /= i;
        }
        for (int i = 19997; i > 0; i -= 2) {
            result *= i + 1;
            result /= i;
        }
        result *= 2;
        System.out.println(result);
    }

}
