public class Example1 {

    private static void printArmstrongNumber() {
        for (int n = 100; n <= 999; n++) {
            int i = n / 100;
            int j = n / 10 - i * 10;
            int k = n % 10;
            if (i * i * i + j * j * j + k * k * k == n) {
                System.out.println(n);
            }
        }
    }

    public static void main(String[] args) {
        long beginTime = System.nanoTime();
        int count;
        for (count = 1; count <= 1000; count++) {
            printArmstrongNumber();
        }
        long endTime = System.nanoTime();
        long costTime = (endTime - beginTime) / 1000 / count;
        System.out.println("平均用时" + costTime + "微秒");
    }

}
