import java.util.Random;
import java.util.Scanner;

/**
 * A simple class that contains a pair of objects.
 */
class Pair<T, U> {

    private T first;
    private U second;

    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return first;
    }

    public U getSecond() {
        return second;
    }

}

public class Exercise1 {

    private static final Random rand = new Random();

    /**
     * Generates a random question.
     * 
     * @param maxOperand The maximum operand.
     * @param type       The type of question, e.g. +, -, *, /, +-, +-*.
     * @return A pair of the question and the answer.
     */
    private static Pair<String, Integer> generateQuestion(int maxOperand, String type) {
        // Generate two random numbers.
        char operator = type.charAt(rand.nextInt(type.length()));
        int num1 = rand.nextInt(maxOperand + 1);
        int num2;
        switch (operator) {
            case '-':
                // Make sure num1 is always greater than num2.
                num2 = rand.nextInt(maxOperand + 1);
                if (num1 < num2) {
                    int temp = num1;
                    num1 = num2;
                    num2 = temp;
                }
                break;
            case '/':
                // Make sure num1 is always divisible by num2.
                do {
                    num2 = rand.nextInt(maxOperand / (num1 == 0 ? 1 : num1) + 1);
                } while (num2 == 0);
                num1 = num1 * num2;
                break;
            default:
                num2 = rand.nextInt(maxOperand + 1);
        }

        // Get answer.
        int answer;
        switch (operator) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                answer = num1 / num2;
                break;
            default:
                throw new IllegalArgumentException("Invalid operator: " + operator);
        }

        return new Pair<>(num1 + " " + operator + " " + num2 + " = ", answer);
    }

    public static void main(String[] args) {
        // Get user input.
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the number of questions: ");
        int numQuestions = sc.nextInt();
        System.out.print("Enter the maximum operand: ");
        int maxOperand = sc.nextInt();
        System.out.print("Choose the type of questions (eg. +, -, *, /, +-, +-*/): ");
        String type = sc.next();

        // Generate questions and check answers.
        int correct = 0;
        for (int i = 0; i < numQuestions; i++) {
            // Generate question and answer.
            Pair<String, Integer> questionAndAnswer = generateQuestion(maxOperand, type);
            String question = questionAndAnswer.getFirst();
            int answer = questionAndAnswer.getSecond();

            System.out.print(question);
            // Get user answer and check.
            int userAnswer = sc.nextInt();
            if (userAnswer == answer) {
                correct++;
            }
        }
        sc.close();

        // Print result.
        System.out.println("You got " + correct + " out of " + numQuestions + " correct.");
    }

}
