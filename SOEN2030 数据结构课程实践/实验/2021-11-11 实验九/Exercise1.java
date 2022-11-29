import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// Example:
//   Input:
//     Please enter the num of rules:
//     2
//     Please enter rules by line (For example, "B tAdA"):
//     B tAdA
//     A sye
//     Please enter the expression:
//     B(ehnxgz)B
//   Output:
//     tsyedsyeezegexenehetsyedsye

// 需要注意的是，括号不支持嵌套，例如(eh(nxg)z)是不支持的。
// 如果一定需要实现括号嵌套，请使用像下面这样的操作：
// C (nxg)
// (ehCz)
// 这种操作是支持的

class Exercise1 {

    private static Queue<Character> translate(char character, Map<Character, String> rules) {
        Queue<Character> result = new Queue<>();
        String value = rules.get(character);
        for (int i = 0; i < value.length(); i++) {
            char c = value.charAt(i);
            if (c >= 65 && c <= 90) {
                Queue<Character> queue = translate(c, rules);
                while (queue.getHead() != null) {
                    result.enqueue(queue.dequeue());
                }
            } else if (c >= 97 && c <= 122) {
                result.enqueue(c);
            } else if (c == '(') {
                int j = i + 1;
                while (value.charAt(j) != ')') {
                    j++;
                }
                Stack<Character> stack = translateBracketContents(value.substring(i + 1, j));
                while (stack.peek() != null) {
                    c = (char) stack.pop();
                    if (c >= 65 && c <= 90) {
                        Queue<Character> queue = translate(c, rules);
                        while (queue.getHead() != null) {
                            result.enqueue(queue.dequeue());
                        }
                    } else if (c >= 97 && c <= 122) {
                        result.enqueue(c);
                    }
                }
                i = j;
            }
        }
        return result;
    }

    private static Stack<Character> translateBracketContents(String expr) {
        Stack<Character> result = new Stack<>();
        for (int i = 1; i < expr.length(); i++) {
            char c = expr.charAt(i);
            result.push(expr.charAt(0));
            result.push(c);
        }
        return result;
    }

    public static void main(String[] args) {
        // input
        Scanner in = new Scanner(System.in);
        System.out.println("Please enter the num of rules:");
        int n = Integer.parseInt(in.nextLine());
        System.out.println("Please enter rules by line (For example, \"B tAdA\"):");
        HashMap<Character, String> rules = new HashMap<Character, String>();
        for (int i = 0; i < n; i++) {
            String line = in.nextLine();
            char key = line.split(" ")[0].charAt(0);
            String value = line.split(" ")[1];
            rules.put(key, value);
        }
        System.out.println("Please enter the expression:");
        String expr = in.nextLine();
        in.close();
        // process
        Queue<Character> result = new Queue<Character>();
        for (int i = 0; i < expr.length(); i++) {
            char c = expr.charAt(i);
            if (c >= 97 && c <= 122) {
                result.enqueue(c);
            } else if (c >= 65 && c <= 90) {
                Queue<Character> queue = translate(c, rules);
                while (queue.getHead() != null) {
                    result.enqueue(queue.dequeue());
                }
            } else if (c == '(') {
                int j = i + 1;
                while (expr.charAt(j) != ')') {
                    j++;
                }
                Stack<Character> stack = translateBracketContents(expr.substring(i + 1, j + 1));
                while (stack.peek() != null) {
                    c = (char) stack.pop();
                    if (c >= 65 && c <= 90) {
                        Queue<Character> queue = translate(c, rules);
                        while (queue.getHead() != null) {
                            result.enqueue(queue.dequeue());
                        }
                    } else if (c >= 97 && c <= 122) {
                        result.enqueue(c);
                    }
                }
                i = j;
            }
        }
        // print
        while (result.getHead() != null) {
            System.out.print(result.dequeue());
        }
    }

}
