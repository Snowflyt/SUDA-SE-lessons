import java.util.Scanner;

public class Exercise6 {

    /**
     * Get the shipping price of a package by weight.
     * <p>
     * Return -1 if the package cannot be shipped.
     * 
     * @param weight
     */
    private static double getPackageShippingPrice(double weight) {
        if (weight <= 0) {
            throw new IllegalArgumentException("weight must be larger than 0");
        }

        if (weight <= 1) {
            return 3.5;
        } else if (weight <= 3) {
            return 5.5;
        } else if (weight <= 10) {
            return 8.5;
        } else if (weight <= 20) {
            return 10.5;
        }

        return -1;
    }

    public static void main(String[] args) {
        // Input the weight of the package.
        System.out.print("Input the weight of a package: ");
        Scanner sc = new Scanner(System.in);
        double weight = sc.nextDouble();
        sc.close();

        // Print the result.
        try {
            double price = getPackageShippingPrice(weight);
            if (price != -1) {
                System.out.println("The shipping price of a package weighting " + weight + " is " + price + ".");
            } else {
                System.out.println("The package cannot be shipped.");
            }
        } catch (IllegalArgumentException e) {
            System.out.println("Weight must be larger than 0.");
        }
    }

}
