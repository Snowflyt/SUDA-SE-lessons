public class Staff extends Person {

    private String job;
    
    public Staff(String name, String address, String phoneNumber, String email, String office) {
        super(name, address, phoneNumber, email);
        this.job = office;
    }
    
    public String getJob() {
        return job;
    }
    
    public void setJob(String job) {
        this.job = job;
    }

}
