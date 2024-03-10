public class Exercise4 {

    /**
     * The current tuition of a university.
     */
    private static final double CURRENT_TUITION = 10000;

    /**
     * Rate of tuition increase.
     */
    private static final double RATE = 0.05;

    public static void main(String[] args) {
        double tuition = CURRENT_TUITION;

        // Calculate tuition after 10 years.
        for (int i = 0; i < 10; i++) {
            tuition += tuition * RATE;
        }
        System.out.println("Tuition after 10 years: " + tuition);

        // Calculate total tuition of 4 years after 10 years.
        double totalTuition = 0;
        for (int i = 0; i < 4; i++) {
            totalTuition += tuition;
            tuition += tuition * RATE;
        }
        System.out.println("Total tuition of 4 years after 10 years: " + totalTuition);
    }

}
