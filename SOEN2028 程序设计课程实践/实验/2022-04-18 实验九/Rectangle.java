public class Rectangle {

    public double width;
    public double height;

    Rectangle() {
        width = 1.0;
        height = 1.0;
    }

    Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getArea() {
        return width * height;
    }

    public double getPerimeter() {
        return 2 * (width + height);
    }

}
