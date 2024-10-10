#include <iostream>
#include <vector>
#include <unordered_set>
using namespace std;

class Graph {
private:
	vector<unordered_set<int>> adjList;
	vector<bool> visited;

	bool DFS(int u, int v) {
		if (u == v) return true;
		visited[u] = true;
		for (int neighbor : adjList[u]) {
			if (!visited[neighbor] && DFS(neighbor, v)) {
				return true;
			}
		}
		return false;
	}

public:
	Graph(int n) : adjList(n + 1), visited(n + 1, false) {}

	void insertEdge(int u, int v) {
		adjList[u].insert(v);
		adjList[v].insert(u);
	}

	void deleteEdge(int u, int v) {
		adjList[u].erase(v);
		adjList[v].erase(u);
	}

	bool isConnected(int u, int v) {
		fill(visited.begin(), visited.end(), false);
		return DFS(u, v);
	}
};

int main() {
	int n, q;
	cin >> n >> q;

	Graph graph(n);
	vector<char> Judge;

	for (int i = 0; i < q; ++i) {
		char cmd;
		int u, v;
		cin >> cmd >> u >> v;

		switch (cmd) {
		case 'I':
			graph.insertEdge(u, v);
			break;
		case 'D':
			graph.deleteEdge(u, v);
			break;
		case 'Q':
			Judge.push_back(graph.isConnected(u, v) ? 'Y' : 'N');
			break;
		}
	}

	for (int i = 0; i < Judge.size(); i++) {
		cout << Judge[i] << endl;
	}
	return 0;
}
