import java.util.Iterator;

// 使用Java泛型实现的链式队列，支持迭代和toString
class Queue<Item> implements Iterable<Item> {
    public Node front;
    public Node rear;
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
        return this.front == null;
    }

    public int length() {
        return this.N;
    }

    public Item getHead() {
        if (this.front != null) {
            return this.front.data;
        } else {
            return null;
        }
    }

    public Item getTail() {
        if (this.rear != null) {
            return this.rear.data;
        } else {
            return null;
        }
    }

    public void enqueue(Item data) {
        if (this.front == null) {
            this.front = new Node(data, null);
            this.rear = this.front;
        } else {
            this.rear.next = new Node(data, null);
            this.rear = this.rear.next;
        }
        this.N++;
    }

    public Item dequeue() {
        if (this.front == null) {
            return null;
        } else {
            Item data = this.front.data;
            this.front = this.front.next;
            if (this.front == null) {
                this.rear = null;
            }
            this.N--;
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

    public Queue<Item> reversed() {
        if (this.front == null) {
            return new Queue<Item>();
        }
        Queue<Item> result = new Queue<Item>();
        result.front = new Node(this.front.data, null);
        Node p = this.front.next;
        while (p != null) {
            result.front = new Node(p.data, result.front);
            p = p.next;
        }
        return result;
    }

    public Item[] toArray() {
        Item[] result = (Item[]) new Object[this.N];
        Node p = this.front;
        for (int i = 0; i < this.N; i++) {
            result[i] = p.data;
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

    public Iterator<Item> iterator() {
        return new QueueIterator();
    }

    private class QueueIterator implements Iterator<Item> {
        private Node current = front;

        public boolean hasNext() {
            return current != null;
        }

        public void remove() {}

        public Item next() {
            Item data = current.data;
            current = current.next;
            return data;
        }
    }
}