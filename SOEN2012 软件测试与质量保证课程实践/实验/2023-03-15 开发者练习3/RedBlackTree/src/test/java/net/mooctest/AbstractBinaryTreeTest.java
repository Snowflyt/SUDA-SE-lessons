package net.mooctest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.junit.Test;

public class AbstractBinaryTreeTest {
    private static class BinaryTree extends AbstractBinaryTree {
        @Override
        protected Node createNode(int value, Node parent, Node left, Node right) {
            return new Node(value, parent, left, right);
        }
    }

    private static BinaryTree createTestTree() {
        BinaryTree tree = new BinaryTree();
        tree.root = new Node(47, null, null, null);
        tree.root.left = new Node(42, tree.root, null, null);
        tree.root.left.left = new Node(41, tree.root.left, null, null);
        tree.root.left.right = new Node(46, tree.root.left, null, null);
        tree.root.left.right.left = new Node(43, tree.root.left.right, null, null);
        tree.root.left.right.left.right = new Node(44, tree.root.left.right.left, null, null);
        tree.root.left.right.left.right.right = new Node(45, tree.root.left.right.left.right, null, null);
        tree.size = 7;
        return tree;
    }

    @Test
    public void testInsert() {
        BinaryTree tree = new BinaryTree();
        assertEquals(0, tree.getSize());

        // Insert one element.
        tree.insert(42);
        assertEquals(1, tree.getSize());

        // Insert a larger element.
        tree.insert(43);
        assertEquals(2, tree.getSize());

        // Insert a smaller element.
        tree.insert(41);
        assertEquals(3, tree.getSize());
    }

    @Test(expected = NullPointerException.class)
    public void testInsertNull() {
        BinaryTree nullTree = new BinaryTree();
        nullTree.root = new Node(null, null, null, null);
        nullTree.insert(42);
    }

    @Test
    public void testSearch() {
        BinaryTree tree = createTestTree();
        assertTrue(tree.contains(42));
        assertTrue(tree.contains(41));
        assertTrue(tree.contains(44));
        assertTrue(tree.contains(43));
        assertTrue(tree.contains(45));
        assertTrue(tree.contains(46));
        assertTrue(tree.contains(47));
    }

    @Test
    public void testSearchNull() {
        BinaryTree nullTree = new BinaryTree();
        assertFalse(nullTree.contains(42));
        nullTree.root = new Node(null, null, null, null);
        assertTrue(nullTree.contains(42));
    }

    @Test
    public void testDelete() {
        BinaryTree tree = createTestTree();

        // Delete a non-existing element.
        assertNull(tree.delete(48));

        // Delete a null node;
        assertNull(tree.delete(null));

        int size = tree.getSize();

        tree.delete(42);
        assertEquals(--size, tree.getSize());
        assertFalse(tree.contains(42));

        tree.delete(46);
        assertEquals(--size, tree.getSize());
        assertFalse(tree.contains(46));

        tree.delete(43);
        assertEquals(--size, tree.getSize());
        assertFalse(tree.contains(43));

        tree.delete(41);
        assertEquals(--size, tree.getSize());
        assertFalse(tree.contains(41));

        // Delete the root node.
        tree.delete(47);
        assertEquals(--size, tree.getSize());
        assertFalse(tree.contains(47));
    }

    @Test
    public void testGetters() {
        BinaryTree tree = createTestTree();
        assertEquals(47, tree.getMaximum());
        assertEquals(
                new Node(46, null, null, null),
                tree.getMaximum(tree.root.left));
        assertEquals(41, tree.getMinimum());
        assertEquals(42, tree.getSuccessor(41));
        assertEquals(43, tree.getSuccessor(42));
        assertEquals(44, tree.getSuccessor(43));
        assertEquals(45, tree.getSuccessor(44));
        assertEquals(46, tree.getSuccessor(45));
        assertEquals(47, tree.getSuccessor(46));
    }

    @Test(expected = NullPointerException.class)
    public void testGetSuccessorOfLargest() {
        BinaryTree tree = createTestTree();
        tree.getSuccessor(47);
    }

    private static BinaryTree createRotateTestTree() {
        BinaryTree tree = new BinaryTree();
        tree.insert(4);
        tree.insert(2);
        tree.insert(6);
        tree.insert(1);
        tree.insert(3);
        tree.insert(5);
        tree.insert(7);
        return tree;
    }

