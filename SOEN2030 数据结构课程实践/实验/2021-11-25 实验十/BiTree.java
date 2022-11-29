// 使用Java泛型实现的二叉树，利用扩展二叉树的层序序列构建。
public class BiTree<Item> {
    private Node root;

    // Node类型
    private class Node {
        Item data;
        Node left;
        Node right;

        public Node(Item data, Node left, Node right) {
            this.data = data;
            this.left = left;
            this.right = right;
        }
    }

    // 初始化
    public BiTree() {
        this.root = null;
    }

    public BiTree(Item data) {
        this.root = new Node(data, null, null);
    }

    // 使用扩展二叉树构造二叉树
    public BiTree(Item[] arr) {
        if (arr.length == 0) {
            this.root = null;
        } else {
            this.root = new Node(arr[0], null, null);
            Queue<Node> queue = new Queue<Node>();
            queue.enqueue(this.root);
            int i = 1;
            while (i < arr.length) {
                Node p = queue.dequeue();
                if (arr[i] != null) {
                    p.left = new Node(arr[i], null, null);
                    queue.enqueue(p.left);
                }
                if (arr[i+1] != null) {
                    p.right = new Node(arr[i+1], null, null);
                    queue.enqueue(p.right);
                }
                i += 2;
            }
        }
    }

    // 交换左右子树
    public void exchange() {
        Queue<Node> queue = new Queue<Node>();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            Node p = queue.dequeue();
            Node tmp = p.left;
            p.left = p.right;
            p.right = tmp;
            if (p.left != null) {
                queue.enqueue(p.left);
            }
            if (p.right != null) {
                queue.enqueue(p.right);
            }
        }
    }

    // 先序遍历
    public Item[] preOrder() throws Exception {
        return preOrder(this.root);
    }

    public Item[] preOrder(Node T) throws Exception {
        List<Item> result = new List<Item>();
        if (T != null) {
            result.append(T.data);
            result.extend(preOrder(T.left));
            result.extend(preOrder(T.right));
        }
        return result.toArray();
    }

    // 中序遍历
    public Item[] inOrder() throws Exception {
        return inOrder(this.root);
    }

    public Item[] inOrder(Node T) throws Exception {
        List<Item> result = new List<Item>();
        if (T != null) {
            result.extend(inOrder(T.left));
            result.append(T.data);
            result.extend(inOrder(T.right));
        }
        return result.toArray();
    }

    // 后序遍历
    public Item[] postOrder() throws Exception {
        return postOrder(this.root);
    }

    public Item[] postOrder(Node T) throws Exception {
        List<Item> result = new List<Item>();
        if (T != null) {
            result.extend(postOrder(T.left));
            result.extend(postOrder(T.right));
            result.append(T.data);
        }
        return result.toArray();
    }

    // 层序遍历
    public Item[] levelOrder() {
        Queue<Node> queue = new Queue<Node>();
        List<Item> result = new List<Item>();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            Node p = queue.dequeue();
            result.append(p.data);
            if (p.left != null) {
                queue.enqueue(p.left);
            }
            if (p.right != null) {
                queue.enqueue(p.right);
            }
        }
        return result.toArray();
    }
}
