import java.util.Scanner;

public class ListTest {

    public static void main(String[] args) {
        System.out.println(":exit                       退出程序");
        System.out.println("-c/-clear                   清空列表");
        System.out.println("-d/-disp/-display           打印列表");
        System.out.println("-g/-get i                   打印下标为i的元素");
        System.out.println("-a/-append x                增加元素x");
        System.out.println("-i/-insert i x              在下标i处插入元素x");
        System.out.println("-si/-strictInsert i x       在下标i处插入元素x，若下标为负或大于等于列表长度，则抛出异常");
        System.out.println("-r/-remove x                删除列表中第一个为x的元素");
        System.out.println("-sr/-strictRemove x         删除列表中第一个为x的元素，若不存在，则抛出异常");
        System.out.println("-ri/-removeIndex i          删除下标为i的元素");
        System.out.println("-sri/-strictRemoveIndex i   删除下标为i的元素，若不存在，则抛出异常");
        System.out.println("-io/-indexOf x              返回列表中首次出现指定元素的下标，若不存在，则返回-1");
        System.out.println("-sio/-strictIndexOf x       返回列表中首次出现指定元素的下标，若不存在，则抛出异常");
        System.out.println();

        List lst = new List();
        String in;
        Scanner sc = new Scanner(System.in);
        in = sc.nextLine();
        while (!in.equals(":exit")) {
            int len = in.split(" ").length;
            String operator = in.split(" ")[0];
            if (len == 1 && (operator.equals("-c") || operator.equals("-clear"))) {
                lst.clear();
            } else if (len == 1 && (operator.equals("-d") || operator.equals("-disp") || operator.equals("-display"))) {
                lst.display();
            } else if (len == 2 && (operator.equals("-g") || operator.equals("-get"))) {
                int index = Integer.parseInt(in.split(" ")[1]);
                try {
                    System.out.println(lst.get(index));
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            } else if (len == 2 && (operator.equals("-a") || operator.equals("-append"))) {
                String x = in.split(" ")[1];
                lst.append(x);
                lst.display();
            } else if (len == 3 && (operator.equals("-i") || operator.equals("-insert"))) {
                int index = Integer.parseInt(in.split(" ")[1]);
                String x = in.split(" ")[2];
                lst.insert(index, x);
                lst.display();
            } else if (len == 3 && (operator.equals("-si") || operator.equals("-strictInsert"))) {
                int index = Integer.parseInt(in.split(" ")[1]);
                String x = in.split(" ")[2];
                try {
                    lst.strictInsert(index, x);
                    lst.display();
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            } else if (len == 2 && (operator.equals("-r") || operator.equals("-remove"))) {
                String x = in.split(" ")[1];
                lst.remove(x);
                lst.display();
            } else if (len == 2 && (operator.equals("-sr") || operator.equals("-strictRemove"))) {
                String x = in.split(" ")[1];
                try {
                    lst.strictRemove(x);
                    lst.display();
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            } else if (len == 2 && (operator.equals("-ri") || operator.equals("-removeIndex"))) {
                int index = Integer.parseInt(in.split(" ")[1]);
                lst.removeIndex(index);
                lst.display();
            } else if (len == 2 && (operator.equals("-sri") || operator.equals("-strictRemoveIndex"))) {
                int index = Integer.parseInt(in.split(" ")[1]);
                try {
                    lst.strictRemoveIndex(index);
                    lst.display();
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            } else if (len == 2 && (operator.equals("-io") || operator.equals("-indexOf"))) {
                String x = in.split(" ")[1];
                System.out.println(lst.indexOf(x));
            } else if (len == 2 && (operator.equals("-sio") || operator.equals("-strictIndexOf"))) {
                String x = in.split(" ")[1];
            try {
                    System.out.println(lst.strictIndexOf(x));
                } catch (Exception e) {
                    System.out.println("Error: " + e.getMessage());
                }
            }
            in = sc.nextLine();
        }
        sc.close();
    }

}
