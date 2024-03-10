import java.util.Arrays;

public class Additional2 {
    public static void process(int[] a) {
        for (int i = a.length - 1; i >= 1; i--) {
            int c = 0;
            for (int j = 1; j <= i - 1; j++) {
                if (a[j] < a[i]) {
                    c++;
                }
            }
            a[i] = c;
        }
    }

    public static void recover(int[] a) {
        int[] b = new int[a.length];

        b[1] = 1;
        for (int i = 2; i < a.length; i++) {
            // Move elements of b from a[i] to i - 1 one step right
            for (int j = i - 1; j > a[i]; j--) {
                b[j + 1] = b[j];
            }
            b[a[i] + 1] = i;
        }

        for (int i = 1; i < a.length; i++) {
            a[b[i]] = i;
        }
    }

    public static void main(String[] args) {
        int[] a = new int[] { 0, 3, 5, 4, 1, 2 };
        System.out.println("Before processing: " + Arrays.toString(a));

        process(a);
        System.out.println("After processing: " + Arrays.toString(a));

        recover(a);
        System.out.println("After recovering: " + Arrays.toString(a));
    }
}
