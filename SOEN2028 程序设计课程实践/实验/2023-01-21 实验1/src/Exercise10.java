import java.util.Scanner;

public class Exercise10 {

    /**
     * 计算风寒温度
     * 
     * @param temperatureOutdoor 室外温度(℉)
     * @param windSpeed          风速(英里/小时)
     * @return
     */
    private static double calculateWindChillTemperature(
            double temperatureOutdoor,
            double windSpeed) {
        double vZeroDot16 = Math.pow(windSpeed, 0.16);
        return 35.74 + 0.6215 * temperatureOutdoor
                - 35.75 * vZeroDot16
                + 0.4275 * temperatureOutdoor * vZeroDot16;
    }

    public static void main(String[] args) {
        // 输入室外温度及风速
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入室外温度(℉): ");
        double temperatureOutdoor = sc.nextDouble();
        System.out.print("请输入风速(英里/小时): ");
        double windSpeed = sc.nextDouble();
        sc.close();

        // 输出风寒温度
        double temperatureWindChill = calculateWindChillTemperature(temperatureOutdoor, windSpeed);
        System.out.println("室外温度" + temperatureOutdoor + "℉、风速"
                + windSpeed + "英里/小时下的风寒温度为" + temperatureWindChill + "℉");
    }

}
