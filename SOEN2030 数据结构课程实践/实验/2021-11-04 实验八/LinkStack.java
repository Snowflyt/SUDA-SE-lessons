public class LinkStack {

    private class Node {
    
        private Object data;
        private Node next;
    
        private Node() {
            this(null, null);
        }
    
        private Node(Object data) {
            this(data, null);
        }
    
        private Node(Object data, Node next) {
            this.data = data;
            this.next = next;
        }

    }

    private Node top;
    
    public void clear() {
        top = null;
    }

    public boolean isEmpty() {
        return top == null;
    }

    public Object peek() {
        if (!this.isEmpty()) {
            return top.data;
        } else {
            return null;
        }
    }

    public void push(Object x) {
        Node p = new Node(x);
        p.next = top;
        top = p;
    }

    public Object pop() {
        if (isEmpty()) {
            return null;
        } else {
            Node p = top;
            top = top.next;
            return p.data;
        }
    }

}
