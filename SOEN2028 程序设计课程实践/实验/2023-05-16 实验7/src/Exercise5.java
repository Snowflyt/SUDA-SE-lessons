import java.util.Date;

public class Exercise5 {
    public static double sumArea(GeometricObject[] a) {
        double sum = 0.0;
        for (GeometricObject o : a) {
            sum += o.getArea();
        }
        return sum;
    }

    public static void main(String[] args) {
        GeometricObject[] arr = new GeometricObject[] {
                new Circle(1.0),
                new Circle(2.0),
                new Rectangle(1.0, 2.0),
                new Triangle(2.0, 2.0, 2.0)
        };
        double totalArea = sumArea(arr);
        System.out.println("Total area: " + totalArea);
    }
}

/* Dependent classes */
class Triangle extends GeometricObject implements Colorable {
    private double side1;
    private double side2;
    private double side3;

    public Triangle() {
        this(1.0, 1.0, 1.0);
    }

    public Triangle(double side1, double side2, double side3) {
        super();
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    public Triangle(double side1, double side2, double side3, String color, boolean filled) {
        super(color, filled);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    @Override
    public void howToColor() {
        System.out.println("Color all three sides");
    }

    @Override
    public double getArea() {
        // Heron's formula
        double s = (side1 + side2 + side3) / 2;
        return Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
    }

    @Override
    public double getPerimeter() {
        return side1 + side2 + side3;
    }
}

class Circle extends GeometricObject implements Colorable {
    private double radius;

    public Circle() {
        this(1.0);
    }

    public Circle(double radius) {
        super();
        this.radius = radius;
    }

    public Circle(double radius, String color, boolean filled) {
        super(color, filled);
        this.radius = radius;
    }

    @Override
    public void howToColor() {
        System.out.println("Color the circumference");
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public double getDiameter() {
        return 2 * radius;
    }

    @Override
    public double getArea() {
        return radius * radius * Math.PI;
    }

    @Override
    public double getPerimeter() {
        return 2 * radius * Math.PI;
    }
}

class Rectangle extends GeometricObject implements Colorable {
    private double width;
    private double height;

    public Rectangle() {
        this(1.0, 1.0);
    }

    public Rectangle(double width, double height) {
        super();
        this.width = width;
        this.height = height;
    }

    public Rectangle(double width, double height, String color, boolean filled) {
        super(color, filled);
        this.width = width;
        this.height = height;
    }

    @Override
    public void howToColor() {
        System.out.println("Color all four sides");
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }

    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
}

interface Colorable {
    void howToColor();
}

abstract class GeometricObject {
    private String color;
    private boolean filled;
    private Date dateCreated;

    protected GeometricObject() {
        this("white", false);
    }

    protected GeometricObject(String color, boolean filled) {
        this.color = color;
        this.filled = filled;
        this.dateCreated = new Date();
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isFilled() {
        return filled;
    }

    public void setFilled(boolean filled) {
        this.filled = filled;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    @Override
    public String toString() {
        return this.getClass().getName() + " created on " + dateCreated +
                "\ncolor: " + color + " and filled: " + filled;
    }

    public abstract double getArea();

    public abstract double getPerimeter();
}
