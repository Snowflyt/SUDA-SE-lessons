public class Exercise4 {

    public static void main(String[] args) {
        for (int i = 66, j = 10; i <= 99; i++, j++) {
            if (i * i % 100 == j * j % 100) {
                System.out.println(String.format("i = %d, j = %d", i, j));
            }
        }
    }

}
