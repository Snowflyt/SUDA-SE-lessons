public class Example4 {

    private static void printArmstrongNumber() {
        int[] c = new int[10];
        for (int a = 0; a < 10; a++) {
            c[a] = a * a * a;
        }
        int n = 99;
        for (int i = 1; i <= 9; i++) {
            int ic = c[i];
            for (int j = 0; j <= 9; j++) {
                int jc = c[j];
                for (int k = 0; k <= 9; k++) {
                    n++;
                    if (ic + jc + c[k] == n) {
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
