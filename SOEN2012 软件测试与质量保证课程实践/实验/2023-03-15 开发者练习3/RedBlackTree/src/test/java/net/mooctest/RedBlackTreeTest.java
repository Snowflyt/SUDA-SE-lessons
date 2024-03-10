package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import net.mooctest.RedBlackTree.ColorEnum;
import net.mooctest.RedBlackTree.RedBlackNode;

public class RedBlackTreeTest {
    private static final int[] insertArr = {
            12, 49, 51, 61, 40, 30, 57, 8, 4, 9,
            2, 52, 24, 43, 18, 80, 37, 65, 92, 29,
            79, 5, 67, 41, 90, 94, 87, 44, 82, 76,
    };

    private static RedBlackTree createTestTree() {
        RedBlackTree tree = new RedBlackTree();
        for (int i : insertArr) {
            tree.insert(i);
        }
        return tree;
    }

    private static boolean validateTree(RedBlackTree tree) {
        if (tree.root == null || ((RedBlackNode) tree.root).color != ColorEnum.BLACK) {
            return false;
        }
        return validateNode(tree.root, 0, -1);
    }

    private static boolean validateNode(Node node, int blackNodeCount, int pathBlackNodeCount) {
        if (node == null || node == RedBlackTree.nilNode) {
            if (pathBlackNodeCount == -1) {
                pathBlackNodeCount = blackNodeCount;
            }
            return pathBlackNodeCount == blackNodeCount;
        }

        RedBlackNode rbNode = (RedBlackNode) node;

        // Two consecutive red nodes violate the red-black tree property
        if (rbNode.color == ColorEnum.RED && (isRed(node.left) || isRed(node.right))) {
            return false;
        }

        if (rbNode.color == ColorEnum.BLACK) {
            blackNodeCount++;
        }

        // Check the left subtree and right subtree recursively
        return validateNode(node.left, blackNodeCount, pathBlackNodeCount) &&
                validateNode(node.right, blackNodeCount, pathBlackNodeCount);
    }

    private static boolean isRed(Node node) {
        return node != null && node != RedBlackTree.nilNode && ((RedBlackNode) node).color == ColorEnum.RED;
    }

    @Test
    public void testInsert() {
        RedBlackTree tree = createTestTree();

        // Check if the values are inserted
        for (int i : insertArr) {
            assertTrue(tree.contains(i));
        }

        // Check if the tree is valid
        assertTrue(validateTree(tree));
    }

    @Test
    public void testDelete() {
        RedBlackTree tree = createTestTree();

        // Delete the nodes one by one
        for (int i : insertArr) {
            assertNotNull(tree.delete(tree.search(i)));
            assertNull(tree.search(i).value);
        }

        // Delete null node
        assertNull(tree.delete(null));

        // Delete nil node
        assertNull(tree.delete(RedBlackTree.nilNode));
    }

    @Test
    public void testMinimum() {
        RedBlackTree tree = createTestTree();

        // Check if the minimum node is correct
        assertEquals(2, tree.getMinimum());
    }

    @Test
    public void testMaximum() {
        RedBlackTree tree = createTestTree();

        // Check if the maximum node is correct
        assertEquals(94, tree.getMaximum());
    }
}
