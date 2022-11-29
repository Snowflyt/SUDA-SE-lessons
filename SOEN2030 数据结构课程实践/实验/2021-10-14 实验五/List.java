import java.util.Arrays;
import java.util.NoSuchElementException;

public class List {

    private Object[] listElem;
    private int length;

    // 初始化
    public List() {
        length = 0;
        listElem = new Object[1];
    }

    // 清空列表
    public void clear() {
        length = 0;
        listElem = new Object[1];
    }

    // 是否为空
    public boolean isEmpty() {
        return length == 0;
    }

    // 返回列表长度
    public int length() {
        return length;
    }

    // 返回下标为index的元素
    public Object get(int index) throws IndexOutOfBoundsException {
        if (index < 0) {
            index = length + index;
        }
        if (index < 0 || index >= length) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        return listElem[index];
    }

    // 增加元素
    public void append(Object x) {
        // 若空间已满，扩展空间（×2）
        if (length == listElem.length) {
            listElem = Arrays.copyOf(listElem, 2 * listElem.length);
        }
        // 增加元素
        listElem[length++] = x;
    }

    // 插入（允许负下标与大于等于列表长度的下标）
    public void insert(int index, Object x) {
        // 处理负下标与大于等于列表长度的下标
        if (index < 0) {
            index = length + index;
            if (index < 0) {
                index = 0;
            }
        }
        if (index > length) {
            index = length;
        }
        // 若空间已满，扩展空间（×2）
        if (length == listElem.length) {
            listElem = Arrays.copyOf(listElem, 2 * listElem.length);
            for (int i = index + 1; i < length + 1; i++) {
                listElem[i] = listElem[i - 1];
            }
        }
        // 插入元素
        length++;
        listElem[index] = x;
    }

    // 严格插入（不允许负下标与大于等于列表长度的下标）
    public void strictInsert(int index, Object x) throws IndexOutOfBoundsException {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("invalid index " + index);
        }
        insert(index, x);
    }

    // 删除（元素不存在不抛出异常）
    public void remove(Object x) {
        int i = 0;
        while (i < length && !listElem[i].equals(x)) {
            i++;
        }
        if (i < length) {
            // 删除元素
            length--;
            for (int j = i; j < length; j++) {
                listElem[j] = listElem[j + 1];
            }
            // 若空间使用率不足四分之一，收缩空间（×1/2）
            if (length <= listElem.length / 4) {
                listElem = Arrays.copyOf(listElem, listElem.length / 2);
            }
        }
    }

    // 严格删除（元素不存在则抛出异常）
    public void strictRemove(Object x) throws NoSuchElementException {
        int i = 0;
        while (i < length && !listElem[i].equals(x)) {
            i++;
        }
        if (i < length) {
            // 删除元素
            length--;
            for (int j = i; j < length; j++) {
                listElem[j] = listElem[j + 1];
            }
            // 若空间使用率不足四分之一，收缩空间（×1/2）
            if (length <= listElem.length / 4) {
                listElem = Arrays.copyOf(listElem, listElem.length / 2);
            }
        } else {
            throw new NoSuchElementException(x + " not in list");
        }
    }

    // 按下标删除（允许负下标与大于等于列表长度的下标）
    public void removeIndex(int index) {
        // 处理负下标与大于等于列表长度的下标
        if (index < 0) {
            index = length + index;
            if (index < 0) {
                index = 0;
            }
        }
        if (index > length) {
            index = length;
        }
        // 删除元素
        length--;
        for (int i = index; i < length; i++) {
            listElem[i] = listElem[i + 1];
        }
        // 若空间使用率不足四分之一，收缩空间（×1/2）
        if (length <= listElem.length / 4) {
            listElem = Arrays.copyOf(listElem, listElem.length / 2);
        }
    }

    // 严格按下标删除（不允许负下标与大于等于列表长度的下标）
    public void strictRemoveIndex(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("invalid index " + index);
        }
        removeIndex(index);
    }

    // 返回列表中首次出现指定元素的下标，若不存在，则返回-1
    public int indexOf(Object x) {
        int i = 0;
        while (i < length && !listElem[i].equals(x)) {
            i++;
        }
        if (i < length) {
            return i;
        } else {
            return -1;
        }
    }

    // 返回列表中首次出现指定元素的下标，若不存在，则抛出异常
    public int strictIndexOf(Object x) throws NoSuchElementException {
        int i = 0;
        while (i < length && !listElem[i].equals(x)) {
            i++;
        }
        if (i < length) {
            return i;
        } else {
            throw new NoSuchElementException(x + " is not in list");
        }
    }

    // 转换为字符串，重写toString方法
    public String toString() {
        StringBuilder builder = new StringBuilder();
        builder.append("[");
        if (length > 0) {
            builder.append(listElem[0]);
        }
        for (int i = 1; i < length; i++) {
            builder.append(", ");
            builder.append(listElem[i]);
        }
        builder.append("]");
        return builder.toString();
    }

    // 打印列表
    public void display() {
        System.out.println(toString());
    }

}
