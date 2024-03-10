import java.util.Scanner;

public class Additional1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter an integer: ");
        int num = sc.nextInt();
        sc.close();

        int count = 0;
        int n = num;
        while (n != 0) {
            if ((n & 1) == 1) {
                count++;
            }
            n >>>= 1;
        }
        System.out.println("The number of 1s of integer " + num + " is " + count);
    }
}
