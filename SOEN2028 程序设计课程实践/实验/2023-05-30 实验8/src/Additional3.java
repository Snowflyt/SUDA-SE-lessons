import java.util.Scanner;

public class Additional3 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a sequence of integers: ");
        String[] input = sc.nextLine().split(" ");
        sc.close();

        /* Find the longest consecutive run */
        int max = 0;
        int count = 1;
        int num = Integer.parseInt(input[0]);
        int lastNum = num;
        for (int i = 1; i < input.length; i++) {
            if (Integer.parseInt(input[i]) == lastNum) {
                count++;
            } else {
                if (count > max) {
                    max = count;
                    num = lastNum;
                }
                count = 1;
                lastNum = Integer.parseInt(input[i]);
            }
        }

        /* Print the result */
        System.out.println("Longest run: " + max + " consecutive " + num + "s");
    }
}
