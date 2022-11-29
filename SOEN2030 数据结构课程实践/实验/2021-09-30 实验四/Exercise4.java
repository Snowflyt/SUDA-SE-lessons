public class Exercise4 {

    public static void main(String[] args) {
        int n = 100;
        int[] nums = new int[n];
        nums[0] = 1;
        for (int i = 0; i < n; i++) {
            int num = nums[i];
            int a = num * 2 + 1;
            int b = num * 3 + 1;
            for (int j = i; j < n; j++) {
                if (a < nums[j] || nums[j] == 0) {
                    for (int k = n - 1; k > j; k--) {
                        nums[k] = nums[k - 1];
                    }
                    nums[j] = a;
                    break;
                }
            }
            for (int j = i; j < n; j++) {
                if (b < nums[j] || nums[j] == 0) {
                    for (int k = n - 1; k > j; k--) {
                        nums[k] = nums[k - 1];
                    }
                    nums[j] = b;
                    break;
                }
            }
        }
        for (int i = 0; i < n; i++) {
            System.out.print(nums[i]);
            System.out.print(" ");
        }
    }

}
