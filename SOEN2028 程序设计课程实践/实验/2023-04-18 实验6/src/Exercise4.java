import java.util.Date;

class Account {
    private int id = 0;
    private double balance = 0;
    private double annualInterestRate;
    private final Date dateCreated;

    public Account() {
        dateCreated = new Date(System.currentTimeMillis());
    }

    public Account(int id, double balance) {
        this();
        this.id = id;
        this.balance = balance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public double getAnnualInterestRate() {
        return annualInterestRate;
    }

    public void setAnnualInterestRate(double annualInterestRate) {
        this.annualInterestRate = annualInterestRate;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    /**
     * Return the monthly interest rate.
     * 
     * @return
     */
    public double getMonthlyInterestRate() {
        return annualInterestRate / 12;
    }

    /**
     * Withdraw the specified amount from the account.
     */
    public void withDraw(double amount) {
        balance -= amount;
    }

    /**
     * Deposit the specified amount to the account.
     */
    public void deposit(double amount) {
        balance += amount;
    }
}

public class Exercise4 {
    public static void main(String[] args) {
        Account account = new Account(1122, 20000);
        account.setAnnualInterestRate(0.045);
        account.withDraw(2500);
        account.deposit(3000);
        System.out.printf("Balance: $%.2f%n", account.getBalance());
        System.out.printf("Monthly interest: %.2f%%%n", account.getMonthlyInterestRate() * 100);
        System.out.printf("Date created: %s%n", account.getDateCreated());
    }
}
