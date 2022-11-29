public class SupExercise1 {

    public static void main(String[] args) {
        // 有一个分数数列：2/1, 3/2, 5/3, 8/5, 13/8, 21/13, ...
        // 编写程序，计算并输出该数列的前100项的和
        double m = 1, n = 2;
        double result = 2;
        for (int i = 0; i < 99; i++) {
            result += (m + n) / n;
            double tmp = m;
            m = n;
            n = tmp + n;
        }
        System.out.println(result);
    }

}
