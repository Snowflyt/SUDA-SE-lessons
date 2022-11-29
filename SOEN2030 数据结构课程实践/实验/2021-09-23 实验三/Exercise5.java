import java.util.Scanner; 

public class Exercise5 {

    private static int gcd(int m, int n) {
        if (m < n) {
            int k = m;
            m = n;
            n = k;
        }
        if (m % n != 0) {
            m %= n;
            return gcd(m, n);
        }
        return n;
    }

    public static void main(String[] args) {
        // Finding the gcd
        // Given n positive integers between 1 and 200000 (1 ≤ n ≤ 100),
        // you are required to find the greatest common divisor of the n integers.
        // For example, if n = 3, and the integers are 18, 63, 36,
        // then the greatest common divisor is 9.
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for (int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        sc.close();
        int divisor = nums[0];
        for (int i = 1; i < n; i++) {
            divisor = gcd(divisor, nums[i]);
        }
        System.out.println(divisor);
    }

}
