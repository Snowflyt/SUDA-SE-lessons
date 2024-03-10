import java.util.Arrays;
import java.util.Random;

public class Additional1 {
    private enum Box {
        GOLD, SILVER
    }

    /**
     * Number of trials to perform.
     */
    private static final int N = 10000;

    private static final Random rand = new Random();

    public static void main(String[] args) {
        int winSwap = 0;
        int winNotSwap = 0;
        Box[] boxes = new Box[] { Box.GOLD, Box.SILVER, Box.SILVER };

        for (int i = 0; i < N; i++) {
            // Choose a box
            int choice = rand.nextInt(3);
            if (boxes[choice] == Box.GOLD) {
                winNotSwap++;
            }
            // Remove a silver box
            int removed = boxes[choice] == Box.GOLD
                    ? rand.nextInt(2) + 1
                    : choice == 1 ? 2 : 1;
            // Swap
            int swap = Arrays.asList(0, 1, 2).stream()
                    .filter(idx -> idx != choice && idx != removed)
                    .findFirst().get();
            if (boxes[swap] == Box.GOLD) {
                winSwap++;
            }
        }

        System.out.println("Win swap: " + winSwap);
        System.out.println("Win not swap: " + winNotSwap);

        if (Math.abs(winSwap - winNotSwap) < 100) {
            System.out.println("No significant difference");
        } else if (winSwap > winNotSwap) {
            System.out.println("Swap is better");
        } else {
            System.out.println("Not swap is better");
        }
    }
}
