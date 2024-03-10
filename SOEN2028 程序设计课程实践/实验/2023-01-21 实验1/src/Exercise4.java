import java.util.Scanner;

public class Exercise4 {

    /**
     * 每x秒有一个人诞生
     */
    private static final int BIRTH_IN_SECONDS = 7;

    /**
     * 每x秒有一个人死亡
     */
    private static final int DEATH_IN_SECONDS = 13;

    /**
     * 每x秒有一个移民迁入
     */
    private static final int MIGRATION_IN_SECONDS = 45;

    /**
     * 当前人口
     */
    private static final int CURRENT_POPULATION = 312032486;

    /**
     * 一年的秒数
     */
    private static final int ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;

    /**
     * 计算未来n年的人口数
     * 
     * @param currentPopulation
     * @param years
     * @return
     */
    private static int calculatePopulation(int currentPopulation, int years) {
        int seconds = years * ONE_YEAR_IN_SECONDS;
        int births = seconds / BIRTH_IN_SECONDS;
        int deaths = seconds / DEATH_IN_SECONDS;
        int migrations = seconds / MIGRATION_IN_SECONDS;
        return currentPopulation + births - deaths + migrations;
    }

    /**
     * 打印未来n年每年的人口数
     * 
     * @param currentPopulation
     * @param years
     */
    private static void printPopulation(int currentPopulation, int years) {
        System.out.println("假设当前人口数为" + currentPopulation);
        for (int year = 1; year <= years; year++) {
            System.out.print("未来第" + year + "年的人口数为: ");
            System.out.println(calculatePopulation(currentPopulation, year));
        }
    }

    public static void main(String[] args) {
        // 打印未来五年每年的人口数
        printPopulation(CURRENT_POPULATION, 5);

        // 用户输入未来年数和当前人口数
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入未来年数: ");
        int years = sc.nextInt();
        System.out.print("请输入当前人口数: ");
        int currentPopulation = sc.nextInt();
        sc.close();

        // 打印未来n年每年的人口数
        printPopulation(currentPopulation, years);
    }

}
