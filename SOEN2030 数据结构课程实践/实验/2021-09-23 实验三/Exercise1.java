public class Exercise1 {

    private static int[] firstNPosIntFourthPowerCache(int n) {
        int[] c = new int[n];
        for (int a = 0; a < n; a++) {
            c[a] = a * a * a * a;
        }
        return c;
    }

    public static void main(String[] args) {
        // 求所有满足下面条件的四位数：它的各位数字的四次方之和恰好等于自己。
        int[] c = firstNPosIntFourthPowerCache(10);
        int n = 999;
        for (int i = 1; i <= 9; i++) {
            int ic = c[i];
            for (int j = 0; j <= 9; j++) {
                int jc = c[j];
                for (int k = 0; k <= 9; k++) {
                    int kc = c[k];
                    for (int p = 0; p < 10; p++) {
                        n++;
                        if (ic + jc + kc + c[p] == n) {
                            System.out.println(n);
                        }
                    }
                }
            }
        }
    }

}
