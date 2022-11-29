import java.util.Date;

public class Employee extends Person {

    private Date dateHired;
    private double salary;
    private String office;

    public Employee(String name, String address, String phoneNumber, String email,
            Date dateHired, double salary, String office) {
        super(name, address, phoneNumber, email);
        this.office = office;
        this.salary = salary;
        this.dateHired = dateHired;
    }

    public String getOffice() {
        return office;
    }

    public double getSalary() {
        return salary;
    }

    public Date getDateHired() {
        return dateHired;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public void setDateHired(Date dateHired) {
        this.dateHired = dateHired;
    }

}
