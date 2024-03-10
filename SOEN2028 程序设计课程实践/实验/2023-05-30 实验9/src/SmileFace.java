import java.awt.Graphics;

import javax.swing.JComponent;
import javax.swing.JFrame;

public class SmileFace extends JFrame {
    public SmileFace() {
        initUI();
    }

    private void initUI() {
        Face face = new Face();
        face.setBounds(50, 50, 300, 300);
        add(face);

        setSize(400 + 18, 400 + 47);
        setLayout(null);
    }

    private static class Face extends JComponent {
        @Override
        public void paintComponent(Graphics g) {
            super.paintComponent(g);

            int width = this.getWidth();
            int height = this.getHeight();

            // Face
            g.drawOval(0, 0, width, height);
            // Eye whites
            g.drawOval(width / 4 - 5, height / 4, width / 4, height / 4 / 2);
            g.drawOval(width / 2 + 5, height / 4, width / 4, height / 4 / 2);
            // Eyes
            g.fillOval(width / 4 - 5 + width / 4 / 2, height / 4 + height / 4 / 4, width / 4 / 4, height / 4 / 4);
            g.fillOval(width / 2 + 5 + width / 4 / 2, height / 4 + height / 4 / 4, width / 4 / 4, height / 4 / 4);
            // Nose (Triangle)
            g.drawLine(width / 2, height / 3, width / 2 - width / 8, height / 2 + height / 8);
            g.drawLine(width / 2, height / 3, width / 2 + width / 8, height / 2 + height / 8);
            g.drawLine(width / 2 - width / 8, height / 2 + height / 8, width / 2 + width / 8, height / 2 + height / 8);
            // Mouth (Arc)
            g.drawArc(width / 4, height / 2, width / 2, height / 4, 180, 180);
        }
    }

    public static void main(String[] args) {
        SmileFace smileFace = new SmileFace();
        smileFace.setVisible(true);
    }
}
