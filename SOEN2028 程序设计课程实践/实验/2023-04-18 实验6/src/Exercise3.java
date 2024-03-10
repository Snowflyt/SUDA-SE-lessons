class StopWatch {
    private long startTime;
    private long endTime;

    public StopWatch() {
        startTime = System.currentTimeMillis();
    }

    public long getStartTime() {
        return startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    /**
     * Start the stopwatch.
     */
    public void start() {
        startTime = System.currentTimeMillis();
    }

    /**
     * Stop the stopwatch.
     */
    public void stop() {
        endTime = System.currentTimeMillis();
    }

    /**
     * Return the elapsed time for the stopwatch (in milliseconds).
     * 
     * @return
     */
    public long getElapsedTime() {
        return endTime - startTime;
    }
}

public class Exercise3 {
    /**
     * Sort the elements using selection sort.
     * 
     * @param <T> The type of the elements in the array.
     * @param arr The array to be sorted.
     * @return
     */
    private static <T extends Comparable<T>> T[] selectionSort(T[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            T currentMin = arr[i];
            int currentMinIndex = i;

            for (int j = i + 1; j < arr.length; j++) {
                if (currentMin.compareTo(arr[j]) > 0) {
                    currentMin = arr[j];
                    currentMinIndex = j;
                }
            }

            if (currentMinIndex != i) {
                arr[currentMinIndex] = arr[i];
                arr[i] = currentMin;
            }
        }

        return arr;
    }

    public static void main(String[] args) {
        Integer[] arr = new Integer[100000];
        for (int i = 0; i < arr.length; i++) {
            arr[i] = (int) (Math.random() * 100000);
        }

        StopWatch stopwatch = new StopWatch();
        stopwatch.start();
        selectionSort(arr);
        stopwatch.stop();
        System.out.println("Elapsed time: " + stopwatch.getElapsedTime() + " ms");
    }
}
