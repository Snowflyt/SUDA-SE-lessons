public class Exercise2 {

    public static void main(String[] args) {
        // 求所有满足下面条件的三位数：它能被 11 整除，且所得的商恰好等于它的各位数字的平方和。
        int[] c = new int[10]; // 用来保存0~9的平方
        for (int a = 0; a < 10; a++) {
            c[a] = a * a;
        }
        int n = 9; // n为三位数除以11所得的商
        int hundreds; // 百位
        int tens = -1; // 十位
        int ones = 9; // 个位
        // 初始值为109
        for (hundreds = 1; hundreds <= 9; hundreds++) { // 百位从1到9递增
            int hundredsC = c[hundreds]; // 百位的平方
            for (int i = 0; i < 9; i++) { // 由于是三位数，每一次百位循环都只能加8次11（109+8*11=197；902+8*11=990）
                tens++; // 每次十位加1
                ones++; // 每次个位加1
                if (ones >= 10) { // 若个位>=10则进位
                    ones %= 10;
                    tens++;
                }
                if (tens >= 10) { // 若十位>=10则进位
                    tens %= 10;
                }
                n++; // 商加1
                if (hundredsC + c[tens] + c[ones] == n) { // 若商等于平方和，则打印结果
                    System.out.println(n * 11);
                }
            }
        }
    }

}
