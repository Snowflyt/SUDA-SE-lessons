import java.util.Scanner;

public class LinkedList {

    private Node head;
    private int length;

    public LinkedList() {
        length = 0;
        head = new Node();
    }

    public LinkedList(int n, boolean order) {
        this();
        if (order) {
            create1(n);
        } else {
            create2(n);
        }
    }

    // 尾插法
    public void create1(int n) {
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < n; i++) {
            insert(0, sc.next());
        }
        sc.close();
    }

    // 头插法
    public void create2(int n) {
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < n; i++) {
            append(sc.next());
        }
        sc.close();
    }

    public void clear() {
        length = 0;
        head.setNext(null);
    }

    public boolean isEmpty() {
        return length == 0;
    }

    public Node head() {
        return head;
    }

    public int length() {
        return length;
    }

    public Object get(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = head.getNext();
        for (int i = 0; i < index; i++) {
            p = p.getNext();
        }
        return p.getNext();
    }

    public void append(Object x) {
        Node p = head;
        for (int i = 0; i < length; i++) {
            p = p.getNext();
        }
        p.setNext(new Node(x));
        length++;
    }

    public void insert(int index, Object x) throws IndexOutOfBoundsException {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = head;
        for (int i = 0; i < index; i++) {
            p = p.getNext();
        }
        p.setNext(new Node(x, p.getNext()));
        length++;
    }

    public void remove(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = head;
        for (int i = 0; i < index; i++) {
            p = p.getNext();
        }
        p.setNext(p.getNext().getNext());
        length--;
    }

    public int indexOf(Object x) {
        Node p = head.getNext();
        int i;
        for (i = 0; p != null && !p.getData().equals(x); i++) {
            p = p.getNext();
        }
        if (p != null) {
            return i;
        } else {
            return -1;
        }
    }

}
