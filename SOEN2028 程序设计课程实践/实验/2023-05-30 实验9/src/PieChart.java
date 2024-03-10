import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JComponent;
import javax.swing.JFrame;

public class PieChart extends JFrame {
    public PieChart() {
        initUI();
    }

    private void initUI() {
        Chart.Portion[] portions = new Chart.Portion[] {
                new Chart.Portion(0.2, Color.RED),
                new Chart.Portion(0.1, Color.GREEN),
                new Chart.Portion(0.3, Color.BLUE),
                new Chart.Portion(0.4, Color.ORANGE),
        };
        Chart chart = new Chart(portions, 0);
        chart.setBounds(50, 50, 300, 300);
        add(chart);

        setTitle("圆饼图");
        setSize(400 + 18, 400 + 47);
        setLayout(null);
    }

    private static class Chart extends JComponent {
        public static class Portion {
            private final double value;
            private final Color color;

            public Portion(double value, Color color) {
                this.value = value;
                this.color = color;
            }

            public double getValue() {
                return value;
            }

            public Color getColor() {
                return color;
            }
        }

        private final Portion[] portions;
        private final double startAngle;

        public Chart(Portion[] portions, double startAngle) {
            this.portions = portions;
            this.startAngle = startAngle;
        }

        @Override
        public void paintComponent(Graphics g) {
            super.paintComponent(g);

            int width = this.getWidth();
            int height = this.getHeight();

            double total = 0;
            for (Portion portion : portions) {
                total += portion.getValue();
            }

            double startAngle = this.startAngle;
            for (Portion portion : portions) {
                double arcAngle = portion.getValue() / total * 360;
                g.setColor(portion.getColor());
                g.fillArc(0, 0, width, height, (int) startAngle, (int) arcAngle);
                startAngle += arcAngle;
            }
        }
    }

    public static void main(String[] args) {
        PieChart pieChart = new PieChart();
        pieChart.setVisible(true);
    }
}
