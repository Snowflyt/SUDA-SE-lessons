public class Exercise3 {

    public static void main(String[] args) {
        // 设 a,b 都是不超过 100 的正整数。
        // 在整数范围内，设(a2+b2)除以(a+b)所得的商为 q，
        // 余数为 r。求满足 q2+r=2008 的所有正整数对(a,b)。
        int[] c = new int[101];
        for (int a = 0; a <= 100; a++) {
            c[a] = a * a;
        }
        for (int a = 1; a <= 100; a++) {
            int ac = c[a];
            for (int b = a; b <= 100; b++) {
                int i = ac + c[b];
                int j = a + b;
                int q = i / j;
                int r = i % j;
                if (q * q + r == 2008) {
                    System.out.println(String.format("(%d, %d)", a, b));
                }
            }
        }
    }

}
