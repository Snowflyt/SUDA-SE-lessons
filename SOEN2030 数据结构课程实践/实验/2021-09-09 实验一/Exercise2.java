public class Exercise2 {

    public static void main(String[] args) {
        double result = 0;
        for (int i = 19997; i > 0; i -= 4) {
            result += 1.0 / i;
        }
        for (int i = 19999; i > 2; i -= 4) {
            result -= 1.0 / i;
        }
        result *= 4;
        System.out.println(result);
    }

}
