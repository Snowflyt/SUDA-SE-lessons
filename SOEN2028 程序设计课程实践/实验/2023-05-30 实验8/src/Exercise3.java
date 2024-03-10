import java.util.Calendar;
import java.util.TimeZone;

class Time {
    private int hour;
    private int minute;
    private int second;

    public Time() {
        long currentTime = System.currentTimeMillis();
        setTime(currentTime);
    }

    public Time(long elapseTime) {
        setTime(elapseTime);
    }

    public Time(int hour, int minute, int second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    public int getHour() {
        return hour;
    }

    public int getMinute() {
        return minute;
    }

    public int getSecond() {
        return second;
    }

    public void setTime(long elapseTime) {
        long totalSeconds = elapseTime / 1000;
        second = (int) (totalSeconds % 60);
        long totalMinutes = totalSeconds / 60;
        minute = (int) (totalMinutes % 60);
        long totalHours = totalMinutes / 60;
        hour = (int) (totalHours % 24);
    }
}

public class Exercise3 {
    private static class ToBe<T> {
        private T value;

        private ToBe(T value) {
            this.value = value;
        }

        public void toBe(T value) {
            if (!this.value.equals(value)) {
                throw new RuntimeException("Expect: " + value + ", but: " + this.value);
            }
        }
    }

    private static <T> ToBe<T> expect(T value) {
        return new ToBe<>(value);
    }

    public static void main(String[] args) {
        Calendar currentCalendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));

        Time time1 = new Time();
        Time time2 = new Time(555550000);

        System.out.println("Current time: " + time1.getHour() + ":" + time1.getMinute() + ":" + time1.getSecond());
        expect(time1.getHour()).toBe(currentCalendar.get(Calendar.HOUR_OF_DAY));
        expect(time1.getMinute()).toBe(currentCalendar.get(Calendar.MINUTE));
        expect(time1.getSecond()).toBe(currentCalendar.get(Calendar.SECOND));

        System.out.println("Time 2: " + time2.getHour() + ":" + time2.getMinute() + ":" + time2.getSecond());
        expect(time2.getHour()).toBe(10);
        expect(time2.getMinute()).toBe(19);
        expect(time2.getSecond()).toBe(10);

        System.out.println("All tests passed");
    }
}
