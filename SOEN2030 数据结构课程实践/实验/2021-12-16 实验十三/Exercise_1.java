import java.util.Arrays;

public class Exercise_1 {
    public static void main(String[] args) throws Exception {
        int[][] edges = {{0, 1}, {0, 2}, {1, 3}, 
                         {1, 4}, {2, 5}, {2, 6}, 
                         {5, 6}, {3, 7}, {4, 7}};
        Graph G = new Graph(8, 9, edges);
        System.out.println(Arrays.toString(G.dfs()));
        System.out.println(Arrays.toString(G.bfs()));
    }
}