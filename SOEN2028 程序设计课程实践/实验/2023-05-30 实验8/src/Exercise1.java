import java.util.Calendar;

public class Exercise1 {
    /**
     * Build a calendar object with the given year, month, and day.
     * 
     * @param year  The year of the calendar.
     * @param month The month of the calendar. (1-12, not 0-11)
     * @param day   The day of the calendar. (1-31)
     * @return The calendar object.
     */
    private static Calendar buildCalendar(int year, int month, int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(year, month - 1, day);
        return calendar;
    }

    /**
     * Calculate the days between two calendar objects.
     * 
     * @param calendar1 The first calendar object.
     * @param calendar2 The second calendar object.
     * @return The days between the two calendar objects.
     */
    private static long daysBetween(Calendar calendar1, Calendar calendar2) {
        long time1 = calendar1.getTimeInMillis();
        long time2 = calendar2.getTimeInMillis();
        long days = (time2 - time1) / (24 * 60 * 60 * 1000);
        return days;
    }

    public static void main(String[] args) {
        if (args.length != 6) {
            System.out.println("Usage: java Exercise1 year1 month1 day1 year2 month2 day2");
            System.exit(1);
        }

        /* Read the arguments */
        int year1 = Integer.parseInt(args[0]);
        int month1 = Integer.parseInt(args[1]);
        int day1 = Integer.parseInt(args[2]);

        int year2 = Integer.parseInt(args[3]);
        int month2 = Integer.parseInt(args[4]);
        int day2 = Integer.parseInt(args[5]);

        /* Build the calendar objects */
        Calendar calendar1 = buildCalendar(year1, month1, day1);
        Calendar calendar2 = buildCalendar(year2, month2, day2);

        /* Calculate the days between */
        long days = daysBetween(calendar1, calendar2);

        /* Print the result */
        System.out.println("The number of days between " +
                year1 + "-" + month1 + "-" + day1 + " and " +
                year2 + "-" + month2 + "-" + day2 + " is " + days);
    }
}
