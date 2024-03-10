package net.mooctest;

import java.util.LinkedList;

/**
 * 验证二叉搜索树
 * 
 * @author LeetCode
 * 
 */
public class ValidateBinarySearchTree {

    LinkedList<TreeNode> stack = new LinkedList<>();
    LinkedList<Integer> uppers = new LinkedList<>();
    LinkedList<Integer> lowers = new LinkedList<>();

    public void update(TreeNode root, Integer lower, Integer upper) {
        stack.add(root);
        lowers.add(lower);
        uppers.add(upper);
    }

    public boolean isValidBST(TreeNode root) {
        Integer lower = null;
        Integer upper = null;
        Integer val;
        update(root, lower, upper);

        while (!stack.isEmpty()) {
            root = stack.poll();
            lower = lowers.poll();
            upper = uppers.poll();

            if (root == null)
                continue;
            val = root.val;
            if (lower != null && val <= lower)
                return false;
            if (upper != null && val >= upper)
                return false;
            update(root.right, val, upper);
            update(root.left, lower, val);
        }

        return true;
    }

}
