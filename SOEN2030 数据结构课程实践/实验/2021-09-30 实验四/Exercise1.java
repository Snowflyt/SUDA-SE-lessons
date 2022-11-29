public class Exercise1 {

    public static void main(String[] args) {
        int n = 4;
        int[] c = new int[n * 2 - 1];
        for (int i = 0; i < n; i++) {
            c[i] = i + 1;
        }
        for (int i = n; i < c.length; i++) {
            c[i] = c[i - 1] - 1;
        }
        for (int k = 0; k < c.length; k++) {
            int i = c[k];
            for (int j = 0; j < (n - i) * 2; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            for (int j = 0; j < (i - 1) * 2; j++) {
                System.out.print(" ");
            }
            for (int j = 0; j < i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }

}
