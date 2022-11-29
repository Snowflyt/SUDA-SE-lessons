// 使用Java泛型实现的二叉树，利用扩展二叉树的层序序列构建。
public class CST<Item> {
    private Node root;

    private class Node {
        Item data;
        Node child;
        Node sibling;

        public Node(Item data, Node child, Node sibling) {
            this.data = data;
            this.child = child;
            this.sibling = sibling;
        }
    }

    public CST() {
        this.root = null;
    }

    public CST(Item[] preOrder, Item[] postOrder) {
        this.root = buildTree(preOrder, postOrder, 0, 0, preOrder.length);
    }

    private Node buildTree(Item[] preOrder, Item[] postOrder, int preIndex, int postIndex, int count) {
        if (count > 0) {
            Item r = preOrder[preIndex];
            int i = 0;
            for (; i < count; i++) {
                if (r == postOrder[i + postIndex]) {
                    break;
                }
            }
            Node pRoot = new Node(r, null, null);
            pRoot.child = buildTree(preOrder, postOrder, preIndex + 1, postIndex, i);
            pRoot.sibling = buildTree(preOrder, postOrder, preIndex + i + 1, 
                                      postIndex + i + 1, count - i - 1);
            return pRoot;
        }
        return null;
    }

    public int size() {
        int result = 0;
        if (this.root != null) {
            Queue<Node> queue = new Queue<Node>();
            queue.enqueue(this.root);
            while (!queue.isEmpty()) {
                Node p = queue.dequeue();
                result++;
                if (p.child != null) {
                    queue.enqueue(p.child);
                }
                if (p.sibling != null) {
                    queue.enqueue(p.sibling);
                }
            }
        }
        return result;
    }

    public int leaf() {
        int result = 0;
        if (this.root != null) {
            Queue<Node> queue = new Queue<Node>();
            queue.enqueue(this.root);
            while (!queue.isEmpty()) {
                Node p = queue.dequeue();
                if (p.child != null) {
                    queue.enqueue(p.child);
                } else {
                    result++;
                }
                if (p.sibling != null) {
                    queue.enqueue(p.sibling);
                }
            }
        }
        return result;
    }

    public int degree() {
        if (this.root == null) {
            return 0;
        }
        int result = 0;
        Queue<Node> queue = new Queue<Node>();
        queue.enqueue(this.root);
        queue.enqueue(new Node(null, null, null));
        while (queue.getHead() != null) {
            Node p = queue.dequeue();
            if (p.data == null && queue.getHead() != null) {
                queue.enqueue(new Node(null, null, null));
                continue;
            }
            p = p.child;
            int degree = 0;
            while (p != null) {
                queue.enqueue(p);
                degree++;
                p = p.sibling;
            }
            if (degree > result) {
                result = degree;
            }
        }
        return result;
    }

    public int height() {
        // 不包含根节点所在层
        if (this.root == null) {
            return 0;
        }
        int result = 0;
        Queue<Node> queue = new Queue<Node>();
        queue.enqueue(this.root);
        queue.enqueue(new Node(null, null, null));
        while (queue.getHead() != null) {
            Node p = queue.dequeue();
            if (p.data == null && queue.getHead() != null) {
                result++;
                queue.enqueue(new Node(null, null, null));
                continue;
            }
            p = p.child;
            while (p != null) {
                queue.enqueue(p);
                p = p.sibling;
            }
        }
        return result;
    }
}
