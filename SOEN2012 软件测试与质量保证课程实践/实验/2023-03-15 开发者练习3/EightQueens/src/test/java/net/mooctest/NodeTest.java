package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.lang.reflect.Field;
import java.util.ArrayList;

import org.junit.Test;

public class NodeTest {
    @SuppressWarnings("unchecked")
    private static ArrayList<Node> getNodeNeighbours(Node node) {
        try {
            Field field = node.getClass().getDeclaredField("neighbours");
            field.setAccessible(true);
            return (ArrayList<Node>) field.get(node);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private static void setNodeHn(Node node, int hn) {
        try {
            Field field = node.getClass().getDeclaredField("hn");
            field.setAccessible(true);
            field.set(node, hn);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private static Node createTestNode() {
        Node node = new Node();
        node.setState(new Queen[] {
                new Queen(0, 0), new Queen(1, 1), new Queen(2, 2), new Queen(3, 3),
                new Queen(4, 4), new Queen(5, 5), new Queen(6, 6), new Queen(7, 7)
        });
        return node;
    }

    @Test
    public void testGenerateNeighbours() {
        Node node = createTestNode();
        node.generateNeighbours(node);

        assertEquals(56, getNodeNeighbours(node).size()); // There should be 56 possible neighbours
    }

    @Test(expected = NullPointerException.class)
    public void testGenerateNullNeighbours() {
        Node node = new Node();
        node.generateNeighbours(null);
    }

    @Test
    public void testGetRandomNeighbour() {
        Node node = createTestNode();

        Node neighbour = node.getRandomNeighbour(node);

        assertNotNull(neighbour); // The neighbour should not be null
        assertNotEquals(node, neighbour); // The neighbour should be different from the original node
    }

    @Test
    public void testComputeHeuristic() {
        Node node = createTestNode();

        assertEquals(28, node.computeHeuristic()); // There should be 28 pairs of attacking queens
    }

    @Test
    public void testCompareTo() {
        Node node1 = new Node();
        setNodeHn(node1, 5);

        Node node2 = new Node();
        setNodeHn(node2, 10);

        // node1 has a lower heuristic score, so it should be "less" than node2
        assertEquals(-1, node1.compareTo(node2));
        // node2 has a higher heuristic score, so it should be "greater" than node1
        assertEquals(1, node2.compareTo(node1));
        // node1 has the same heuristic score as itself,
        // so it should be "equal" to itself
        assertEquals(0, node1.compareTo(node1));
    }

    @Test
    public void testGetState() {
        Node node = createTestNode();
        assertEquals(8, node.getState().length); // There should be 8 queens in the state
    }

    @Test
    public void testToString() {
        Node node = createTestNode();

        String expectedOutput = "Q X X X X X X X \n"
                + "X Q X X X X X X \n"
                + "X X Q X X X X X \n"
                + "X X X Q X X X X \n"
                + "X X X X Q X X X \n"
                + "X X X X X Q X X \n"
                + "X X X X X X Q X \n"
                + "X X X X X X X Q \n";

        assertEquals(expectedOutput, node.toString());
    }
}