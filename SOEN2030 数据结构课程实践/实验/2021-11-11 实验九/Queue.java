import java.util.Iterator;
import java.util.NoSuchElementException;

// 使用Java泛型实现的链式队列，支持迭代和toString
class Queue<T> implements Iterable<T> {

    private Node front;
    private Node rear;
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
        return this.front == null;
    }

    public int length() {
        return this.length;
    }

    public T getHead() {
        if (this.front != null) {
            return this.front.data;
        } else {
            return null;
        }
    }

    public T getTail() {
        if (this.rear != null) {
            return this.rear.data;
        } else {
            return null;
        }
    }

    public void enqueue(T data) {
        if (this.front == null) {
            this.front = new Node(data, null);
            this.rear = this.front;
        } else {
            this.rear.next = new Node(data, null);
            this.rear = this.rear.next;
        }
        this.length++;
    }

    public T dequeue() {
        if (this.front == null) {
            return null;
        } else {
            T data = this.front.data;
            this.front = this.front.next;
            if (this.front == null) {
                this.rear = null;
            }
            this.length--;
            return data;
        }
    }

    public void reverse() {
        if (this.front == null) {
            return;
        }
        Node newFront = new Node(this.front.data, null);
        Node p = this.front.next;
        while (p != null) {
            newFront = new Node(p.data, newFront);
            p = p.next;
        }
        this.front = newFront;
    }

    public Queue<T> reversed() {
        if (this.front == null) {
            return new Queue<T>();
        }
        Queue<T> result = new Queue<T>();
        result.front = new Node(this.front.data, null);
        Node p = this.front.next;
        while (p != null) {
            result.front = new Node(p.data, result.front);
            p = p.next;
        }
        return result;
    }

    public T[] toArray() {
        T[] result = (T[]) new Object[this.length];
        Node p = this.front;
        for (int i = 0; i < this.length; i++) {
            result[i] = p.data;
            p = p.next;
        }
        return result;
    }

    public int[] toArrayInt() {
        int[] result = new int[this.length];
        Node p = this.front;
        for (int i = 0; i < this.length; i++) {
            result[i] = (int) p.data;
            p = p.next;
        }
        return result;
    }

    public String toString() {
        Node p = this.front;
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

    public Iterator<T> iterator() {
        return new QueueIterator();
    }

    private class QueueIterator implements Iterator<T> {

        private Node current = front;

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
