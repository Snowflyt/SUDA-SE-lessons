public class Exercise7 {

    /**
     * 年利率
     */
    private static final double APR = 0.05;

    /**
     * 每月存款（元）
     */
    private static final int MONTHLY_DEPOSIT = 100;

    /**
     * 共计多少月
     */
    private static final int TOTAL_MONTHS = 6;

    /**
     * 计算n月后的钱数
     * 
     * @param currentMoney   当前钱数
     * @param monthlyDeposit 每月存款
     * @param apr            年利率
     * @param months         月数
     * @return
     */
    private static double moneyInMonths(
            double currentMoney,
            double monthlyDeposit,
            double apr,
            int months) {
        double result = currentMoney;
        for (int month = 1; month <= months; month++) {
            result += monthlyDeposit;
            result *= 1 + apr / 12;
        }
        return result;
    }

    public static void main(String[] args) {
        double money = moneyInMonths(0, MONTHLY_DEPOSIT, APR, TOTAL_MONTHS);
        System.out.println(TOTAL_MONTHS + "个月后帐户上有" + money + "元");
    }

}
