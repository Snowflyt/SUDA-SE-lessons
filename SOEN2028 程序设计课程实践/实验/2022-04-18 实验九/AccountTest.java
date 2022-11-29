public class AccountTest {

    public static void main(String[] args) {
        Account acc = new Account(1122, 20000.0);
        acc.setAnnualInterestRate(4.5);
        System.out.println("ID: " + acc.getId());
        System.out.println("Balance: " + acc.getBalance());
        System.out.println("Monthly interest rate: " + acc.getMonthlyInterestRate());
        System.out.println("Date created: " + acc.getDateCreated());
        acc.withdraw(2500);
        System.out.println("Withdraw 2500: " + acc.getBalance());
        acc.deposit(3000);
        System.out.println("Deposit 3000: " + acc.getBalance());
        System.out.println("Balance: " + acc.getBalance());
        System.out.println("Monthly interest rate: " + acc.getMonthlyInterestRate());
        System.out.println("Date created: " + acc.getDateCreated());
    }

}
