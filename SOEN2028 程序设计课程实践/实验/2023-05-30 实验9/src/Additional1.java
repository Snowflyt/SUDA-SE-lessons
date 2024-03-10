import java.util.Scanner;

public class Additional1 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter number of songs: ");
        int n = sc.nextInt();
        sc.close();

        int[] songs = new int[n];
        for (int i = 0; i < n; i++) {
            songs[i] = i + 1;
        }

        /* Process */
        int count = 0;
        for (int i = 0; i < n; i++) {
            int j = (int) (Math.random() * n);
            int temp = songs[i];
            songs[i] = songs[j];
            songs[j] = temp;
        }
        for (int i = 0; i < n - 1; i++) {
            if (Math.abs(songs[i] - songs[i + 1]) == 1) {
                count++;
            }
        }

        /* Output */
        System.out.println("Likelihood: " + (double) count / n);
    }
}
