import java.util.Scanner;

public class Exercise5 {

    private static int count(int n) {
        if (n == 1)
            return 1;
        int result = 1;
        for (int i = 1; i <= n / 2; i++) {
            result += count(i);
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        in.close();
        System.out.println(count(n));
    }

}
