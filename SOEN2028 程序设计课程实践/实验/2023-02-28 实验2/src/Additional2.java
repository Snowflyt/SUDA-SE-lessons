public class Additional2 {

    public static void main(String[] args) {
        // Output all possible integer combinations of x and y
        // of the equation |x| + |y| <= 10.
        for (int x = -10; x <= 10; x++) {
            for (int y = -10; y <= 10; y++) {
                if (Math.abs(x) + Math.abs(y) <= 10) {
                    System.out.println(x + " " + y);
                }
            }
        }
    }

}
