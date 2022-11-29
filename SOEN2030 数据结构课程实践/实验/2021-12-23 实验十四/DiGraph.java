public class DiGraph {
    private final int V;
    private int E;
    private List<Integer>[] adj; //逆邻接表（只记录入度）

    public DiGraph(int V) {
        this.V = V;
        this.E = 0;
        this.adj = (List<Integer>[]) new List[V];
        // 由于类型擦除问题，必须使用强制类型转换创建泛型数组，确认代码没有问题
        for (int v = 0; v < V; v++) {
            this.adj[v] = new List<Integer>();
        }
    }

    public DiGraph(int V, int E, int[][] edges) {
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
        this.adj[w].append(v);
        this.E++;
    }

    public boolean topologicalSort() {
        // 计算节点出度
        int[] outDegree = new int[this.V];
        for (int v = 0; v < this.V; v++) {
            for (int w: this.adj(v)) {
                outDegree[w]++;
            }
        }
        // 0出度节点入栈
        Stack<Integer> stack = new Stack<Integer>();
        for (int v = 0; v < this.V; v++) {
            if (outDegree[v] == 0) {
                stack.push(v);
            }
        }
        // 查找有向环
        int count = 0;
        List<Integer> result = new List<Integer>();
        while (!stack.isEmpty()) {
            int v = stack.pop();
            result.append(v);
            count++;
            for (int w: this.adj(v)) {
                outDegree[w]--;
                if (outDegree[w] == 0) {
                    stack.push(w);
                }
            }
        }
        // 输出结果
        if (count < this.V) {
            return false;
        } else {
            System.out.println(result.reversed());
            return true;
        }
    }

    public List<Integer> adj(int v) {
        return this.adj[v];
    }
}
