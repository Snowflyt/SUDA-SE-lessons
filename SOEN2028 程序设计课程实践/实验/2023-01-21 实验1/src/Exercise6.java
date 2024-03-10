import java.util.Scanner;

public class Exercise6 {

    /**
     * 计算将水从初始温度加热到最终温度所需的能量
     * 
     * @param mass               质量(kg)
     * @param initialTemperature 初始温度(℃)
     * @param finalTemperature   最终温度(℃)
     * @return 能量(J)
     */
    private static double calculateEnergy(
            double mass,
            double initialTemperature,
            double finalTemperature) {
        return mass * (finalTemperature - initialTemperature) * 4184;
    }

    public static void main(String[] args) {
        // 输入初始温度、最终温度及质量
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入水的重量(kg): ");
        double m = sc.nextDouble();
        System.out.print("请输入起始温度(℃): ");
        double t0 = sc.nextDouble();
        System.out.print("请输入最终温度(℃): ");
        double t1 = sc.nextDouble();
        sc.close();

        // 输出能量
        double q = calculateEnergy(m, t0, t1);
        System.out.println("将" + m + "kg的水从" + t0 + "℃加热到" + t1 + "℃所需能量为" + q + "J");
    }

}
