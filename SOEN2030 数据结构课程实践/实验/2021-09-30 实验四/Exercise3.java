import java.util.Arrays;
import java.util.Scanner;

public class Exercise3 {

    public static void main(String[] args) {
        int n = 20;
        int[] nums = new int[n];
        Scanner in = new Scanner(System.in);
        for (int i = 0; i < n; i++) {
            nums[i] = in.nextInt();
        }
        in.close();
        Arrays.sort(nums);
        for (int i = 0; i < n / 2; i++) {
            String s = nums[i] + " " + nums[n - i - 1] + " ";
            System.out.print(s);
        }
    }

}
