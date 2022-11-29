import java.util.Scanner;

public class Exercise3 {

    public static void main(String[] args) {
        // 编写程序，要求用户输入一系列非零整数（最后以0作为结束标志），
        // 统计、计算并输出正数个数、负数个数、总和以及平均值。
        // （要考虑仅输入0的情况）
        int num = 0;
        int positive = 0;
        int negative = 0;
        double sum = 0;

        Scanner in = new Scanner(System.in);
        while ((num = in.nextInt()) != 0) {
            if (num > 0) {
                positive++;
            } else {
                negative++;
            }
            sum += num;
        }
        in.close();

        System.out.println(
                positive + " " + negative + " " +
                        (positive + negative) + " " + sum / (positive + negative));
    }

}
