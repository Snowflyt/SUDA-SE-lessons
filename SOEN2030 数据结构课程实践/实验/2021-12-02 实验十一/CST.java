// 利用Java泛型实现的孩子兄弟链表，利用边序列构造
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

    public CST(Item[][] x) {
        if (x.length == 0) {
            this.root = null;
        } else {
            this.root = new Node(x[0][1], null, null);
            Queue<Node> queue = new Queue<Node>(); 
            queue.enqueue(this.root);
            for (int i = 1; i < x.length; i++) {
                if (x[i][0] != x[i-1][0]) {
                    Node p = queue.dequeue();
                    while (p.data != x[i][0]) {
                        p = queue.dequeue();
                    }
                    p.child = new Node(x[i][1], null, null);
                    queue.enqueue(p.child);
                } else {
                    Node p = queue.getTail();
                    p.sibling = new Node(x[i][1], null, null);
                    queue.enqueue(p.sibling);
                }
            }
        }
    }

    public Item[] spiralOrder() {
        Stack<Node> stack = new Stack<Node>();
        Queue<Node> queue = new Queue<Node>();
        List<Item> result = new List<Item>();
        Node p;
        queue.enqueue(this.root);
        while (!queue.isEmpty() || !stack.isEmpty()) {
            while (!queue.isEmpty()) {
                p = queue.dequeue();
                result.append(p.data);
                p = p.child;
                while (p != null) {
                    stack.push(p);
                    p = p.sibling;
                }
            }
            Stack<Queue<Node>> queueStack = new Stack<Queue<Node>>();
            while (!stack.isEmpty()) {
                p = stack.pop();
                result.append(p.data);
                p = p.child;
                while (p != null) {
                    queue.enqueue(p);
                    p = p.sibling;
                }
                queueStack.push(queue);
                queue = new Queue<Node>();
            }
            while (!queueStack.isEmpty()) {
                Queue<Node> tmpQueue = queueStack.pop();
                while (!tmpQueue.isEmpty()) {
                    queue.enqueue(tmpQueue.dequeue());
                }
            }
        }
        return result.toArray();
    }
}
