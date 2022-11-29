import java.util.Arrays;

public class Exercise5 {

    // 判断n是否为素数
    private static boolean isPrime(int n) {
        for (int i = 2; i <= n / 2; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        int count = 0;
        int n = 1;
        int[] nums = new int[10];
        while (count < 10) {
            n += 1;
            if (isPrime(n)) {
                count = 0;
            } else {
                nums[count] = n;
                count += 1;
            }
        }
        System.out.println(Arrays.toString(nums));
    }

}
