import java.util.Random;

public class Exercise1 {

    /**
     * An array used to store literal string constants of each month.
     */
    private static final String[] MONTHS = {
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
    };

    /**
     * Generate an integer between 1 and 12 (12 is included).
     * 
     * @return
     */
    private static int generateRandomMonth() {
        Random random = new Random();
        return random.nextInt(13);
    }

    public static void main(String[] args) {
        int month = generateRandomMonth();
        int monthIdx = month - 1;

        System.out.println(MONTHS[monthIdx]);
    }

}
