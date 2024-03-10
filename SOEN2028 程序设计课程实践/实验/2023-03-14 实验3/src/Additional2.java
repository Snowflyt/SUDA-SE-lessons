import java.util.Scanner;

public class Additional2 {

    public static void main(String[] args) {
        // Get user input.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter n: ");
        int n = sc.nextInt();
        sc.close();

        // Calculate the result.
        boolean[] lights = new boolean[n + 1];
        for (int i = 1; i <= n; i += 2) {
            lights[i] = true;
        }
        for (int i = 3; i <= n; i++) {
            for (int j = i; j <= n; j += i) {
                lights[j] = !lights[j];
            }
        }

        // Print result.
        System.out.print("Open lights: ");
        for (int i = 1; i <= n; i++) {
            if (lights[i]) {
                System.out.print(i + " ");
            }
        }
    }

}
