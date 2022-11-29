import java.util.Scanner;

public class Exercise5 {

    public static void main(String[] args) {
        // 编写程序，要求用户输入1至9间的行数（例如7），输出如下形状的图案。
        //                     1
        //                  2  1  2
        //               3  2  1  2  3
        //            4  3  2  1  2  3  4
        //         5  4  3  2  1  2  3  4  5
        //      6  5  4  3  2  1  2  3  4  5  6
        //   7  6  5  4  3  2  1  2  3  4  5  6  7
        Scanner in = new Scanner(System.in);
        int num = in.nextInt();
        in.close();

        for (int i = 0; i < num; i++) {
            for (int j = 0; j < num - i - 1; j++) {
                System.out.print("   ");
            }
            for (int j = 0; j < i; j++) {
                System.out.print(i - j + 1 + "  ");
            }
            System.out.print("1  ");
            for (int j = 0; j < i; j++) {
                System.out.print(j + 2 + "  ");
            }
            System.out.println();
        }
    }

}
