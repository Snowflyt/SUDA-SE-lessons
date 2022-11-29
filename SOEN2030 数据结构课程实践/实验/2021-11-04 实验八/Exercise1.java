import java.util.Scanner;

public class Exercise1 {

    private static double calculateSuffixExpression(String expression) {
        Stack<String> stack = new Stack<>();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '+' || c == '-' || c == '*' || c == '/') {
                double d2 = Double.parseDouble(stack.pop());
                double d1 = Double.parseDouble(stack.pop());
                double d3 = 0;
                if (c == '+') {
                    d3 = d1 + d2;
                } else if (c == '-') {
                    d3 = d1 - d2;
                } else if (c == '*') {
                    d3 = d1 * d2;
                } else if (c == '/') {
                    d3 = d1 / d2;
                }
                stack.push(Double.toString(d3));
            } else {
                stack.push(Character.toString(c));
            }
        }
        return Double.parseDouble(stack.pop());
    }

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        String expression = sc.nextLine();
        sc.close();
        double result = calculateSuffixExpression(expression);
        // double result = calculateSuffixExpression("0123/-4*+");
        System.out.println(result);
    }

}
