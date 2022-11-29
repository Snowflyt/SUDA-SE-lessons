public class SupExercise1 {

    public static void main(String[] args) {
        // 编写程序，输出所有满足下面条件的三位数：
        // 三位数的各位数字的阶乘之和等于该三位数。
        // 例如，145＝1!+4!+5!。
        int[] factorial = new int[10];
        factorial[1] = 1;
        for (int i = 2; i < 10; i++) {
            factorial[i] = factorial[i-1] * i;
        }
        for (int i = 100; i < 1000; i++) {
            int ones = i % 10;
            int tens = i / 10 % 10;
            int hundreds = i / 100;
            if (i == factorial[ones] + factorial[tens] + factorial[hundreds]) {
                System.out.println(i);
            }
        }
    }

}
