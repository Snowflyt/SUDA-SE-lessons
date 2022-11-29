import java.util.Iterator;
import java.util.NoSuchElementException;

// 使用Java泛型实现的链栈，支持迭代和toString
class Stack<T> implements Iterable<T> {

    private Node top;
    private int length;

    private class Node {

        private T data;
        private Node next;

        private Node(T data, Node next) {
            this.data = data;
            this.next = next;
        }

    }

    public boolean isEmpty() {
        return this.top == null;
    }

    public int length() {
        return this.length;
    }

    public T peek() {
        if (this.top == null) {
            return null;
        } else {
            return this.top.data;
        }
    }

    public void push(T data) {
        this.top = new Node(data, this.top);
        this.length++;
    }

    public T pop() {
        if (this.top == null) {
            return null;
        } else {
            T data = this.top.data;
            this.top = this.top.next;
            this.length--;
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
        builder.delete(builder.length() - 2, builder.length());
        builder.append("]");
        return builder.toString();
    }

    public Iterator<T> iterator() {
        return new StackIterator();
    }

    private class StackIterator implements Iterator<T> {

        private Node current = top;

        public boolean hasNext() {
            return current != null;
        }

        @Override
        public void remove() {
            // not supported
        }

        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException();
            }
            T data = current.data;
            current = current.next;
            return data;
        }

    }

}
