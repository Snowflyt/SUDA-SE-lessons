import java.util.Scanner;

public class Exercise1 {
    public static void main(String[] args) {
        // Input
        Scanner sc = new Scanner(System.in);
        System.out.print("Input answers of all questions (split by space): ");
        String[] answers = sc.nextLine().split(" ");
        System.out.print("Input the number of students: ");
        int numStudents = sc.nextInt();
        String[][] studentAnswers = new String[numStudents][answers.length];
        for (int i = 0; i < numStudents; i++) {
            System.out.print("Input answers of student " + (i + 1) + " (split by space): ");
            String line = sc.nextLine();
            while (line.isEmpty()) {
                line = sc.nextLine();
            }
            studentAnswers[i] = line.split(" ");
        }
        sc.close();

        // Process
        for (int i = 0; i < numStudents; i++) {
            String[] wrongAnswers = new String[answers.length];
            // If right, then null, else the wrong answer
            int wrongCount = 0;
            for (int j = 0; j < answers.length; j++) {
                if (!answers[j].equals(studentAnswers[i][j])) {
                    wrongAnswers[j] = studentAnswers[i][j];
                    wrongCount++;
                }
            }
            // Print report
            System.out.println("\nStudent " + (i + 1) + "'s report:");
            System.out.println((answers.length - wrongCount) + " of " + answers.length + " answers are correct.");
            if (wrongCount == 0) {
                System.out.println("No wrong answers.");
                continue;
            }
            System.out.println("Wrong answers:");
            for (int j = 0; j < wrongAnswers.length; j++) {
                if (wrongAnswers[j] != null) {
                    System.out.println("Question " + (j + 1) + ": " +
                            "Correct answer is " + answers[j] + ", " +
                            "but answered " + wrongAnswers[j]);
                }
            }
        }
    }
}
