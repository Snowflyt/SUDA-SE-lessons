import java.util.Scanner;

public class Exercise5 {

    private static class Point {

        private double x;
        private double y;

        public Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

    }

    /**
     * Check whether a point is inside a circle.
     * 
     * @param point  The point to be checked.
     * @param center The center of the circle.
     * @param radius The radius of the circle.
     */
    private static boolean isInsideCircle(Point point, Point center, double radius) {
        return Math.sqrt(Math.pow(point.x - center.x, 2) * Math.pow(point.y - center.y, 2)) < radius;
    }

    public static void main(String[] args) {
        // Input x and y of the point.
        System.out.print("Input x and y of a point (seperateds by space): ");
        Scanner sc = new Scanner(System.in);
        double x = sc.nextDouble();
        double y = sc.nextDouble();
        sc.close();

        // Print the result.
        System.out.println(
                "(" + x + ", " + y + ") is" +
                        (isInsideCircle(new Point(x, y), new Point(0, 0), 10) ? "" : " not") +
                        " inside the circle");
    }

}
