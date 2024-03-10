public class Exercise2 {

    /**
     * 圆的半径
     */
    private static final double CIRCLE_RADIUS = 5.5;

    /**
     * 计算圆的周长
     * 
     * @param radius
     * @return
     */
    private static double calculatePerimeter(double radius) {
        return 2 * Math.PI * radius;
    }

    /**
     * 计算圆的面积
     * 
     * @param radius
     * @return
     */
    private static double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        System.out.print("半径为" + CIRCLE_RADIUS + "的圆的周长为: ");
        System.out.println(calculatePerimeter(CIRCLE_RADIUS));

        System.out.print("半径为" + CIRCLE_RADIUS + "的圆的面积为: ");
        System.out.println(calculateArea(CIRCLE_RADIUS));
    }

}
