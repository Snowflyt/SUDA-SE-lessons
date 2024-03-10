import java.util.Scanner;

public class Additional4 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();

        int[] arr = new int[n];
        System.out.print("Enter " + n + " integers: ");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        sc.close();

        /* Swap each element with a random element */
        for (int i = 0; i < n; i++) {
            int j = (int) (Math.random() * n);
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        /* Print the result */
        System.out.print("The integers in random order: ");
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
    }
}
