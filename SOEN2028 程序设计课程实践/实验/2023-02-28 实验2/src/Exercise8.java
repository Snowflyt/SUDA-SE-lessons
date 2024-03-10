import java.time.DayOfWeek;
import java.util.Scanner;

public class Exercise8 {

    /**
     * Calculate what day of the week is the year, month, day.
     * 
     * @param year
     * @param month
     * @param day
     * @return
     */
    private static DayOfWeek getDayOfWeek(int year, int month, int day) {
        // Use the Zeller consistency formula to calculate the day of the week.
        int q = day;
        int m;
        if (month <= 2) {
            m = month + 12;
            year--;
        } else {
            m = month;
        }
        int j = year / 100;
        int k = year % 100;

        int h = (q + 26 * (m + 1) / 10 + k + k / 4 + j / 4 + 5 * j) % 7;

        switch (h) {
            case 0:
                return DayOfWeek.SATURDAY;
            case 1:
                return DayOfWeek.SUNDAY;
            case 2:
                return DayOfWeek.MONDAY;
            case 3:
                return DayOfWeek.TUESDAY;
            case 4:
                return DayOfWeek.WEDNESDAY;
            case 5:
                return DayOfWeek.THURSDAY;
            case 6:
                return DayOfWeek.FRIDAY;
            default:
                return null;
        }
    }

    public static void main(String[] args) {
        // Get input from user.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter year, month and day (e.g. 2023 3 1): ");
        int year = sc.nextInt();
        int month = sc.nextInt();
        int day = sc.nextInt();
        sc.close();

        // Print the result.
        DayOfWeek dayOfWeek = getDayOfWeek(year, month, day);
        System.out.println(dayOfWeek);
    }

}
