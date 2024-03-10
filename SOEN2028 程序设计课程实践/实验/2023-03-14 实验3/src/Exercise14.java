public class Exercise14 {

    public static void main(String[] args) {
        double sum = 0;
        for (int i = 1; i <= 624; i++) {
            sum += 1.0 / (Math.sqrt(i) + Math.sqrt(i + 1.0));
        }
        System.out.println(sum);
    }

}
