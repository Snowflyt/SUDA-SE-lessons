public class Exercise4 {

    public static void main(String[] args) {
        int result = 1;
        for (int i = 0; i < 1000; i++) {
            result *= 2;
            result %= 1000;
        }
        System.out.println(result);
    }

}
