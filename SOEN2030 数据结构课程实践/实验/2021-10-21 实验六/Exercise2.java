public class Exercise2 {

    public static void main(String[] args) {
        int k = 17;
        int[] lst1 = {2, 3, 4, 5, 9, 10, 17, 19, 22, 23, 25, 26, 27, 30, 30, 33, 39, 40, 42, 44, 46, 46, 47, 48, 48, 50, 54, 55, 56, 57, 63, 67, 68, 70, 72, 73, 76};
        int[] lst2 = {8, 13, 15, 16, 16, 20, 21, 22, 24, 28, 29, 31, 32, 34, 36, 37, 38, 40, 40, 41, 43, 44, 45, 48, 49, 50, 50, 52, 53, 59, 61, 62, 64, 64, 67, 68, 75, 77, 77};
        int i = 0, j = 0;
        int count = 1;
        int result = lst1[0];
        while (count < k) {
            while (lst1[i] < lst2[j] && count < k) {
                if (lst1[i] > result) {
                    result = lst1[i];
                    count++;
                }
                i++;
            }
            while (lst2[j] <= lst1[i] && count < k) {
                if (lst2[j] > result) {
                    result = lst2[j];
                    count++;
                }
                j++;
            }
        }
        System.out.println(result);
    }

}