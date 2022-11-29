import java.util.Scanner;

public class Exercise2 {

    public static void main(String[] args) {
        // 使用Scanner类的实例解析字符串："语文90分，数学87分，物理76分，
        // 化学98分，英语96分，政治75分"中的考试成绩，并计算出总成绩以及平均分数。
        Scanner in = new Scanner("语文90分，数学87分，物理76分，化学98分，英语96分，政治75分");
        int total = 0;
        int count = 0;
        double average = 0;
        in.useDelimiter("[^0123456789.]+");
        while (in.hasNext()) {
            total += in.nextInt();
            count++;
        }
        in.close();

        average = (double) total / count;
        System.out.println("总成绩：" + total);
        System.out.println("平均分数：" + average);
    }

}
