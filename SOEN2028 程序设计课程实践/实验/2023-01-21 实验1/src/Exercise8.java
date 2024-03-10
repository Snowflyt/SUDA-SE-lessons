import java.util.Scanner;

public class Exercise8 {

    /**
     * 一磅等于多少千克（用于单位换算）
     */
    private static final double ONE_POUND_IN_KILOGRAMS = 0.45359237;

    /**
     * 一英寸等于多少米（用于单位换算）
     */
    private static final double ONE_INCH_IN_METERS = 0.0254;

    /**
     * 计算BMI
     * 
     * @param weight 体重(kg)
     * @param height 身高(m)
     * @return
     */
    private static double calculateBMI(double weight, double height) {
        return weight / (height * height);
    }

    public static void main(String[] args) {
        // 输入体重及身高
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入体重(磅): ");
        double weight = sc.nextDouble() * ONE_POUND_IN_KILOGRAMS;
        System.out.print("请输入身高(英寸): ");
        double height = sc.nextDouble() * ONE_INCH_IN_METERS;
        sc.close();

        // 输出BMI
        double bmi = calculateBMI(weight, height);
        System.out.println("BMI: " + bmi);
    }

}
