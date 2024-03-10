import java.util.Scanner;

public class Additional2 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a sequence of integers: ");
        String[] tokens = sc.nextLine().split(" ");
        sc.close();

        int[] nums = new int[tokens.length];
        for (int i = 0; i < tokens.length; i++) {
            nums[i] = Integer.parseInt(tokens[i]);
        }

        /* Process and Output */
        int prev = nums[0];
        System.out.print(prev + " ");
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != prev) {
                System.out.print(nums[i] + " ");
                prev = nums[i];
            }
        }
    }
}
