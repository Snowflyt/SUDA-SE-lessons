public class Student extends Person {

    private int year;
    
    public Student(String name, String address, String phoneNumber, String email, int year) {
        super(name, address, phoneNumber, email);
        this.year = year;
    }
    
    public int getYear() {
        return year;
    }
    
    public void setYear(int year) {
        this.year = year;
    }

}
