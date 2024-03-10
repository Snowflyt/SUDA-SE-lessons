import java.util.Scanner;

public class Exercise7 {

    private static class Point {

        private double x;
        private double y;

        public Point(double x, double y) {
            this.x = x;
            this.y = y;
        }

    }

    private static class Rectangle {

        public static final int INSIDE = -1;
        public static final int OUTSIDE = 1;
        public static final int OVERLAP = 0;

        private Point center;
        private double width;
        private double height;

        public Rectangle(Point center, double width, double height) {
            this.center = center;
            this.width = width;
            this.height = height;
        }

        /**
         * Determine whether another rectangle is inside, outside, or overlapping.
         * <p>
         * If it is inside, return -1;
         * If it is outside, return 1;
         * If there is overlap, return 0.
         * 
         * @param other
         */
        public int compare(Rectangle other) {
            // Calculate the coordinates of the upper left
            // and lower right corners of the two rectangles.
            double x1 = center.x - width / 2;
            double y1 = center.y + height / 2;
            double x2 = center.x + width / 2;
            double y2 = center.y - height / 2;
            double x3 = other.center.x - other.width / 2;
            double y3 = other.center.y + other.height / 2;
            double x4 = other.center.x + other.width / 2;
            double y4 = other.center.y - other.height / 2;

            // Determine whether they intersect.
            if (Math.max(x1, x3) <= Math.min(x2, x4) && Math.max(y2, y4) <= Math.min(y1, y3)) {
                // Determine whether they contain.
                if (x1 <= x3 && x2 >= x4 && y1 >= y3 && y2 <= y4) {
                    return INSIDE;
                } else {
                    return OVERLAP;
                }
            } else {
                return OUTSIDE;
            }
        }

    }

    public static void main(String[] args) {
        // Input the two rectangles.
        Scanner sc = new Scanner(System.in);
        System.out.print("Input the x and y of the center of the first rectangle (separated by space): ");
        Point center1 = new Point(sc.nextDouble(), sc.nextDouble());
        System.out.print("Input the width and height of the first rectangle (separated by space): ");
        Rectangle rect1 = new Rectangle(center1, sc.nextDouble(), sc.nextDouble());
        System.out.print("Input the x and y of the center of the second rectangle (separated by space): ");
        Point center2 = new Point(sc.nextDouble(), sc.nextDouble());
        System.out.print("Input the width and height of the second rectangle (separated by space): ");
        Rectangle rect2 = new Rectangle(center2, sc.nextDouble(), sc.nextDouble());
        sc.close();

        // Print the result.
        int result = rect1.compare(rect2);
        switch (result) {
            case Rectangle.INSIDE:
                System.out.println("The second rectangle is inside the first rectangle");
                break;
            case Rectangle.OUTSIDE:
                System.out.println("The second rectangle is outside the first rectangle");
                break;
            case Rectangle.OVERLAP:
                System.out.println("The two rectangles overlap");
                break;
        }
    }

}
