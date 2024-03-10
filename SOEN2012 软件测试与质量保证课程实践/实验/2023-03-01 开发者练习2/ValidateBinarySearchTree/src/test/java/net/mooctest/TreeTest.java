package net.mooctest;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class TreeTest {

    @Test
    public void testIsValidBST() {
        TreeNode root1 = new TreeNode(2);
        root1.left = new TreeNode(1);
        root1.right = new TreeNode(3);
        assertTrue(new ValidateBinarySearchTree().isValidBST(root1));

        TreeNode root2 = new TreeNode(5);
        root2.left = new TreeNode(1);
        root2.right = new TreeNode(4);
        root2.right.left = new TreeNode(3);
        root2.right.right = new TreeNode(6);
        assertFalse(new ValidateBinarySearchTree().isValidBST(root2));

        TreeNode root3 = new TreeNode(1);
        root3.left = new TreeNode(1);
        assertFalse(new ValidateBinarySearchTree().isValidBST(root3));

        TreeNode root4 = null;
        assertTrue(new ValidateBinarySearchTree().isValidBST(root4));
    }

}
