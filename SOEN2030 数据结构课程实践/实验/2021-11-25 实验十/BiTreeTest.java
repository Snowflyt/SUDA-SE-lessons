import java.util.Arrays;

class BiTreeTest {
    public static void main(String[] args) throws Exception {
        Integer[] in = {12, 
                        13, 3, 
                        4, 5, 6, 7, 
                        null, null, 8, null, null, 9, null, null,
                        null, null, null, null};
        BiTree<Integer> a = new BiTree<Integer>(in);
        System.out.println(Arrays.toString(a.preOrder()));
    }
}