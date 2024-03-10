public class Exercise8 {

    public static void main(String[] args) {
        // Calculate 1/3 + 3/5 + 5/7 + 7/9 + 9/11 + 11/13 + ... + 95/97 + 97/99.
        double sum = 0;
        for (int i = 1; i <= 97; i += 2) {
            sum += (double) i / (i + 2);
        }
        System.out.println(sum);
    }

}
