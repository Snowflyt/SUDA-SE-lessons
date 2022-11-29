public class Graph {
    private final int V;
    private int E;
    private List<Integer>[] adj;

    public Graph(int V) {
        this.V = V;
        this.E = 0;
        this.adj = (List<Integer>[]) new List[V];
        // 由于类型擦除问题，必须使用强制类型转换创建泛型数组，确认代码没有问题
        for (int v = 0; v < V; v++) {
            this.adj[v] = new List<Integer>();
        }
    }

    public Graph(int V, int E, int[][] edges) {
        this(V);
        this.E = E;
        for (int[] edge : edges) {
            addEdge(edge[0], edge[1]);
        }
    }

    public int V() {
        return this.V;
    }

    public int E() {
        return this.E;
    }

    public void addEdge(int v, int w) {
        this.adj[v].append((Integer) w);
        this.adj[w].append((Integer) v);
        this.E++;
    }

    public int[] dfs() {
        int[] result = new int[this.V];
        boolean[] visited = new boolean[this.V];
        Stack<Integer> stack = new Stack<Integer>();
        int n = 0;
        for (int v = 0; v < this.V; v++) {
            if (!visited[v]) {
                visited[v] = true;
                stack.push(v);
                while (!stack.isEmpty()) {
                    int u = stack.pop();
                    visited[u] = true;
                    result[n] = u;
                    n++;
                    for (int w : this.adj(u).reversed()) {
                        if (!visited[w]) {
                            visited[w] = true;
                            stack.push(w);
                        }
                    }
                }
            }
        }
        return result;
    }

    public int[] bfs() {
        int[] result = new int[this.V];
        boolean[] visited = new boolean[this.V];
        Queue<Integer> queue = new Queue<Integer>();
        int n = 0;
        for (int v = 0; v < this.V; v++) {
            if (!visited[v]) {
                visited[v] = true;
                queue.enqueue(v);
                while (!queue.isEmpty()) {
                    int u = queue.dequeue();
                    result[n] = u;
                    n++;
                    for (int w : this.adj(u)) {
                        if (!visited[w]) {
                            visited[w] = true;
                            queue.enqueue(w);
                        }
                    }
                }
            }
        }
        return result;
    }

    public List<Integer> adj(int v) {
        return this.adj[v];
    }
}
