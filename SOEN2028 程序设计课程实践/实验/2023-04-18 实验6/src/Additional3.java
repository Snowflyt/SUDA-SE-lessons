import java.util.Random;

public class Additional3 {
    private static final Random rand = new Random();

    /**
     * Return a random number between min and max, inclusive.
     */
    private static int generateRandomNumber(int min, int max) {
        return rand.nextInt(max - min + 1) + min;
    }

    /**
     * Return a random array of integers.
     * 
     * @param length
     * @param min
     * @param max
     * @return
     */
    private static int[] generateRandomArray(int length, int min, int max) {
        int[] array = new int[length];
        for (int i = 0; i < length; i++) {
            array[i] = generateRandomNumber(min, max);
        }
        return array;
    }

    /**
     * Adjust the order of the elements in the array so that all the odd numbers
     * come before all the even numbers. (use a new array)
     * 
     * @param array
     * @return
     */
    private static int[] adjust(int[] array) {
        int[] newArray = new int[array.length];
        int i = 0;
        int j = array.length - 1;
        for (int k = 0; k < array.length; k++) {
            if (array[k] % 2 == 1) {
                newArray[i++] = array[k];
            } else {
                newArray[j--] = array[k];
            }
        }
        return newArray;
    }

    /**
     * Adjust the order of the elements in the array so that all the odd numbers
     * come before all the even numbers. (do not use a new array)
     * 
     * @param array
     */
    private static void adjustInplace(int[] array) {
        int i = 0;
        int j = array.length - 1;
        while (i < j) {
            while (i < j && array[i] % 2 == 1) {
                i++;
            }
            while (i < j && array[j] % 2 == 0) {
                j--;
            }
            if (i < j) {
                int temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }

    public static void main(String[] args) {
        // Generate a random array of integers
        int[] array = generateRandomArray(100, 1, 1000);

        // Display the array
        System.out.println("The array:");
        for (int i = 0; i < array.length; i++) {
            System.out.printf("%4d", array[i]);
            if (i % 10 == 9) {
                System.out.println();
            }
        }
        System.out.println();

        // Adjust the order of the elements in the array so that all the odd
        // numbers come before all the even numbers. (use a new array)
        int[] newArray = adjust(array);

        // Display the new array
        System.out.println("The new array:");
        for (int i = 0; i < newArray.length; i++) {
            System.out.printf("%4d", newArray[i]);
            if (i % 10 == 9) {
                System.out.println();
            }
        }
        System.out.println();

        // Adjust the order of the elements in the array so that all the odd
        // numbers come before all the even numbers. (do not use a new array)
        adjustInplace(array);

        // Display the array
        System.out.println("The array after adjustment:");
        for (int i = 0; i < array.length; i++) {
            System.out.printf("%4d", array[i]);
            if (i % 10 == 9) {
                System.out.println();
            }
        }
    }
}
