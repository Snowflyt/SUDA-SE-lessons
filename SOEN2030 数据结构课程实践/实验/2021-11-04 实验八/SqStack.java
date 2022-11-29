public class SqStack {

    private Object[] stackElem;
    private int top;

    public SqStack(int maxSize) {
        this.top = 0;
        this.stackElem = new Object[maxSize];
    }

    public void clear() {
        this.top = 0;
    }

    public boolean isEmpty() {
        return this.top == 0;
    }

    public int length() {
        return this.top;
    }

    public Object peek() {
        if (!this.isEmpty()) {
            return this.stackElem[this.top-1];
        } else {
            return null;
        }
    }

    public void push(Object x) {
        if (this.top == this.stackElem.length) {
            throw new IllegalStateException("Stack is full");
        } else {
            this.stackElem[this.top] = x;
            this.top++;
        }
    }

    public Object pop() {
        if (this.isEmpty()) {
            return null;
        } else {
            this.top--;
            return this.stackElem[this.top];
        }
    }

}
