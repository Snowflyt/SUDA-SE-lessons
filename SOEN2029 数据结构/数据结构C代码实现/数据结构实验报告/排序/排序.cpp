#include <iostream>
#include <vector>
#include <chrono>
#include <random>
#include <fstream>
using namespace std;


//���������ļ�
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


//��������
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

//ѡ������
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
	for (int i = left; i < right - 1; i++) {      //ѡ��Ĵ���
		int min_index = GetMinIndex(arr, i, right, keyComparison);
		swap(arr[i], arr[min_index]);
		recordMovement++;
	}
}


//ϣ������
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


//�鲢����
void merge(vector<int>& array, int left, int mid, int right, int&keyComparison, int& recordMovement)
{
	int n1 = mid - left + 1;
	int n2 = right - mid;

	// ������ʱ����
	vector<int> L(n1), R(n2);

	// �������ݵ���ʱ����
	for (int i = 0; i < n1; i++)
		L[i] = array[left + i];
	for (int j = 0; j < n2; j++)
		R[j] = array[mid + 1 + j];

	// �ϲ�������ʱ�����ԭ����(����ط�����������)
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

	// ��ʣ���Ԫ�ظ��ƻ�ԭ���飨����еĻ���
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


// ���鲢������
void mergeSort(vector<int>& arr, int left, int right, int &keyComparison, int& recordMovement)
{
	if (left < right) {  //���ָÿ��ֻʣһ����ʱ���ֹͣ�ָ�
		// Ϊ���������ʹ�� left + (right -left)/2 ������ (right + left)/2
		int mid = left + (right - left) / 2;

		// ����������й鲢����
		mergeSort(arr, left, mid, keyComparison, recordMovement);
		mergeSort(arr, mid + 1, right, keyComparison, recordMovement);

		// �ϲ�����������������
		merge(arr, left, mid, right, keyComparison, recordMovement);
	}
}



//��������
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
		QuickSort(arr, left, pos, keyComparison, recordMovement); //��������п���
		QuickSort(arr, pos + 1, right, keyComparison, recordMovement);  //��������п���
	}
}





//������
void _AdjustDown(vector<int>& arr, int left, int right, int adjust_pos, int &keyComparison, int& recordMovement) {
	int n = arr.size();
	int i = adjust_pos;
	int j = 2 * i + 1;

	while (j < n) {
		keyComparison++;
		if (j + 1 < n && arr[j] < arr[j + 1])  {       //�����жϵ�����ǧ����д�� ��Ȼ����Խ��
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
	//�������
	int n = arr.size();
	int pos = n / 2 - 1;
	while (pos >= left) {
		_AdjustDown(arr,left,right,pos,keyComparison,recordMovement);
		pos--;
	}

	//����
	int end = right - 1;
	while (end > left) {
		swap(arr[end], arr[left]);
		recordMovement++;
		_AdjustDown(arr, left, end, left, keyComparison, recordMovement);
		end--;
	}
}


//���Ժ���
int main() {
	int n = 2000;
	vector<int> arr;
	generateTestData(arr, n, false, false);

	//��������
	int keyComparison1 = 0;
	int recordMovement1 = 0;

	auto startTime1 = chrono::high_resolution_clock::now();
	insertSort(arr, 0, n, keyComparison1, recordMovement1);
	auto endTime1 = chrono::high_resolution_clock::now();

	int execTime1 = chrono::duration_cast<std::chrono::milliseconds>(endTime1 - startTime1).count();

	cout << "��������ִ��ʱ��: " << execTime1 << "ms" << ", �ؼ��ֱȽϴ���: " << keyComparison1 << "��" << ", ��¼�ƶ�����: " << recordMovement1 << "��" << endl;


	//ѡ������
	int keyComparison2 = 0;
	int recordMovement2 = 0;

	auto startTime2 = chrono::high_resolution_clock::now();
	selectSort(arr, 0, n, keyComparison2, recordMovement2);
	auto endTime2 = chrono::high_resolution_clock::now();

	int execTime2 = chrono::duration_cast<std::chrono::milliseconds>(endTime2 - startTime2).count();

	cout << "ѡ������ִ��ʱ��: " << execTime2 << "ms" << ", �ؼ��ֱȽϴ���: " << keyComparison2 << "��" << ", ��¼�ƶ�����: " << recordMovement2 << "��" << endl;


	//ϣ������
	int keyComparison3 = 0;
	int recordMovement3 = 0;

	auto startTime3 = chrono::high_resolution_clock::now();
	ShellSort(arr, 0, n, keyComparison3, recordMovement3);
	auto endTime3 = chrono::high_resolution_clock::now();

	int execTime3 = chrono::duration_cast<std::chrono::milliseconds>(endTime3 - startTime3).count();

	cout << "ϣ������ִ��ʱ��: " << execTime3 << "ms" << ", ��¼�ƶ�����: " << recordMovement3 << "��" << endl;


	//�鲢����
	int keyComparison4 = 0;
	int recordMovement4 = 0;

	auto startTime4 = chrono::high_resolution_clock::now();
	mergeSort(arr, 0, n-1, keyComparison4, recordMovement4);
	auto endTime4 = chrono::high_resolution_clock::now();

	int execTime4 = chrono::duration_cast<std::chrono::milliseconds>(endTime4 - startTime4).count();

	cout << "�鲢����ִ��ʱ��: " << execTime4 << "ms" << ", �ؼ��ֱȽϴ���: " << keyComparison4 << "��" << ", ��¼�ƶ�����: " << recordMovement4 << "��" << endl;


	//��������
	int keyComparison5 = 0;
	int recordMovement5 = 0;

	auto startTime5 = chrono::high_resolution_clock::now();
	QuickSort(arr, 0, n, keyComparison5, recordMovement5);
	auto endTime5 = chrono::high_resolution_clock::now();

	int execTime5 = chrono::duration_cast<std::chrono::milliseconds>(endTime5 - startTime5).count();

	cout << "��������ִ��ʱ��: " << execTime5 << "ms" << ", �ؼ��ֱȽϴ���: " << keyComparison5 << "��" << ", ��¼�ƶ�����: " << recordMovement5<< "��" << endl;


	//������
	int keyComparison6 = 0;
	int recordMovement6 = 0;

	auto startTime6 = chrono::high_resolution_clock::now();
	HeapSort(arr, 0, n, keyComparison6, recordMovement6);
	auto endTime6 = chrono::high_resolution_clock::now();

	int execTime6 = chrono::duration_cast<std::chrono::milliseconds>(endTime6 - startTime6).count();

	cout << "������ִ��ʱ��: " << execTime6 << "ms" << ", �ؼ��ֱȽϴ���: " << keyComparison6 << "��" << ", ��¼�ƶ�����: " << recordMovement6<< "��" << endl;
	return 0;
}
