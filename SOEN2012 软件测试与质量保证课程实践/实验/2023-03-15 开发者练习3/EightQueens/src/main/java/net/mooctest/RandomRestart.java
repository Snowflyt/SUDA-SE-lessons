package net.mooctest;

/**
 * @file RandomRestart.java
 * @author Natasha Squires <nsquires@upei.ca>
 *         Implements the random restart hill climbing algorithm
 */
public class RandomRestart {
	private HillClimbing hillClimber;
	private int nodesGenerated;
	private Node start;

	/**
	 * Constructor
	 */
	public RandomRestart(Queen[] startBoard) {
		hillClimber = new HillClimbing(startBoard);
		nodesGenerated = 0;
	}

	/**
	 * The random restart hill climbing algorithm
	 * 
	 * @return
	 */
	public Node randomRestart() {
		Node currentNode = hillClimber.getStartNode();
		setStartNode(currentNode);
		int heuristic = currentNode.getHeuristic();

		while (heuristic != 0) {
			Node nextNode = hillClimber.hillClimbing();
			nodesGenerated += hillClimber.getNodesGenerated();
			heuristic = nextNode.getHeuristic();

			if (heuristic != 0) { // restart
				hillClimber = new HillClimbing();
			} else
				currentNode = nextNode;
		}
		return currentNode;
	}

	/**
	 * Sets the initial board
	 * 
	 * @param n
	 */
	public void setStartNode(Node n) {
		start = n;
	}

	/**
	 * Start set getter
	 * 
	 * @return Node
	 */
	public Node getStartNode() {
		return start;
	}

	/**
	 * Returns the amount of nodes generated during the
	 * random restart algorithm
	 * 
	 * @return int
	 */
	public int getNodesGenerated() {
		return nodesGenerated;
	}
}
