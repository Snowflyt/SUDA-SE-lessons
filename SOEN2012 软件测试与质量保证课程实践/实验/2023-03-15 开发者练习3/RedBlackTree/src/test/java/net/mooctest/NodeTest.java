package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class NodeTest {
    @Test
    public void testIsLeaf() {
        // Assert leaf without parent.
        Node node1 = new Node(1, null, null, null);
        assertTrue(node1.isLeaf());

        // Assert leaf with parent.
        Node node2 = new Node(1, node1, null, null);
        assertTrue(node2.isLeaf());

        // Assert non-leaf (left child).
        Node node3 = new Node(
                1,
                null,
                new Node(2, null, null, null),
                null);
        assertFalse(node3.isLeaf());

        // Assert non-leaf (right child).
        Node node4 = new Node(
                1,
                null,
                null,
                new Node(2, null, null, null));
        assertFalse(node4.isLeaf());

        // Assert non-leaf (both children).
        Node node5 = new Node(
                1,
                null,
                new Node(2, null, null, null),
                new Node(3, null, null, null));
        assertFalse(node5.isLeaf());
    }

    @Test
    public void testHashCode() {
        // Assert base value to be 31.
        Node node1 = new Node(0, null, null, null);
        assertEquals(31, node1.hashCode());

        // Assert null value to be the same as 0.
        Node node2 = new Node(null, null, null, null);
        assertEquals(31, node2.hashCode());

        // Assert value to be added to hash code.
        Node node3 = new Node(42, null, null, null);
        assertEquals(31 + 42, node3.hashCode());
    }

    @Test
    public void testEquals() {
        // Nodes with same value should be equal.
        Node node1 = new Node(42, null, null, null);
        Node node2 = new Node(42, null, null, null);
        assertEquals(node1, node2);

        // Even when nodes have different parents or children,
        // they should be equal if they have the same value.
        Node node3 = new Node(42, node1, null, null);
        Node node4 = new Node(42, node2, null, null);
        assertEquals(node3, node4);
        Node node5 = new Node(42, null, node1, null);
        Node node6 = new Node(42, null, node2, null);
        assertEquals(node5, node6);

        // Test inequality.
        assertNotEquals(node1, new Node(41, null, null, null));

        // Test self equality.
        assertEquals(node1, node1);

        // Test null equality.
        assertFalse(node1.equals(null));

        // Test different class equality.
        assertFalse(node1.equals(new Object()));

        // Test null value node equality.
        Node node7 = new Node(null, null, null, null);
        Node node8 = new Node(null, null, null, null);
        assertEquals(node7, node8);
        assertNotEquals(node7, node6);
    }
}
