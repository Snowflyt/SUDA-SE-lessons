import java.util.Scanner;

public class Exercise9 {

    /**
     * 计算六边形的面积
     * 
     * @param side
     * @return
     */
    private static double calculateHexagonArea(double side) {
        return 3 * Math.sqrt(3) / 2 * (side * side);
    }

    public static void main(String[] args) {
        // 输入六边形的边长
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入六边形的边长: ");
        double side = sc.nextDouble();
        sc.close();

        // 输出六边形的面积
        double area = calculateHexagonArea(side);
        System.out.println("边长为" + side + "的六边形的面积是" + area);
    }

}
