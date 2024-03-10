import java.util.Scanner;

public class Exercise2 {
    private static final String input = "语文 90 分，数学 87 分，物理 76 分，化学 98 分，英语 96 分，政治 75 分";

    public static void main(String[] args) {
        /* Read input */
        Scanner sc = new Scanner(input);

        /* Parse the input */
        int sum = 0;
        int count = 0;
        while (sc.hasNext()) {
            if (sc.hasNextInt()) {
                int score = sc.nextInt();
                sum += score;
                count++;
            } else {
                sc.next();
            }
        }
        sc.close();

        /* Print the result */
        System.out.println("The sum of the scores is " + sum);
        System.out.println("The average of the scores is " + (double) sum / count);
    }
}
