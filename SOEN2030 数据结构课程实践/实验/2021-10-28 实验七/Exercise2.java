public class Exercise2 {

    public static int minIndex(int[] arr) {
        int min = arr[0];
        int minIndex = 0;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
                minIndex = i;
            }
        }
        return minIndex;
    }

    public static void main(String[] args) {
        int[] costTime = { 60, 30, 80, 20, 90, 40, 100, 10, 70, 50 };
        // get order
        int[] costTimeTmp = costTime.clone();
        int[] order = new int[costTime.length];
        for (int i = 0; i < costTime.length; i++) {
            int minIndex = minIndex(costTimeTmp);
            order[i] = minIndex;
            costTimeTmp[minIndex] = 0x7FFFFFFF;
        }
        // print order
        System.out.print("Order: [" + order[0]);
        for (int i = 1; i < order.length; i++) {
            System.out.print(", " + order[i]);
        }
        System.out.println("]");
        // print total time
        int totalTime = 0;
        for (int i = 0; i < order.length; i++) {
            totalTime += costTime[order[i]] * (order.length - i);
        }
        System.out.println("Total Time: " + totalTime + "s");
    }

}
