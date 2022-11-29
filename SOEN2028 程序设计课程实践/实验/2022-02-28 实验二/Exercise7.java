import java.util.Scanner;

public class Exercise7 {

    public static void main(String[] args) {
        // 在平面直角坐标系中有两个矩形，它们的边都与坐标轴平行或垂直。
        // 编写程序，要求用户输入这两个矩形各自的中心点坐标，以及宽度和高度，
        // 判断并输出这两个矩形相互位置关系（包含、交叉或分离）的信息。
        Scanner in = new Scanner(System.in);
        double x1 = in.nextDouble();
        double y1 = in.nextDouble();
        double w1 = in.nextDouble();
        double h1 = in.nextDouble();
        double x2 = in.nextDouble();
        double y2 = in.nextDouble();
        double w2 = in.nextDouble();
        double h2 = in.nextDouble();
        in.close();

        if (x1 + w1 / 2 <= x2 - w2 / 2 || x1 - w1 / 2 >= x2 + w2 / 2 || y1 + h1 / 2 <= y2 - h2 / 2
                || y1 - h1 / 2 >= y2 + h2 / 2) {
            System.out.println("分离");
        } else if (x1 + w1 / 2 >= x2 - w2 / 2 && x1 - w1 / 2 <= x2 + w2 / 2 && y1 + h1 / 2 >= y2 - h2 / 2
                && y1 - h1 / 2 <= y2 + h2 / 2) {
            System.out.println("包含");
        } else {
            System.out.println("交叉");
        }
    }

}
