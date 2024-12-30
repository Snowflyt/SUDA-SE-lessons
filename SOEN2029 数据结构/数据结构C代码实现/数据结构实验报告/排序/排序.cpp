#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <fstream>
using namespace std;


//创建整数文件
void generateTestData(vector<int> &data, int n, bool sorted, bool reversed) {
	random_device rd;
	default_random_engine eng(rd());
	uniform_int_distribution<int> distr;

	data.resize(n);
	for (int i = 0; i < n; i++) {
		data[i] = distr(eng);
	}

	if (sorted) {
		sort(data.begin(), data.end());
	}

	if (reversed) {
		reverse(data.begin(), data.end());
	}

	ofstream out("testdata.txt");
	for (int i = 0; i < n; i++) {
		out << data[i] << "\n";
	}
}


//插入排序
void insertSort(vector<int>& arr, int left, int right, int& keyComparison, int& recordMovement) {
	for (int i = left + 1; i < right; i++) {
		int k = left;
		if (arr[i] > arr[k]) {
			k++;
			keyComparison++;
		}

		int tmp = arr[i];
		for (int j = i; j > k; j--) {
			arr[j] = arr[j - 1];
			recordMovement++;
		}
		arr[k] = tmp;
	}
}

//选择排序
int GetMinIndex(vector<int> arr, int left, int right, int&keyComparison) {
	int min = arr[left];
	int min_index = left;
	for (int i = left + 1; i < right; i++) {
		if (arr[i] < min) {
			min = arr[i];
			min_index = i;
		}
		keyComparison++;
	}
	return min_index;
}

void swap(int&a, int&b) {
	int tmp = a;
	a = b;
	b = tmp;
}

void selectSort(vector<int>& arr, int left, int right, int&keyComparison, int& recordMovement) {
	for (int i = left; i < right - 1; i++) {      //选择的次数
		int min_index = GetMinIndex(arr, i, right, keyComparison);
		swap(arr[i], arr[min_index]);
		recordMovement++;
	}
}


//希尔排序
void ShellSort(vector<int>& arr, int left, int right, int& keyComparison, int& recordMovement) {
	int gap = right - left;
	while (gap > 1) {
		gap = gap / 3 + 1;
		for (int i = left + gap; i < right; i++) {
			int tmp = arr[i];
			int j = i;
			while (j > left&&tmp < arr[j - gap]) {
				keyComparison++;
				arr[j] = arr[j - gap];
				recordMovement++;
				j = j - gap;
			}
			arr[j] = tmp;
			recordMovement++;
		}
	}
}


//归并排序
void merge(vector<int>& array, int left, int mid, int right, int&keyComparison, int& recordMovement)
{
	int n1 = mid - left + 1;
	int n2 = right - mid;

	// 创建临时数组
	vector<int> L(n1), R(n2);

	// 复制数据到临时数组
	for (int i = 0; i < n1; i++)
		L[i] = array[left + i];
	for (int j = 0; j < n2; j++)
		R[j] = array[mid + 1 + j];

	// 合并两个临时数组回原数组(这个地方进行了排序)
	int i = 0;
	int j = 0;
	int k = left;
	while (i < n1 && j < n2) {
		keyComparison++;
		if (L[i] <= R[j]) {
			array[k] = L[i];
			i++;
			recordMovement++;
		}
		else {
			array[k] = R[j];
			j++;
			recordMovement++;
		}
		k++;
	}

	// 将剩余的元素复制回原数组（如果有的话）
	while (i < n1) {
		array[k] = L[i];
		i++;
		k++;
		recordMovement++;
	}

	while (j < n2) {
		array[k] = R[j];
		j++;
		k++;
		recordMovement++;
	}
}


// 主归并排序函数
void mergeSort(vector<int>& arr, int left, int right, int &keyComparison, int& recordMovement)
{
	if (left < right) {  //当分割到每组只剩一个的时候就停止分割
		// 为避免溢出，使用 left + (right -left)/2 来代替 (right + left)/2
		int mid = left + (right - left) / 2;

		// 对子数组进行归并排序
		mergeSort(arr, left, mid, keyComparison, recordMovement);
		mergeSort(arr, mid + 1, right, keyComparison, recordMovement);

		// 合并排序后的两个子数组
		merge(arr, left, mid, right, keyComparison, recordMovement);
	}
}



//快速排序
#define M 5
int GetMidIndex(vector<int>& arr, int left, int right) {
	int mid = (right-1 + left) / 2;
    if(arr[left]<arr[mid] && arr[mid]<arr[right-1])
           return mid;
    if(arr[mid]<arr[left] && arr[left]<arr[right-1])
           return left;
    return right-1;
}

int Partition(vector<int>& arr, int left, int right, int &keyComparison, int& recordMovement) {
	int mid_index = GetMidIndex(arr, left, right);
	keyComparison++;
	if (mid_index != left) {
		swap(arr[mid_index], arr[left]);
		recordMovement++;
	}

	int low = left;
	int high = right-1;
	int key = arr[left];

	while (low < high) {
		while (high>low && arr[high] > key) {
			high--;
			keyComparison++;
		}
		swap(arr[high], arr[high]);
		recordMovement++;

		while (high>low && arr[low] < key) {
			low++;
			keyComparison++;
		}
		swap(arr[low], arr[high]);
		recordMovement++;
	}

	return low;
}

