public class Faculty extends Person {

    private String rank;
    private String officeHours;

    public Faculty(String name, String address, String phoneNumber, String email, String rank, String officeHours) {
        super(name, address, phoneNumber, email);
        this.rank = rank;
        this.officeHours = officeHours;
    }

    public String getRank() {
        return rank;
    }

    public String getOfficeHours() {
        return officeHours;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public void setOfficeHours(String officeHours) {
        this.officeHours = officeHours;
    }

}
