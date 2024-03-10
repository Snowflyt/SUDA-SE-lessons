import java.util.Scanner;

public class Exercise7 {

    public static void main(String[] args) {
        // Prompt the user to enter the loan amount and number of years.
        Scanner sc = new Scanner(System.in);
        System.out.print("Loan Amount: ");
        double loanAmount = sc.nextDouble();
        System.out.print("Number of Years: ");
        int numberOfYears = sc.nextInt();
        sc.close();

        // Print the table.
        System.out.println("Interest Rate    Monthly Payment    Total Payment");
        for (double annualInterestRate = 5.0; annualInterestRate <= 8.0; annualInterestRate += 0.125) {
            double monthlyInterestRate = annualInterestRate / 1200;
            double monthlyPayment = loanAmount * monthlyInterestRate /
                    (1 - 1 / Math.pow(1 + monthlyInterestRate, numberOfYears * 12.0));
            double totalPayment = monthlyPayment * numberOfYears * 12;
            System.out.printf("%-16.3f%-20.2f%.2f%n", annualInterestRate, monthlyPayment, totalPayment);
        }
    }

}
