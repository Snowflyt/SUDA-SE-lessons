package net.mooctest;

/**
 * @file Node.java
 * @author Natasha Squires <nsquires@upei.ca>
 * Represents a Queen
 */
import java.util.ArrayList;
import java.util.Random;

public class Node implements Comparable<Node> {
	private static final int N = 8; // 8 queens
	public Queen[] state; // the node's state
	private ArrayList<Node> neighbours;
	private int hn; // heuristic score

	/**
	 * Constructor
	 */
	public Node() {
		state = new Queen[N]; // empty state
		neighbours = new ArrayList<Node>(); // empty neighbour list
	}

	/**
	 * Constructor which creates a copy of a node's state
	 * 
	 * @param n
	 */
	public Node(Node n) {
		state = new Queen[N];
		neighbours = new ArrayList<Node>();
		for (int i = 0; i < N; i++)
			state[i] = new Queen(n.state[i].getRow(), n.state[i].getColumn());
		hn = 0;
	}

	/**
	 * Generates the possible chess board configurations given a
	 * specific board state
	 * 
	 * @param startState
	 */
	public ArrayList<Node> generateNeighbours(Node startState) {
		int count = 0;

		if (startState == null)
			System.out.println("warning");
		else {
			// System.out.println("hmm?");
			// System.out.println(startState);
		}

		for (int i = 0; i < N; i++) {
			for (int j = 1; j < N; j++) {
				neighbours.add(count, new Node(startState));
				neighbours.get(count).state[i].moveDown(j);
				// make sure to compute its hn value
				neighbours.get(count).computeHeuristic();

				count++;
			}
		}

		return neighbours;
	}

	/**
	 * Returns a randomly generated neighbour of a given state
	 * 
	 * @param startState
	 * @return
	 */
	public Node getRandomNeighbour(Node startState) {
		Random gen = new Random();

		int col = gen.nextInt(N);
		int d = gen.nextInt(N - 1) + 1;

		Node neighbour = new Node(startState);
		neighbour.state[col].moveDown(d);
		neighbour.computeHeuristic();

		return neighbour;
	}

	/**
	 * computes the heuristic, which is the number of
	 * pieces that can attack each other
	 * 
	 * @return int
	 */
	public int computeHeuristic() {

		for (int i = 0; i < N - 1; i++) {
			for (int j = i + 1; j < N; j++) {
				if (state[i].canAttack(state[j])) {
					hn++;
				}
			}
		}

		return hn;
	}

	/**
	 * Hn getter
	 * 
	 * @return
	 */
	public int getHeuristic() {
		return hn;
	}

	/**
	 * Implements Comparable method compareTo, judges a comparison
	 * on the basis of a Node's heuristic value
	 * 
	 * @param n
	 * @return int
	 */
	public int compareTo(Node n) {
		if (this.hn < n.getHeuristic())
			return -1;
		else if (this.hn > n.getHeuristic())
			return 1;
		else
			return 0;
	}

	/**
	 * state setter
	 * 
	 * @param s
	 */
	public void setState(Queen[] s) {
		for (int i = 0; i < N; i++) {
			state[i] = new Queen(s[i].getRow(), s[i].getColumn());
		}
	}

	/**
	 * state getter
	 * 
	 * @return
	 */
	public Queen[] getState() {
		return state;
	}

	/**
	 * toString method prints out Node's state
	 * 
	 * @return String
	 */
	public String toString() {
		String result = "";
		String[][] board = new String[N][N];

		// initialise board with X's to indicate empty spaces
		for (int i = 0; i < N; i++)
			for (int j = 0; j < N; j++)
				board[i][j] = "X ";

		// place the queens on the board
		for (int i = 0; i < N; i++) {
			board[state[i].getRow()][state[i].getColumn()] = "Q ";
		}

		// feed values into the result string
		for (int i = 0; i < N; i++) {
			for (int j = 0; j < N; j++) {
				result += board[i][j];
			}
			result += "\n";
		}

		return result;
	}
}
