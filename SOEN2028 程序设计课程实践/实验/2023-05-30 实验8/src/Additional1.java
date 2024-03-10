import java.util.Calendar;
import java.util.Scanner;

public class Additional1 {
    public static void main(String[] args) {
        /* Input */
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year after 2020: ");
        int year = sc.nextInt();
        sc.close();

        /* Print calendars by month */
        Calendar calendar = Calendar.getInstance();
        for (int i = 1; i <= 12; i++) {
            calendar.set(year, i - 1, 1);
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
            int daysInMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
            String month = calendar.getDisplayName(Calendar.MONTH, Calendar.LONG, java.util.Locale.US);
            System.out.println("           " + month + " " + year);
            System.out.println("  SUN  MON TUES  WED THUR  FRI  SAT");
            for (int j = 1; j < dayOfWeek; j++) {
                System.out.print("     ");
            }
            for (int j = 1; j <= daysInMonth; j++) {
                System.out.printf("%5d", j);
                if (dayOfWeek == 7) {
                    System.out.println();
                    dayOfWeek = 0;
                }
                dayOfWeek++;
            }
            System.out.println("\n");
        }
    }
}
