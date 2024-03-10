package net.mooctest;

/**
 * @file HillClimbing.java
 * @author Natasha Squires <nsquires@upei.ca>
 * Implementation of the hill climbing algorithm
 */
import java.util.ArrayList;
import java.util.Random;

public class HillClimbing {
	private final static int N = 8;
	private Queen[] startState;
	private Node start; // start state
	private int nodesGenerated;

	/**
	 * Constructor
	 */
	public HillClimbing() {
		start = new Node(); // empty start node
		startState = new Queen[N]; // empty start state
		startState();
		nodesGenerated = 0;
	}

	/**
	 * Constructs HillClimbing with a starting board
	 * 
	 * @param s
	 */
	public HillClimbing(Queen[] s) {
		start = new Node();
		startState = new Queen[N];
		for (int i = 0; i < s.length; i++) {
			startState[i] = new Queen(s[i].getRow(), s[i].getColumn());
		}
		start.setState(startState);
		start.computeHeuristic();

		nodesGenerated = 0;
	}

	/**
	 * Sets the starting state
	 */
	public void startState() {
		// sets up a pseudo random start state
		Random gen = new Random();
		for (int i = 0; i < N; i++) {
			startState[i] = new Queen(gen.nextInt(N), i);
		}
		start.setState(startState);
		start.computeHeuristic();
		// System.out.println("start:\n"+start);
	}

	/**
	 * The hill climbing algorithm
	 * 
	 * @return Node
	 */
	public Node hillClimbing() {
		Node currentNode = start;

		while (true) {
			ArrayList<Node> successors = currentNode.generateNeighbours(currentNode);
			nodesGenerated += successors.size();

			Node nextNode = null;

			for (int i = 0; i < successors.size(); i++) {
				if (successors.get(i).compareTo(currentNode) < 0) {
					nextNode = successors.get(i);
				}
			}

			if (nextNode == null)
				return currentNode;

			currentNode = nextNode;
		}
	}

	/**
	 * Returns the Node's state
	 * 
	 * @return Node
	 */
	public Node getStartNode() {
		return start;
	}

	/**
	 * Returns amount of nodes generated
	 * 
	 * @return int
	 */
	public int getNodesGenerated() {
		return nodesGenerated;
	}
}
