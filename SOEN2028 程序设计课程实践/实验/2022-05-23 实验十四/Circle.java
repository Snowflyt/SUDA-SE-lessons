public class Circle extends GeometricObject {

    private double radius;
    
    public Circle() {
    }
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    public Circle(double radius, String color, boolean filled) {
        super(color, filled);
        this.radius = radius;
    }
    
    public double getRadius() {
        return radius;
    }
    
    public void setRadius(double radius) {
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return radius * radius * Math.PI;
    }

    @Override
    public double getPerimeter() {
        return 2 * radius * Math.PI;
    }
    
    public double getDiameter() {
        return radius * 2 * Math.PI;
    }
    
    @Override
    public String toString() {
        return super.toString() + "\nradius: " + radius;
    }

}
