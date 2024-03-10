import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;

public class Chess extends JFrame {
    public Chess() {
        initUI();
    }

    private void initUI() {
        JButton buttonNorth = new JButton("北方参战者");
        buttonNorth.setBounds(0, 0, 500, 30);
        add(buttonNorth);
        JButton buttonSouth = new JButton("南方参战者");
        buttonSouth.setBounds(0, 330, 500, 30);
        add(buttonSouth);

        JButton buttonWest = new JButton("西方观察团");
        buttonWest.setBounds(0, 30, 100, 300);
        add(buttonWest);
        JButton buttonEast = new JButton("东方观察团");
        buttonEast.setBounds(400, 30, 100, 300);
        add(buttonEast);

        ChessBoard chessBoard = new ChessBoard();
        chessBoard.setBounds(100, 30, 300, 300);
        add(chessBoard);

        setSize(500 + 18, 360 + 47);
        setLayout(null);
    }

    private static class ChessBoard extends JComponent {
        @Override
        public void paintComponent(Graphics g) {
            super.paintComponent(g);
            g.setColor(Color.BLACK);

            int rows = 12;
            int cols = 12;

            int rowHeight = this.getHeight() / rows;
            int colWidth = this.getWidth() / cols;

            for (int i = 0; i < rows; i++) {
                int y = i * rowHeight;
                for (int j = 0; j < cols; j++) {
                    int x = j * colWidth;
                    if ((i + j) % 2 == 0) {
                        g.setColor(Color.WHITE);
                    } else {
                        g.setColor(Color.BLACK);
                    }
                    g.fillRect(x, y, colWidth, rowHeight);
                }
            }
        }
    }

    public static void main(String[] args) {
        Chess chess = new Chess();
        chess.setVisible(true);
    }
}