    @Test
    public void testRotate() {
        /* Rotate left */
        BinaryTree tree = createRotateTestTree();
        Node resultLeft1 = tree.rotateLeft(tree.root);
        assertEquals(6, (int) resultLeft1.value);
        assertEquals(4, (int) resultLeft1.left.value);
        assertEquals(2, (int) resultLeft1.left.left.value);
        assertEquals(1, (int) resultLeft1.left.left.left.value);
        assertEquals(3, (int) resultLeft1.left.left.right.value);
        assertEquals(5, (int) resultLeft1.left.right.value);
        assertEquals(7, (int) resultLeft1.right.value);

        tree = createRotateTestTree();
        Node resultLeft2 = tree.rotateLeft(tree.root.left);
        assertEquals(3, (int) resultLeft2.value);
        assertEquals(2, (int) resultLeft2.left.value);
        assertEquals(1, (int) resultLeft2.left.left.value);
        assertNull(resultLeft2.left.left.right);
        assertNull(resultLeft2.left.right);
        assertNull(resultLeft2.right);

        tree = createRotateTestTree();
        Node resultLeft3 = tree.rotateLeft(tree.root.right);
        assertEquals(7, (int) resultLeft3.value);
        assertEquals(6, (int) resultLeft3.left.value);
        assertEquals(5, (int) resultLeft3.left.left.value);
        assertNull(resultLeft3.left.left.left);
        assertNull(resultLeft3.left.left.right);
        assertNull(resultLeft3.left.right);
        assertNull(resultLeft3.right);

        /* Rotate right */
        tree = createRotateTestTree();
        Node resultRight1 = tree.rotateRight(tree.root);
        assertEquals(2, (int) resultRight1.value);
        assertEquals(1, (int) resultRight1.left.value);
        assertEquals(4, (int) resultRight1.right.value);
        assertEquals(3, (int) resultRight1.right.left.value);
        assertEquals(6, (int) resultRight1.right.right.value);
        assertEquals(5, (int) resultRight1.right.right.left.value);
        assertEquals(7, (int) resultRight1.right.right.right.value);

        tree = createRotateTestTree();
        Node resultRight2 = tree.rotateRight(tree.root.left);
        assertEquals(1, (int) resultRight2.value);
        assertEquals(2, (int) resultRight2.right.value);
        assertEquals(3, (int) resultRight2.right.right.value);
        assertNull(resultRight2.right.right.left);
        assertNull(resultRight2.right.right.right);
        assertNull(resultRight2.right.left);
        assertNull(resultRight2.left);

        tree = createRotateTestTree();
        Node resultRight3 = tree.rotateRight(tree.root.right);
        assertEquals(5, (int) resultRight3.value);
        assertEquals(6, (int) resultRight3.right.value);
        assertEquals(7, (int) resultRight3.right.right.value);
        assertNull(resultRight3.right.right.left);
        assertNull(resultRight3.right.right.right);
        assertNull(resultRight3.right.left);
        assertNull(resultRight3.left);
    }

    @Test
    public void testPrint() {
        BinaryTree tree = createTestTree();
        tree.printTree();
        tree.printSubtree(tree.root.left);
        tree.printSubtree(tree.root.left.left);
        tree.printTreeInOrder();
        tree.printTreePreOrder();
        tree.printTreePostOrder();
    }

    @Test
    public void testPrintNull() throws NoSuchMethodException, SecurityException, IllegalAccessException,
            IllegalArgumentException, InvocationTargetException {
        BinaryTree nullTree = new BinaryTree();
        nullTree.root = new Node(null, null, null, null);

        // Use reflect to get the private methods.
        Class<?> clazz = AbstractBinaryTree.class;
        Method printTreeInOrder = clazz.getDeclaredMethod("printTreeInOrder", Node.class);
        printTreeInOrder.setAccessible(true);
        Method printTreePreOrder = clazz.getDeclaredMethod("printTreePreOrder", Node.class);
        printTreePreOrder.setAccessible(true);
        Method printTreePostOrder = clazz.getDeclaredMethod("printTreePostOrder", Node.class);
        printTreePostOrder.setAccessible(true);
        Method printNodeValue = clazz.getDeclaredMethod("printNodeValue", Node.class);
        printNodeValue.setAccessible(true);

        // Invoke the private methods.
        printTreeInOrder.invoke(nullTree, (Node) null);
        printTreeInOrder.invoke(nullTree, (Node) nullTree.root);
        printTreePreOrder.invoke(nullTree, (Node) null);
        printTreePreOrder.invoke(nullTree, (Node) nullTree.root);
        printTreePostOrder.invoke(nullTree, (Node) null);
        printTreePostOrder.invoke(nullTree, (Node) nullTree.root);
        printNodeValue.invoke(nullTree, (Node) nullTree.root);
    }
}
