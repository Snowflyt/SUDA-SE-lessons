public class Exercise1 {

    public static void main(String[] args) {
        // 编写程序，首先产生并输出100个1至500间的两两不等的随机整数（原始数据），
        // 接下来产生并输出1个3至999间的随机整数（目标值），
        // 最后求出并输出该原始数据中两个整数之和等于该目标值的所有整数对。
        // generate random number
        int[] nums = new int[100];
        for (int i = 0; i < nums.length; i++) {
            nums[i] = (int) (Math.random() * 500) + 1;
        }
        // generate target number
        int target = (int) (Math.random() * 999) + 3;
        // find all pairs
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    System.out.println("(" + nums[i] + ", " + nums[j] + ")");
                }
            }
        }
    }

}
