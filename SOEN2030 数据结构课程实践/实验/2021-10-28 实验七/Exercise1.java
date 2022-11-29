import java.util.Scanner;

class Node {

    private double coef;
    private int expn;
    private Node next;

    public double getCoef() {
        return coef;
    }

    public void setCoef(double coef) {
        this.coef = coef;
    }

    public int getExpn() {
        return expn;
    }

    public void setExpn(int expn) {
        this.expn = expn;
    }

    public Node getNext() {
        return next;
    }

    public void setNext(Node next) {
        this.next = next;
    }

    public Node() {
        this(0, 0, null);
    }

    public Node(double coef, int expn) {
        this(coef, expn, null);
    }

    public Node(double coef, int expn, Node next) {
        this.coef = coef;
        this.expn = expn;
        this.next = next;
    }

}

class Polynomial {

    private Node head;
    private int length;

    public Polynomial() {
        length = 0;
        head = new Node();
    }

    public Polynomial(double[] coefs, int[] expns) {
        this();
        if (coefs.length != expns.length) {
            throw new IllegalArgumentException("The length of coefs and expns are not equal");
        }
        this.length = coefs.length;
        Node p = head;
        for (int i = 0; i < this.length; i++) {
            p.setNext(new Node(coefs[i], expns[i]));
            p = p.getNext();
        }
    }

    public Node head() {
        return this.head;
    }

    public int length() {
        return this.length;
    }

    public void append(double coef, int expn) {
        Node p = head;
        for (int i = 0; i < length; i++) {
            p = p.getNext();
        }
        p.setNext(new Node(coef, expn));
        length++;
    }

    public void insert(int index, double coef, int expn) {
        if (index < 0 || index > length) {
            throw new IndexOutOfBoundsException("Invalid index " + index);
        }
        Node p = head;
        for (int i = 0; i < index; i++) {
            p = p.getNext();
        }
        p.setNext(new Node(coef, expn, p.getNext()));
        length++;
    }

    public void remove(int index) {
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

    public String toString() {
        // coef
        Node p = head.getNext();
        StringBuilder builder = new StringBuilder();
        builder.append("coef: [");
        if (length > 0) {
            builder.append(p.getCoef());
        }
        for (int i = 1; i < length; i++) {
            p = p.getNext();
            builder.append(", ");
            builder.append(p.getCoef());
        }
        builder.append("]");
        // expn
        p = head.getNext();
        builder.append("\nexpn: [");
        if (length > 0) {
            builder.append(p.getExpn());
        }
        for (int i = 1; i < length; i++) {
            p = p.getNext();
            builder.append(", ");
            builder.append(p.getExpn());
        }
        builder.append("]");
        return builder.toString();
    }

}

public class Exercise1 {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // get term number
        System.out.println("Input n:");
        int n = in.nextInt();
        // input coefs
        System.out.println("Input all coef:");
        double[] coefs = new double[n];
        for (int i = 0; i < n; i++) {
            coefs[i] = in.nextDouble();
        }
        // input expns
        System.out.println("Input all expn:");
        int[] expns = new int[n];
        for (int i = 0; i < n; i++) {
            expns[i] = in.nextInt();
        }
        in.close();
        // create poly and calculate
        Polynomial poly = new Polynomial(coefs, expns);
        Node p = poly.head();
        for (int i = 0; i < n; i++) {
            p = p.getNext();
            if (p.getExpn() == 0) {
                p.setCoef(0);
            } else {
                p.setCoef(p.getCoef() * p.getExpn());
                p.setExpn(p.getExpn() - 1);
            }
        }
        System.out.println(poly);
    }

}
