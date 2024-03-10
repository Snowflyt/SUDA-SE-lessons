import java.util.Random;
import java.util.Scanner;

public class Exercise12 {

    private static final Random rand = new Random();

    private static final String WIN_STRING = "You win!";
    private static final String LOSE_STRING = "You lose!";
    private static final String DRAW_STRING = "Draw!";

    private static final int STRATEGY_3_2 = 0;
    private static final int STRATEGY_5_3 = 1;

    private static final String[] PUNCHES = { "Rock", "Scissors", "Paper" };

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Choose a strategy (0 for 3/2 or 1 for 5/3): ");
        int strategy = sc.nextInt();

        int win = 0;
        int lose = 0;
        int rounds = strategy == STRATEGY_3_2 ? 3 : 5;

        for (int i = 0; i < rounds; i++) {
            System.out.println("Round " + (i + 1));

            // Generate a random integer between 0 and 2 (2 is included).
            int computerPunchIdx = rand.nextInt(3);

            // Input an integer representing rock, scissors and paper.
            System.out.print("Input an integer representing rock(0), scissors(1) or paper(2): ");
            int userPunchIdx = sc.nextInt();

            // Print computer and user punches.
            System.out.println("Computer: " + PUNCHES[computerPunchIdx]);
            System.out.println("You: " + PUNCHES[userPunchIdx]);

            // Print the result.
            if (computerPunchIdx == userPunchIdx) {
                System.out.println(DRAW_STRING);
            } else if ((computerPunchIdx == 0 && userPunchIdx == 1) ||
                    (computerPunchIdx == 1 && userPunchIdx == 2) ||
                    (computerPunchIdx == 2 && userPunchIdx == 0)) {
                // Rock vs. Scissors
                System.out.println(LOSE_STRING);
                lose++;
            } else {
                // Paper vs. Scissors
                System.out.println(WIN_STRING);
                win++;
            }

            // Break the loop if the strategy is 3/2 and the user wins 2 or loses 2,
            // or if the strategy is 5/3 and the user wins 3 or loses 3.
            if ((strategy == STRATEGY_3_2 && (win == 2 || lose == 2)) ||
                    (strategy == STRATEGY_5_3 && (win == 3 || lose == 3))) {
                break;
            }
        }
        sc.close();

        // Print the final result.
        System.out.println("\nFinal result: " + win + " - " + lose);
        if (win == lose) {
            System.out.println(DRAW_STRING);
        } else if (win > lose) {
            System.out.println(WIN_STRING);
        } else {
            System.out.println(LOSE_STRING);
        }
    }

}
