public class Exercise_1 {
    public static void main(String[] args) throws Exception {
        int[][] edges = {{0, 3}, {0, 7}, {1, 5}, {2, 5}, {3, 4}, 
                         {3, 5}, {3, 6}, {3, 8}, {3, 10}, {3, 11},
                         {4, 6}, {6, 8}, {6, 9}, {6, 10}, {6, 11},
                         {7, 9}, {7, 10}, {9, 11}};
        DiGraph G = new DiGraph(12, 18, edges);
        System.out.println(G.topologicalSort());
    }
}