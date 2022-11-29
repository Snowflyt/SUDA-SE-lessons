public class Exercise1 {

    public static void main(String[] args) {
        double n = 0;
        for (int i = 1; i <= 100; i++) {
            n = Math.sqrt(n + i);
        }
        System.out.println(n);
    }

}
