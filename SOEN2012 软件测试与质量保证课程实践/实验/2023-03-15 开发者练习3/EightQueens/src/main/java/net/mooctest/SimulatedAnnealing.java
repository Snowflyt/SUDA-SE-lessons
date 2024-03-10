package net.mooctest;

/**
 * @file SimulatedAnnealing.java
 * @author nsquires
 * Implements the Simulated Annealing algorithm
 */
import java.util.Random;

public class SimulatedAnnealing {
	private final static int N = 8;
	int nodesGenerated;
	private Queen[] startState;
	private Node start;

	/**
	 * Constructor
	 */
	public SimulatedAnnealing(Queen[] s) {
		nodesGenerated = 0;
		start = new Node();
		startState = new Queen[N];

		for (int i = 0; i < N; i++) {
			startState[i] = new Queen(s[i].getRow(), s[i].getColumn());
		}
		start.setState(startState);
		start.computeHeuristic();
	}

	/**
	 * Initializes a pseudorandom configuration of queens on
	 * a board
	 */
	public void startState() {
		start = new Node();
		startState = new Queen[N];
		Random gen = new Random();

		for (int i = 0; i < N; i++) {
			startState[i] = new Queen(gen.nextInt(N), i);
		}
		start.setState(startState);
		start.computeHeuristic();
	}

	/**
	 * The simulated annealing algorithm
	 * 
	 * @param initialTemp
	 * @param step
	 * @return Node
	 */
	public Node simulatedAnneal(double initialTemp, double step) {
		Node currentNode = start;
		double temperature = initialTemp;
		double val = step;
		double probability;
		int delta;
		double determine;

		Node nextNode = new Node();

		while (currentNode.getHeuristic() != 0 && temperature > 0) {
			// select a random neighbour from currentNode
			nextNode = currentNode.getRandomNeighbour(currentNode);
			nodesGenerated++;

			if (nextNode.getHeuristic() == 0)
				return nextNode;

			delta = currentNode.getHeuristic() - nextNode.getHeuristic();

			if (delta > 0) { // currentNode has a higher heuristic
				currentNode = nextNode;
			} else {
				probability = Math.exp(delta / temperature);
				// Do we want to choose nextNode or stick with currentNode?
				determine = Math.random();

				if (determine <= probability) { // choose nextNode
					currentNode = nextNode;
				}
			}
			temperature = temperature - val;
		}

		return currentNode;
	}

	/**
	 * nodesGenerated getter
	 * 
	 * @return
	 */
	public int getNodesGenerated() {
		return nodesGenerated;
	}

	/**
	 * start getter
	 * 
	 * @return
	 */
	public Node getStartNode() {
		return start;
	}
}
