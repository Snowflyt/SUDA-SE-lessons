import java.util.Iterator;
import java.util.NoSuchElementException;

// 使用Java泛型实现的链表，支持迭代、输出数组、排序、逆序等方法
public class List<T extends Comparable<T>> implements Iterable<T> {

    private Node head;
    private int curLen;

    // Node类型
    private class Node {
        T data;
        Node next;

        public Node(T data, Node next) {
            this.data = data;
            this.next = next;
        }
    }

    // 构造函数
    public List() {
        this.head = new Node(null, null);
        this.curLen = 0;
    }

    public List(T[] arr) {
        this();
        Node p = this.head;
        for (T i : arr) {
            p.next = new Node(i, null);
            p = p.next;
        }
    }

    public List(List<T> lst) {
        this();
        Node p = this.head;
        for (T i : lst) {
            p.next = new Node(i, null);
            p = p.next;
        }
    }

    // 获取头节点
    public Node head() {
        return this.head;
    }

    // 是否为空
    public boolean isEmpty() {
        return this.curLen == 0;
    }

    // 获取长度
    public int length() {
        return this.curLen;
    }

    // 获取对应下标的元素
    public T get(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= this.curLen) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = this.head.next;
        for (int i = 0; i < index; i++) {
            p = p.next;
        }
        return p.data;
    }

    // 增加元素
    public void append(T x) {
        Node p = this.head;
        for (int i = 0; i < this.curLen; i++) {
            p = p.next;
        }
        p.next = new Node(x, null);
        this.curLen++;
    }

    // 扩展列表
    public void extend(T[] arr) {
        Node p = this.head;
        for (int i = 0; i < this.curLen; i++) {
            p = p.next;
        }
        for (int i = 0; i < arr.length; i++) {
            p.next = new Node(arr[i], null);
            p = p.next;
        }
        this.curLen += arr.length;
    }

    public void extend(List<T> lst) {
        Node p = this.head;
        for (int i = 0; i < this.curLen; i++) {
            p = p.next;
        }
        for (T i : lst) {
            p.next = new Node(i, null);
            p = p.next;
        }
        this.curLen += lst.length();
    }

    // 插入元素
    public void insert(int index, T x) throws IndexOutOfBoundsException {
        if (index < 0 || index > this.curLen) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = this.head;
        for (int i = 0; i < index; i++) {
            p = p.next;
        }
        p.next = new Node(x, p.next);
        this.curLen++;
    }

    // 删除指定元素
    public void remove(T x) throws NoSuchElementException {
        Node p = this.head;
        while (p.next != null && !p.next.data.equals(x)) {
            p = p.next;
        }
        if (p.next == null) {
            throw new NoSuchElementException(x + "is not in list");
        } else {
            p.next = p.next.next;
            this.curLen--;
        }
    }

    // 按下标删除元素
    public void delete(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= this.curLen) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = this.head;
        for (int i = 0; i < index; i++) {
            p = p.next;
        }
        p.next = p.next.next;
        this.curLen--;
    }

    // 查找元素对应下标
    public int index(T x) throws NoSuchElementException {
        Node p = this.head.next;
        int i;
        for (i = 0; p != null && !p.data.equals(x); i++) {
            p = p.next;
        }
        if (p != null) {
            return i;
        } else {
            throw new NoSuchElementException(i + "is not in list");
        }
    }

    // 返回复制后的新列表
    public List<T> copy() {
        List<T> result = new List<>();
        Node p = this.head.next;
        Node q = result.head;
        while (p != null) {
            q.next = new Node(p.data, null);
            q = q.next;
            result.curLen++;
            p = p.next;
        }
        return result;
    }

    // 统计列表中指定元素的个数
    public int count(T x) {
        int result = 0;
        Node p = this.head.next;
        while (p != null) {
            if (p.data.equals(x)) {
                result++;
            }
            p = p.next;
        }
        return result;
    }

    // 就地排序
    public void sort() {
        // 由于链表不支持随机访问，因此不适用快速排序，这里采用归并排序
        mergeSort(this.head.next);
    }

    private Node mergeSort(Node head) {
        if (head == null || head.next == null) {
            return head;
        }
        Node middle = getMiddle(head);
        Node sHalf = middle.next;
        middle.next = null;
        return merge(mergeSort(head), mergeSort(sHalf));
    }

    private Node merge(Node a, Node b) {
        Node dummyHead;
        Node curr;
        dummyHead = new Node(null, null);
        curr = dummyHead;
        while (a != null && b != null) {
            if (a.data.compareTo(b.data) <= 0) {
                curr.next = a;
                a = a.next;
            } else {
                curr.next = b;
                b = b.next;
            }
            curr = curr.next;
        }
        curr.next = (a == null) ? b : a;
        return dummyHead.next;
    }

    private Node getMiddle(Node head) {
        if (head == null) {
            return head;
        }
        Node slow;
        Node fast;
        slow = fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    // 就地逆序
    public void reverse() {
        Node newHead = new Node(null, null);
        Node p = this.head.next;
        while (p != null) {
            newHead.next = new Node(p.data, newHead.next);
            p = p.next;
        }
        this.head = newHead;
    }

    // 返回逆序链表
    public List<T> reversed() {
        List<T> result = new List<>();
        result.head = new Node(null, null);
        Node p = this.head.next;
        while (p != null) {
            result.head.next = new Node(p.data, result.head.next);
            result.curLen++;
            p = p.next;
        }
        return result;
    }

    // 返回数组形式的列表
    public T[] toArray() {
        T[] result = (T[]) new Object[this.curLen];
        // 由于类型擦除的问题，Java不支持泛型数组的创建，只能强制转换
        Node p = this.head.next;
        for (int i = 0; i < this.curLen; i++) {
            result[i] = p.data;
            p = p.next;
        }
        return result;
    }

    // 返回数组形式的列表并将全部元素强制转换为int
    public int[] toArrayInt() {
        int[] result = new int[this.curLen];
        Node p = this.head.next;
        for (int i = 0; i < this.curLen; i++) {
            result[i] = (int) p.data;
            p = p.next;
        }
        return result;
    }

    // 重写toString方法
    public String toString() {
        Node p = this.head.next;
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        while (p != null) {
            builder.append(p.data + ", ");
            p = p.next;
        }
        if (this.curLen > 0) {
            builder.delete(builder.length() - 2, builder.length());
        }
        builder.append("]");
        return builder.toString();
    }

    // 返回迭代器，以支持迭代
    public Iterator<T> iterator() {
        return new LinkListIterator();
    }

    // 迭代器
    private class LinkListIterator implements Iterator<T> {

        private Node current = head.next;

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
