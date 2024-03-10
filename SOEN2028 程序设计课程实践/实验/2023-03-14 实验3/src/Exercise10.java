import java.util.Scanner;

public class Exercise10 {

    public static void main(String[] args) {
        // Prompt the user to enter the amount,
        // annual interest rate, and number of months.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the annual deposit amount: ");
        double annualDepositAmount = sc.nextDouble();
        System.out.print("Enter the annual interest rate (%): ");
        double annualInterestRate = sc.nextDouble();
        System.out.print("Enter the number of months: ");
        int numberOfMonths = sc.nextInt();
        sc.close();

        // Calculate the monthly interest rate.
        double monthlyInterestRate = annualInterestRate / 1200;

        // Calculate the balance.
        double balance = 0;
        for (int i = 1; i <= numberOfMonths; i++) {
            balance = (balance + annualDepositAmount) * (1 + monthlyInterestRate);
        }

        // Print the result.
        System.out.println("Balance after " + numberOfMonths + " months: " + balance);
    }

}
