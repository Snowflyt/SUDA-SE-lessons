import java.awt.event.ActionEvent;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.swing.AbstractAction;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JTextField;

/**
 * Utility class for calculator.
 */
class CalculatorUtil {
    /* Operators */
    private static final String ADD = "+";
    private static final String SUB = "-";
    private static final String MUL = "*";
    private static final String DIV = "/";
    public static final String[] OPERATORS = { ADD, SUB, MUL, DIV };

    private CalculatorUtil() {
    }

    /**
     * Calculate the result from the formula string.
     * Operators and operands should be separated by space.
     * Parentheses are not supported.
     * 
     * @param formula The formula string.
     * @return The result.
     */
    public static String calculate(String formula) {
        List<String> tokens = new ArrayList<>(Arrays.asList(formula.split(" ")));

        // Calculate all the multiplication and division first
        int idx = 0;
        while (idx < tokens.size()) {
            String t = tokens.get(idx);
            if (MUL.equals(t)) {
                String result = mul(tokens.get(idx - 1), tokens.get(idx + 1));
                tokens.set(idx - 1, result);
                tokens.remove(idx);
                tokens.remove(idx);
                continue;
            }
            if (DIV.equals(t)) {
                String result = div(tokens.get(idx - 1), tokens.get(idx + 1));
                tokens.set(idx - 1, result);
                tokens.remove(idx);
                tokens.remove(idx);
                continue;
            }
            idx++;
        }

        // Calculate the rest
        String result = tokens.get(0);
        for (int i = 1; i < tokens.size(); i += 2) {
            String operator = tokens.get(i);
            String operand = tokens.get(i + 1);
            switch (operator) {
                case ADD:
                    result = add(result, operand);
                    break;
                case SUB:
                    result = sub(result, operand);
                    break;
                default:
                    break;
            }
        }

        return result;
    }

    private static String format(Double result) {
        if (result % 1 == 0) {
            return String.valueOf(result.intValue());
        }
        return String.valueOf(result);
    }

    private static String add(String a, String b) {
        return format(Double.parseDouble(a) + Double.parseDouble(b));
    }

    private static String sub(String a, String b) {
        return format(Double.parseDouble(a) - Double.parseDouble(b));
    }

    private static String mul(String a, String b) {
        return format(Double.parseDouble(a) * Double.parseDouble(b));
    }

    private static String div(String a, String b) {
        return format(Double.parseDouble(a) / Double.parseDouble(b));
    }
}

public class Calculator extends JFrame {
    /**
     * The text field to display the formula and result.
     */
    private JTextField textField;

    public Calculator() {
        initUI();
    }

    /**
     * Initialize the UI.
     */
    private void initUI() {
        textField = new JTextField();
        textField.setBounds(10, 10, 200, 30);
        add(textField);

        List<List<String>> buttonTexts = Arrays.asList(
                Arrays.asList("7", "8", "9", "+"),
                Arrays.asList("4", "5", "6", "-"),
                Arrays.asList("1", "2", "3", "*"),
                Arrays.asList("0", ".", "=", "/"));
        for (int i = 0; i < buttonTexts.size(); i++) {
            List<String> row = buttonTexts.get(i);
            for (int j = 0; j < row.size(); j++) {
                String text = row.get(j);
                int x = 10 + j * 50;
                int y = 40 + i * 40;
                JButton button = new JButton(text);
                button.addActionListener(new ClickEvent());
                button.setBounds(x, y, 50, 40);
                add(button);
            }
        }

        setTitle("欢迎");
        setSize(220 + 18, 210 + 47);
        setLayout(null);
    }

    /**
     * The click event.
     */
    private class ClickEvent extends AbstractAction {
        @Override
        public void actionPerformed(ActionEvent e) {
            JButton button = (JButton) e.getSource();
            String text = button.getText();
            String oldText = textField.getText();

            // If click "=", calculate the result
            if ("=".equals(text)) {
                String result = CalculatorUtil.calculate(oldText);
                textField.setText(result);
                return;
            }

            // If click any operator, add a space before and after the operator
            if (Arrays.asList(CalculatorUtil.OPERATORS).contains(text)) {
                // Judge whether "-" meaning negative or minus
                if ("-".equals(text) && (oldText.length() == 0 || oldText.charAt(oldText.length() - 1) == ' ')) {
                    textField.setText(oldText + text);
                    return;
                }
                textField.setText(oldText + " " + text + " ");
                return;
            }

            // Otherwise, just append the text (number)
            textField.setText(oldText + text);
        }
    }

    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        calculator.setVisible(true);
    }
}
