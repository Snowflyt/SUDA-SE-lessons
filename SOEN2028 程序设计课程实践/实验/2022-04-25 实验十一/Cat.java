public class Cat {

    private String name;
    private int age;
    private String coatColor;
    private String sound;
    private double x;
    private double y;
    private double z;

    public Cat(String name) {
        this.name = name;
    }

    public double findDistance() {
        return findDistance(10.0, 20.0, 0.0);
    }

    public double findDistance(double x, double y, double z) {
        return Math.sqrt(x * x + y * y + z * z);
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public void setCoatColor(String coatColor) {
        this.coatColor = coatColor;
    }

    public String getCoatColor() {
        return coatColor;
    }

    public void setSound(String sound) {
        this.sound = sound;
    }

    public String getSound() {
        return sound;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getX() {
        return x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getY() {
        return y;
    }

    public void setZ(double z) {
        this.z = z;
    }

    public double getZ() {
        return z;
    }

}
