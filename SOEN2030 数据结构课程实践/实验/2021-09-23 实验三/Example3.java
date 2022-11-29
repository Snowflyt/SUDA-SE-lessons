public class Example3 {

    private static void printArmstrongNumber() {
        int n = 99;
        for (int i = 1; i <= 9; i++) {
            int ic = i * i * i;
            for (int j = 0; j <= 9; j++) {
                int jc = j * j * j;
                for (int k = 0; k <= 9; k++) {
                    n++;
                    if (ic + jc + k * k * k == n) {
                        System.out.println(n);
                    }
                }
            }
        }
    }

    public static void main(String[] args) {
        int count;
        long beginTime = System.nanoTime();
        for (count = 1; count <= 1000; count++) {
            printArmstrongNumber();
        }
        long endTime = System.nanoTime();
        long costTime = (endTime - beginTime) / 1000 / count;
        System.out.println("平均用时" + costTime + "微秒");
    }

}
