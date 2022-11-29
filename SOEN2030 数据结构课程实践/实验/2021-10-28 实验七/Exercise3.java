import java.util.Arrays;

public class Exercise3 {

    // 检查数组元素是否有重复
    private static boolean hasRepeated(int[] arr, int start, int end) {
        int length = end - start;
        for (int i = start; i < length - 1; i++) {
            for (int j = i + 1; j < length - 1; j++) {
                if (arr[i] == arr[j]) {
                    return true;
                }
            }
        }
        return false;
    }

    public static void main(String[] args) {
        int[] nums = new int[8];
        for (nums[1] = 1; nums[1] <= 2; nums[1]++) { // 22*33=726, 33*44=1452>999
            for (nums[0] = nums[1] + 1; nums[0] <= 9; nums[0]++) { // 年年必定大于岁岁
                int nn = 10 * nums[0] + nums[0];
                int ss = 10 * nums[1] + nums[1];
                int tmp = nn * ss;
                if (tmp > 999) {
                    break;
                }
                nums[2] = tmp / 100; // 花
                nums[3] = tmp % 100 / 10; // 相
                nums[4] = tmp % 10; // 似
                if (!hasRepeated(nums, 0, 5)) {
                    for (nums[5] = 1; nums[5] <= 9; nums[5]++) { // 人
                        if (!hasRepeated(nums, 0, 6) && (nn * nums[5]) % ss == 0) {
                            tmp = (nn * nums[5]) / ss;
                            if (tmp < 10 || tmp > 99) {
                                continue;
                            }
                            nums[6] = tmp / 10; // 不
                            nums[7] = tmp % 10; // 同
                            if (!hasRepeated(nums, 0, 8)) {
                                System.out.println(Arrays.toString(nums));
                            }
                        }
                    }
                }
            }
        }
    }

}
