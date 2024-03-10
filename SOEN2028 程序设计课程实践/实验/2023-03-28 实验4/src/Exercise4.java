import java.util.Random;

public class Exercise4 {
    private enum State {
        CONTINUE, WON, LOST
    }

    private static final Random rand = new Random();

    /**
     * Roll the dice (returns a random number between 1 and 6).
     * 
     * @return
     */
    private static int roll() {
        return rand.nextInt(6) + 1;
    }

    /**
     * Roll two dice and return the sum.
     * 
     * @return
     */
    private static int rollTwoDice() {
        return roll() + roll();
    }

    /**
     * Check whether the player wins, loses or continues.
     * 
     * @param sum
     * @return
     */
    private static State checkWin(int sum) {
        switch (sum) {
            case 7:
            case 11:
                return State.WON;
            case 2:
            case 3:
            case 12:
                return State.LOST;
            default:
                return State.CONTINUE;
        }
    }

    public static void main(String[] args) {
        // Play the game
        int point = rollTwoDice();
        System.out.println("You rolled " + point);
        switch (checkWin(point)) {
            case WON:
                System.out.println("You win!");
                break;
            case LOST:
                System.out.println("You lose!");
                break;
            case CONTINUE:
                System.out.println("Roll again!");
                while (true) {
                    int sum = rollTwoDice();
                    System.out.println("You rolled " + sum);

                    if (sum == point) {
                        System.out.println("You win!");
                        break;
                    } else if (sum == 7) {
                        System.out.println("You lose!");
                        break;
                    } else {
                        System.out.println("Roll again!");
                    }
                }
                break;
        }
    }
}
