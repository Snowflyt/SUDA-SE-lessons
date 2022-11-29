public class Exercise1 {

    public static void main(String[] args) {
        double result = 0;
        for (int i = 100; i > 0; i--) {
            result += 1.0 / (i * i);
        }
        result = Math.sqrt(6 * result);
        System.out.println(result);
    }

}
