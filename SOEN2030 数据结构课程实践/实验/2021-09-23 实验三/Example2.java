public class Example2 {

    private static void printArmstrongNumber() {
        for (int i = 1; i <= 9; i++) {
            for (int j = 0; j <= 9; j++) {
                for (int k = 0; k <= 9; k++) {
                    if (i * i * i + j * j * j + k * k * k == i * 100 + j * 10 + k) {
                        System.out.println(i * 100 + j * 10 + k);
                    }
                }
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
