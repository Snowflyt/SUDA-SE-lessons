public class Exercise4 {

    public static void main(String[] args) {
        // 已知一个递增序列，元素两两不等，它们满足下面的条件：
        // （1）数 1 在序列中。
        // （2）若数 x 在序列中，则 2x,3x,5x 也在序列中。
        // （3）除此之外，序列中无其他数。求该序列开头的 100 个元素。
        int[] numbers = new int[100];
        numbers[0] = 1;
        int n = 1;
        int count = 1;
        while (count < 100) {
            n++;
            int t = n;
            while (t % 2 == 0) {
                t /= 2;
            }
            while (t % 3 == 0) {
                t /= 3;
            }
            while (t % 5 == 0) {
                t /= 5;
            }
            if (t == 1) {
                numbers[count] = n;
                count++;
            }
        }
        for (int i: numbers) {
            System.out.print(i + " ");
        }
    }

}
