public class Exercise2 {

    private static boolean isPrime(int num) {
        if (num < 2) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(num); i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        // 编写程序，从小到大依次输出前50个质数（素数），要求每行10个。
        int i = 2;
        int count = 0;
        while (count < 50) {
            if (isPrime(i)) {
                System.out.print(i + " ");
                count++;
            }
            i++;
        }
    }

}
