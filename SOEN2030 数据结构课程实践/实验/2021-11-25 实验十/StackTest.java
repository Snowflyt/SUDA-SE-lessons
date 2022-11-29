class StackTest {
    public static void main(String[] args) throws Exception {
        Stack<String> a = new Stack<String>();
        String s = "to be or not to - be - - that - - - is";
        for (String i: s.split(" ")) {
            if (i.equals("-")) {
                System.out.print(a.pop() + " ");
            } else {
                a.push(i);
            }
        }
    }
}