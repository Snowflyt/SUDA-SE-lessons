class QueueTest {
    public static void main(String[] args) throws Exception {
        Queue<String> a = new Queue<String>();
        String s = "to be or not to - be - - that - - - is";
        for (String i: s.split(" ")) {
            if (i.equals("-")) {
                System.out.print(a.dequeue() + " ");
            } else {
                a.enqueue(i);
            }
        }
    }
}