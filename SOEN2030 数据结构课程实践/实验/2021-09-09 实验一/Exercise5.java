import java.util.HashMap;

public class Exercise5 {

    public static void main(String[] args) {
        int[] arr = {30, 32, 32, 66,  7, 32, 32, 32, 86, 32, 
                     32, 40, 84, 11, 88, 32, 32, 32, 32,  5,
                     81, 79, 32, 32, 77,  8, 32, 32, 48, 32,
                     24, 32, 32, 37, 18, 32, 17, 32, 23,  6,
                     62, 32, 59, 95, 32, 32,  5, 45, 29, 32,
                     32, 97, 32, 51, 75, 32, 32, 32, 32,  6,
                     48, 32, 32, 16, 32, 32, 64, 32, 53, 32,
                     68, 32, 32, 32, 32, 32, 49, 69, 32, 32,
                      5, 50, 98, 87, 32, 99, 32,  9, 69, 32,
                     62, 32, 29, 32, 32, 32, 32, 32, 48, 32};
        HashMap<Integer, Integer> count = new HashMap<Integer, Integer>();
        for (int i = 0; i < arr.length; i++) {
            if (count.get(arr[i]) == null) {
                count.put(arr[i], 1);
            } else {
                count.put(arr[i], count.get(arr[i])+1);
            }
            if (count.get(arr[i]) > arr.length / 2) {
                System.out.println(arr[i]);
                break;
            }
        }
    }

}
