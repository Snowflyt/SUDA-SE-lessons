public class Exercise_1 {
    public static void main(String[] args) throws Exception {
        // read data and build tree
        String[] preOrder = { "A", "B", "E", "K", "L", "C", "F", "G", "D", "H", "I", "M", "J" };
        String[] postOrder = { "K", "L", "E", "B", "F", "G", "C", "H", "M", "I", "J", "D", "A" };
        CST<String> a = new CST<String>(preOrder, postOrder);
        // output
        System.out.println("Leaf:   " + a.leaf());
        System.out.println("Size:   " + a.size());
        System.out.println("Degree: " + a.degree());
        System.out.println("Height: " + a.height());
    }
}
