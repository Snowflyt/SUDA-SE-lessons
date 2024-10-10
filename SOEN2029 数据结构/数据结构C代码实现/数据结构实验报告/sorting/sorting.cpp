#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Hotel {
	int distance, cost;
};

// 比较函数，用于排序
bool compare(const Hotel &a, const Hotel &b) {
	if (a.distance == b.distance)
		return a.cost < b.cost;
	return a.distance < b.distance;
}

int main() {
	int N;
	cin >> N;
		vector<Hotel> hotels(N);
		for (int i = 0; i < N; ++i)
			cin >> hotels[i].distance >> hotels[i].cost;

		sort(hotels.begin(), hotels.end(), compare);

		int count = 0;
		int minCost = INT_MAX;
		for (const auto &hotel : hotels) {
			if (hotel.cost <= minCost) {
				minCost = hotel.cost;
				count++;
			}
		}

		cout << count << endl;
	
	return 0;
}
