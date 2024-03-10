public class Exercise5 {

    public static void main(String[] args) {
        // Print numbers can be divided by 5 and 6 but not both between 100 and 200.
        int count = 0;
        for (int i = 100; i <= 200; i++) {
            if (i % 5 == 0 ^ i % 6 == 0) {
                System.out.print(i + " ");
                count++;
                if (count % 10 == 0) {
                    System.out.println();
                }
            }
        }
    }

}
