public class CatTest {

    public static void main(String[] args) {
        Cat cat1 = new Cat("Xiao Bai");
        cat1.setAge(2);
        cat1.setCoatColor("white");
        cat1.setSound("meow-meow-");
        cat1.setX(200.0);
        cat1.setY(-100.0);
        cat1.setZ(0.0);
        System.out.println("Name: " + cat1.getName());
        System.out.println("Age: " + cat1.getAge());
        System.out.println("Coat color: " + cat1.getCoatColor());
        System.out.println("Sound: " + cat1.getSound());
        System.out.println("XYZ: (" + cat1.getX() + 
                           ", " + cat1.getY() +
                           ", " + cat1.getZ() + ")");
        Cat cat2 = new Cat("Xiao Hei");
        cat2.setAge(3);
        cat2.setCoatColor("black");
        cat2.setSound("meow~meow~");
        cat2.setX(-600.0);
        cat2.setY(900.0);
        cat2.setZ(3.0);
        System.out.println("Name: " + cat2.getName());
        System.out.println("Age: " + cat2.getAge());
        System.out.println("Coat color: " + cat2.getCoatColor());
        System.out.println("Sound: " + cat2.getSound());
        System.out.println("XYZ: (" + cat2.getX() + 
                           ", " + cat2.getY() +
                           ", " + cat2.getZ() + ")");
    }

}
