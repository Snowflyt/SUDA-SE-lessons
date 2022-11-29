import java.util.Scanner;

public class Exercise2 {

    private static double calculateInfixExpression(String expression) {
        // 用括号标注优先级
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            // 如果是*或/，且未加括号，加上括号以提高优先级
            if ((c == '*' || c == '/') && (i >= 2 && i <= expression.length() - 2)
                    && !(expression.charAt(i - 2) == '(' && expression.charAt(i + 2) == ')')) {
                String operator = expression.substring(i, i + 1); // 存储运算符
                String s1, s2, s3, s4; // 分别存储左括号前的内容、左括号至运算符的内容，运算符至右括号的内容以及剩余部分
                if (expression.charAt(i - 1) == ')') {
                    // 若运算符前是右括号，找到与之配对的左括号
                    int count = 1;
                    int j;
                    for (j = i - 2; j >= 0; j--) {
                        // 查找配对的左括号的位置，j的末值即为其下标
                        if (expression.charAt(j) == ')') {
                            count++;
                        } else if (expression.charAt(j) == '(') {
                            count--;
                        }
                        if (count == 0) {
                            break;
                        }
                    }
                    s1 = expression.substring(0, j);
                    s2 = expression.substring(j, i);
                } else {
                    s1 = expression.substring(0, i - 1);
                    s2 = expression.substring(i - 1, i);
                }
                if (expression.charAt(i + 1) == '(') {
                    // 若运算符后是左括号，找到与之配对的右括号
                    int count = 1;
                    int j;
                    for (j = i + 2; j < expression.length(); j++) {
                        // 查找配对的右括号的位置，j的末值即为其下标
                        if (expression.charAt(j) == '(') {
                            count++;
                        } else if (expression.charAt(j) == ')') {
                            count--;
                        }
                        if (count == 0) {
                            break;
                        }
                    }
                    s3 = expression.substring(i + 1, j + 1);
                    s4 = expression.substring(j + 1, expression.length());
                } else {
                    s3 = expression.substring(i + 1, i + 2);
                    s4 = expression.substring(i + 2, expression.length());
                }
                expression = s1 + "(" + s2 + operator + s3 + ")" + s4; // 加上括号
                i++; // 由于加上了括号，运算符位置右移，因此i+1，以防止重复加括号
            }
        }
        expression = "(" + expression + ")";
        // System.out.println(expression); // 打印加完括号的表达式

        // 计算加完括号的中缀表达式
        Stack<Character> operatorStack = new Stack<>();
        Stack<Double> operandStack = new Stack<>();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (c == '+' || c == '-' || c == '*' || c == '/' || c == '(') {
                operatorStack.push(c);
            } else if (c != '(' && c != ')') {
                operandStack.push(Double.parseDouble(Character.toString(c)));
            }
            if (c == ')' || i == expression.length() - 1) {
                while (operatorStack.peek() != null) {
                    double d2 = operandStack.pop();
                    double d1 = operandStack.pop();
                    double d3 = 0;
                    char operator = operatorStack.pop();
                    if (operator == '+') {
                        d3 = d1 + d2;
                    } else if (operator == '-') {
                        d3 = d1 - d2;
                    } else if (operator == '*') {
                        d3 = d1 * d2;
                    } else if (operator == '/') {
                        d3 = d1 / d2;
                    }
                    operandStack.push(d3);
                    if (operatorStack.peek() != null && operatorStack.peek() == '(') {
                        operatorStack.pop();
                        break;
                    }
                }
            }
        }
        return operandStack.pop();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String expression = sc.nextLine();
        sc.close();
        double result = calculateInfixExpression(expression);
        // double result = calculateInfixExpression("2*3+(7/(6+1)+(4+8)*9)*6+5");
        System.out.println(result);
    }

}
