import java.util.Iterator;

// 使用Java泛型实现的链栈，支持迭代和toString
class Stack<Item> implements Iterable<Item> {
    private Node top;
    private int N;

    private class Node {
        Item data;
        Node next;

        public Node(Item data, Node next) {
            this.data = data;
            this.next = next;
        }
    }

    public boolean isEmpty() {
        return this.top == null;
    }

    public int length() {
        return this.N;
    }

    public Item peek() {
        if (this.top == null) {
            return null;
        } else {
            return this.top.data;
        }
    }

    public void push(Item data) {
        this.top = new Node(data, this.top);
        this.N++;
    }

    public Item pop() {
        if (this.top == null) {
            return null;
        } else {
            Item data = this.top.data;
            this.top = this.top.next;
            this.N--;
            return data;
        }
    }

    public String toString() {
        Node p = this.top;
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        while (p != null) {
            builder.append(p.data + ", ");
            p = p.next;
        }
        builder.delete(builder.length()-2, builder.length());
        builder.append("]");
        return builder.toString();
    }

    public Iterator<Item> iterator() {
        return new StackIterator();
    }

    private class StackIterator implements Iterator<Item> {
        private Node current = top;

        public boolean hasNext() {
            return current != null;
        }

        public void remove() {
        }

        public Item next() {
            Item data = current.data;
            current = current.next;
            return data;
        }
    }
}