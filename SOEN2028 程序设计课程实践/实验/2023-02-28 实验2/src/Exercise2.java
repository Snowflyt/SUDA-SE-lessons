import java.util.Scanner;

public class Exercise2 {

    public static void main(String[] args) {
        // Input first 9 digits of ISBN.
        System.out.print("Input ISBN (first 9 digits, DO NOT separate them by space): ");
        Scanner sc = new Scanner(System.in);
        int isbn = sc.nextInt();
        sc.close();

        // Compute the checksum.
        int checksum = 0;
        for (int i = 1; i <= 9; i++) {
            int digit = isbn / (int) Math.pow(10, (9 - i)) % 10;
            checksum += digit * i;
        }
        checksum = checksum % 11;

        // Print ISBN (with trailing checksum).
        System.out.print(isbn);
        System.out.println(checksum == 10 ? "X" : checksum);
    }

}
