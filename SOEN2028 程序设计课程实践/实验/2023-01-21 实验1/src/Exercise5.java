import java.util.Scanner;

public class Exercise5 {

    /**
     * 计算加速度（米/秒）
     * 
     * @param v0
     * @param v1
     * @param t
     * @return
     */
    private static double calculateAcceleratedSpeed(double v0, double v1, double t) {
        return (v1 - v0) / t;
    }

    public static void main(String[] args) {
        // 输入v0, v1及t
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入v0(m/s): ");
        double v0 = sc.nextDouble();
        System.out.print("请输入v1(m/s): ");
        double v1 = sc.nextDouble();
        System.out.print("请输入t(s): ");
        double t = sc.nextDouble();
        sc.close();

        // 输出加速度
        System.out.println("加速度为: " + calculateAcceleratedSpeed(v0, v1, t) + "m/s");
    }

}
