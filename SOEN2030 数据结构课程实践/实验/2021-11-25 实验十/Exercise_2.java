import java.util.Arrays;

public class Exercise_2 {
    public static void main(String[] args) throws Exception {
        // read data and create BiTree
        String[] in = { "A",
                        "B",  "C",
                        "D", null,  "E",  "F",
                       null,  "G", null, null,  "H", null,
                       null, null, null, null};
        BiTree<String> a = new BiTree<String>(in);
        // print old tree preOrder, inOrder, postOrder
        System.out.println("Old Tree");
        System.out.println("preOrder:   " + Arrays.toString(a.preOrder()));
        System.out.println("inOrder:    " + Arrays.toString(a.inOrder()));
        System.out.println("postOrder:  " + Arrays.toString(a.postOrder()));
        System.out.println("levelOrder: " + Arrays.toString(a.levelOrder()));
        System.out.println();
        // swap left and right
        a.exchange();
        // print new tree preOrder, inOrder, postOrder
        System.out.println("New Tree");
        System.out.println("preOrder:   " + Arrays.toString(a.preOrder()));
        System.out.println("inOrder:    " + Arrays.toString(a.inOrder()));
        System.out.println("postOrder:  " + Arrays.toString(a.postOrder()));
        System.out.println("levelOrder: " + Arrays.toString(a.levelOrder()));
    }
}
