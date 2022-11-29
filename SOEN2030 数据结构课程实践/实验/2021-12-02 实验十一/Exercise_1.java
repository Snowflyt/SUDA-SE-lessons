import java.util.Arrays;

public class Exercise_1 {
    public static void main(String[] args) throws Exception {
        // read data and build tree
        String[][] in = {{null, "A"}, 
                         { "A", "B"}, {"A", "C"}, {"A", "D"}, 
                         { "B", "E"}, {"C", "F"}, {"C", "G"}, {"D", "H"}, { "D", "I"}, {"D", "J"}, 
                         { "E", "K"}, {"E", "L"}, {"I", "M"}};
        CST<String> a = new CST<String>(in);
        // output
        System.out.println(Arrays.toString(a.spiralOrder()));
    }
}
