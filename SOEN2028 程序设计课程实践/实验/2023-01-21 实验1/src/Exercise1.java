public class Exercise1 {

    private static int square(int x) {
        return x * x;
    }

    private static int cube(int x) {
        return x * x * x;
    }

    private static void printHeader() {
        System.out.println("a\ta^2\ta^3");
    }

    private static void printLine(int x, int y, int z) {
        System.out.println(x + "\t" + y + "\t" + z);
    }

    public static void main(String[] args) {
        printHeader();
        for (int i = 0; i <= 4; i++) {
            printLine(i, square(i), cube(i));
        }
    }

}
