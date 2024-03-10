import java.util.Date;

class Person {
    private String name;
    private String address;
    private String phoneNumber;
    private String email;

    public Person(String name, String address, String phoneNumber, String email) {
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    @Override
    public String toString() {
        return name + " (" + this.getClass().getName() + ")";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

class Student extends Person {
    public enum Grade {
        Freshman, Sophomore, Junior, Senior
    }

    private Grade grade;

    public Student(String name, String address, String phoneNumber, String email, Grade grade) {
        super(name, address, phoneNumber, email);
        this.grade = grade;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }
}

class Employee extends Person {
    private String office;
    private double salary;
    private Date dateHired;

    public Employee(String name, String address, String phoneNumber, String email, String office, double salary,
            Date dateHired) {
        super(name, address, phoneNumber, email);
        this.office = office;
        this.salary = salary;
        this.dateHired = dateHired;
    }

    public String getOffice() {
        return office;
    }

    public void setOffice(String office) {
        this.office = office;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        if (salary < 0)
            throw new IllegalArgumentException("Argument `salary` must be greater than 0");

        this.salary = salary;
    }

    public Date getDateHired() {
        return dateHired;
    }

    public void setDateHired(Date dateHired) {
        this.dateHired = dateHired;
    }
}

class Faculty extends Employee {
    public enum Rank {
        AssistantProfessor, AssociateProfessor, Professor
    }

    private double officeHours;
    private Rank rank;

    public Faculty(String name, String address, String phoneNumber, String email, String office, double salary,
            Date dateHired, double officeHours, Rank rank) {
        super(name, address, phoneNumber, email, office, salary, dateHired);
        this.officeHours = officeHours;
        this.rank = rank;
    }

    public double getOfficeHours() {
        return officeHours;
    }

    public void setOfficeHours(double officeHours) {
        if (officeHours < 0)
            throw new IllegalArgumentException("Argument `officeHours` must be greater than 0");

        this.officeHours = officeHours;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }
}

class Staff extends Employee {
    private String title;

    public Staff(String name, String address, String phoneNumber, String email, String office, double salary,
            Date dateHired, String title) {
        super(name, address, phoneNumber, email, office, salary, dateHired);
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