void QuickSort(vector<int>& arr, int left, int right, int &keyComparison, int& recordMovement) {
	if (left >= right) {
		return;
	}
	if (right - left <= M) {
		insertSort(arr, left, right, keyComparison, recordMovement);
	}
	else {
		int pos = Partition(arr, left, right,keyComparison,recordMovement);
		QuickSort(arr, left, pos, keyComparison, recordMovement); //左区间进行快排
		QuickSort(arr, pos + 1, right, keyComparison, recordMovement);  //右区间进行快排
	}
}





//堆排序
void _AdjustDown(vector<int>& arr, int left, int right, int adjust_pos, int &keyComparison, int& recordMovement) {
	int n = arr.size();
	int i = adjust_pos;
	int j = 2 * i + 1;

	while (j < n) {
		keyComparison++;
		if (j + 1 < n && arr[j] < arr[j + 1])  {       //条件判断的两句千万不能写反 不然数组越界
			j++;
		}
		keyComparison++;
		if (arr[j] > arr[i]) {
			swap(arr[i], arr[j]);
			recordMovement++;
			i = j;
			j = 2 * i + 1;
		}
		else {
			break;
		}
	}
}

void HeapSort(vector<int>& arr, int left, int right, int &keyComparison, int& recordMovement) {
	//构建大堆
	int n = arr.size();
	int pos = n / 2 - 1;
	while (pos >= left) {
		_AdjustDown(arr,left,right,pos,keyComparison,recordMovement);
		pos--;
	}

	//排序
	int end = right - 1;
	while (end > left) {
		swap(arr[end], arr[left]);
		recordMovement++;
		_AdjustDown(arr, left, end, left, keyComparison, recordMovement);
		end--;
	}
}


//测试函数
int main() {
	int n = 2000;
	vector<int> arr;
	generateTestData(arr, n, false, false);

	//插入排序
	int keyComparison1 = 0;
	int recordMovement1 = 0;

	auto startTime1 = chrono::high_resolution_clock::now();
	insertSort(arr, 0, n, keyComparison1, recordMovement1);
	auto endTime1 = chrono::high_resolution_clock::now();

	int execTime1 = chrono::duration_cast<std::chrono::milliseconds>(endTime1 - startTime1).count();

	cout << "插入排序执行时间: " << execTime1 << "ms" << ", 关键字比较次数: " << keyComparison1 << "次" << ", 记录移动次数: " << recordMovement1 << "次" << endl;


	//选择排序
	int keyComparison2 = 0;
	int recordMovement2 = 0;

	auto startTime2 = chrono::high_resolution_clock::now();
	selectSort(arr, 0, n, keyComparison2, recordMovement2);
	auto endTime2 = chrono::high_resolution_clock::now();

	int execTime2 = chrono::duration_cast<std::chrono::milliseconds>(endTime2 - startTime2).count();

	cout << "选择排序执行时间: " << execTime2 << "ms" << ", 关键字比较次数: " << keyComparison2 << "次" << ", 记录移动次数: " << recordMovement2 << "次" << endl;


	//希尔排序
	int keyComparison3 = 0;
	int recordMovement3 = 0;

	auto startTime3 = chrono::high_resolution_clock::now();
	ShellSort(arr, 0, n, keyComparison3, recordMovement3);
	auto endTime3 = chrono::high_resolution_clock::now();

	int execTime3 = chrono::duration_cast<std::chrono::milliseconds>(endTime3 - startTime3).count();

	cout << "希尔排序执行时间: " << execTime3 << "ms" << ", 记录移动次数: " << recordMovement3 << "次" << endl;


	//归并排序
	int keyComparison4 = 0;
	int recordMovement4 = 0;

	auto startTime4 = chrono::high_resolution_clock::now();
	mergeSort(arr, 0, n-1, keyComparison4, recordMovement4);
	auto endTime4 = chrono::high_resolution_clock::now();

	int execTime4 = chrono::duration_cast<std::chrono::milliseconds>(endTime4 - startTime4).count();

	cout << "归并排序执行时间: " << execTime4 << "ms" << ", 关键字比较次数: " << keyComparison4 << "次" << ", 记录移动次数: " << recordMovement4 << "次" << endl;


	//快速排序
	int keyComparison5 = 0;
	int recordMovement5 = 0;

	auto startTime5 = chrono::high_resolution_clock::now();
	QuickSort(arr, 0, n, keyComparison5, recordMovement5);
	auto endTime5 = chrono::high_resolution_clock::now();

	int execTime5 = chrono::duration_cast<std::chrono::milliseconds>(endTime5 - startTime5).count();

	cout << "快速排序执行时间: " << execTime5 << "ms" << ", 关键字比较次数: " << keyComparison5 << "次" << ", 记录移动次数: " << recordMovement5<< "次" << endl;


	//堆排序
	int keyComparison6 = 0;
	int recordMovement6 = 0;

	auto startTime6 = chrono::high_resolution_clock::now();
	HeapSort(arr, 0, n, keyComparison6, recordMovement6);
	auto endTime6 = chrono::high_resolution_clock::now();

	int execTime6 = chrono::duration_cast<std::chrono::milliseconds>(endTime6 - startTime6).count();

	cout << "堆排序执行时间: " << execTime6 << "ms" << ", 关键字比较次数: " << keyComparison6 << "次" << ", 记录移动次数: " << recordMovement6<< "次" << endl;
	return 0;
}
