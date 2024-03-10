import java.util.Random;
import java.util.Scanner;

public class Exercise4 {

    private static final String WIN_STRING = "You win!";
    private static final String LOSE_STRING = "You lose!";
    private static final String DRAW_STRING = "Draw!";

    private static final String[] PUNCHES = { "Rock", "Scissors", "Paper" };

    public static void main(String[] args) {
        // Generate a random integer between 0 and 2 (2 is included).
        Random random = new Random();
        int computerPunchIdx = random.nextInt(3);

        // Input an integer representing rock, scissors and paper.
        System.out.print("Input an integer representing rock(0), scissors(1) or paper(2): ");
        Scanner sc = new Scanner(System.in);
        int userPunchIdx = sc.nextInt();
        sc.close();

        // Print computer and user punches.
        System.out.println("Computer: " + PUNCHES[computerPunchIdx]);
        System.out.println("You: " + PUNCHES[userPunchIdx]);

        // Print the result.
        if (computerPunchIdx == userPunchIdx) {
            System.out.println(DRAW_STRING);
        } else if (computerPunchIdx == 0 && userPunchIdx == 1) {
            // Rock vs. Scissors
            System.out.println(LOSE_STRING);
        } else if (computerPunchIdx == 0 && userPunchIdx == 2) {
            // Rock vs. Paper
            System.out.println(WIN_STRING);
        } else if (computerPunchIdx == 1 && userPunchIdx == 0) {
            // Scissors vs. Rock
            System.out.println(WIN_STRING);
        } else if (computerPunchIdx == 1 && userPunchIdx == 2) {
            // Scissors vs. Paper
            System.out.println(LOSE_STRING);
        } else if (computerPunchIdx == 2 && userPunchIdx == 0) {
            // Paper vs. Rock
            System.out.println(LOSE_STRING);
        } else {
            // Paper vs. Scissors
            System.out.println(WIN_STRING);
        }
    }

}
