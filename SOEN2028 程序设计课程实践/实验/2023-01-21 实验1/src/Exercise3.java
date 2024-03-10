/**
 * 速度单位
 */
enum SpeedUnit {
    MILES_PER_HOUR, METERS_PER_SECOND
}

public class Exercise3 {

    /**
     * 一英里等于多少米（用于换算）
     */
    private static final int ONE_MILE_IN_METERS = 1600;

    /**
     * 跑步时间（秒）
     */
    private static final int RUN_TIME_IN_SECONDS = 45 * 60 + 30;

    /**
     * 跑步距离（米）
     */
    private static final int RUN_DISTANCE_IN_METERS = 14 * ONE_MILE_IN_METERS;

    /**
     * 计算平均速度
     * 
     * @param distanceInMeters
     * @param timeInSeconds
     * @param unit             速度单位
     * @return
     */
    private static double calculateAverageSpeed(
            int distanceInMeters,
            int timeInSeconds,
            SpeedUnit unit) {
        switch (unit) {
            case METERS_PER_SECOND:
                return (double) distanceInMeters / timeInSeconds;
            case MILES_PER_HOUR:
                return (double) distanceInMeters / timeInSeconds * 3600 / ONE_MILE_IN_METERS;
            default:
                throw new IllegalArgumentException("不支持的速度单位");
        }
    }

    public static void main(String[] args) {
        System.out.println(calculateAverageSpeed(
                RUN_DISTANCE_IN_METERS,
                RUN_TIME_IN_SECONDS,
                SpeedUnit.MILES_PER_HOUR));
    }

}
