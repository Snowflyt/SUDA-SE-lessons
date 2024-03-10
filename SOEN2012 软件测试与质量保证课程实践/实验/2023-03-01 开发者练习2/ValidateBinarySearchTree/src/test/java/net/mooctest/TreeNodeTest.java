package net.mooctest;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class TreeNodeTest {

    @Test
    public void test() throws Throwable {
        TreeNode rootNode = new TreeNode(42);
        assertEquals(42, rootNode.val);

        TreeNode leftNode = new TreeNode(21);
        rootNode.left = leftNode;
        assertEquals(21, rootNode.left.val);

        TreeNode rightNode = new TreeNode(84);
        rootNode.right = rightNode;
        assertEquals(84, rootNode.right.val);
    }

}
