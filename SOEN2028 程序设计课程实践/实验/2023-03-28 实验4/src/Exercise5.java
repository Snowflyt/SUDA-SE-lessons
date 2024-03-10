import java.util.Scanner;

public class Exercise5 {
    private static class Point {
        private double x;
        private double y;

        public Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

        @Override
        public String toString() {
            return "(" + x + ", " + y + ")";
        }

        public double getX() {
            return x;
        }

        public double getY() {
            return y;
        }
    }

    /**
     * Judge whether point(x2, y2) is left of the line determined by point(x0, y0)
     * and point(x1, y1).
     * 
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    private static boolean leftOfTheLine(double x0, double y0, double x1, double y1, double x2, double y2) {
        return (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0) > 0;
    }

    /**
     * Judge whether point(x2, y2) is on the line determined by point(x0, y0) and
     * point(x1, y1).
     * 
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    private static boolean onTheSameLine(double x0, double y0, double x1, double y1, double x2, double y2) {
        return (x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0) == 0;
    }

    /**
     * Judge whether point(x2, y2) is on the line segment determined by point(x0,
     * y0) and point(x1, y1).
     * 
     * @param x0
     * @param y0
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @return
     */
    private static boolean onTheLineSegment(double x0, double y0, double x1, double y1, double x2, double y2) {
        return onTheSameLine(x0, y0, x1, y1, x2, y2) && (x2 >= x0 && x2 <= x1 || x2 >= x1 && x2 <= x0)
                && (y2 >= y0 && y2 <= y1 || y2 >= y1 && y2 <= y0);
    }

    public static void main(String[] args) {
        // Get user input
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter x and y for point p0 (separated by a space): ");
        Point p0 = new Point(sc.nextDouble(), sc.nextDouble());
        System.out.print("Enter x and y for point p1 (separated by a space): ");
        Point p1 = new Point(sc.nextDouble(), sc.nextDouble());
        System.out.print("Enter x and y for point p2 (separated by a space): ");
        Point p2 = new Point(sc.nextDouble(), sc.nextDouble());
        sc.close();

        // Print result
        System.out.println(p2 + " is " +
                (leftOfTheLine(p0.getX(), p0.getY(), p1.getX(), p1.getY(), p2.getX(), p2.getY())
                        ? "left of the line from " + p0 + " to " + p1
                        : onTheLineSegment(p0.getX(), p0.getY(), p1.getX(), p1.getY(), p2.getX(), p2.getY())
                                ? "on the same line from " + p0 + " to " + p1
                                : "right of the line from " + p0 + " to " + p1));
    }
}
