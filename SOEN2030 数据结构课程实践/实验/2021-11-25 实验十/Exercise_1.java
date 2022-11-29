import java.util.Scanner;

public class Exercise_1 {
    public static void main(String[] args) throws Exception {
        // read data
        Scanner in = new Scanner(System.in);
        String s = in.nextLine();
        in.close();
        // initialize
        Queue<Character> queue = new Queue<Character>();
        Stack<Character> stack = new Stack<Character>();
        // add elements of string to queue / stack
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetter(c)) {
                queue.enqueue(Character.toLowerCase(c));
                stack.push(Character.toLowerCase(c));
            }
        }
        // take out elements of queue/stack one by one, and compare their differences
        boolean result = true;
        while (stack.peek() != null) {
            if (queue.dequeue() != stack.pop()) {
                result = false;
                break;
            }
        }
        // print result
        System.out.println(result);
    }
}
