#include <iostream>
#include<malloc.h>
#include<assert.h>
#include<queue>
using namespace std;

#define T int

typedef struct BSTNode {
	T data;
	struct BSTNode*leftChild;
	struct BSTNode*rightChild;
}BSTNode;

typedef BSTNode* BST;

void InsertBST(BST &t, T x) {
	if (t == NULL) {
		//������
		BSTNode*s = (BSTNode*)malloc(sizeof(BSTNode));
		s->data = x;
		s->leftChild = s->rightChild = NULL;

		//����ڵ�
		t = s;
		return;
	}

	else if (x < t->data) {
		InsertBST(t->leftChild, x);
	}
	else if (x > t->data) {
		InsertBST(t->rightChild, x);
	}
}


//�������
void PreOrder(BST t) {
	if (t != nullptr) {
		cout << t->data << " ";
		PreOrder(t->leftChild);          //�ȱ�������
		PreOrder(t->rightChild);         //���������
	}
}



//�������
void InOrder(BST t) {
	if (t != NULL) {
		InOrder(t->leftChild);
		cout << t->data << " ";
		InOrder(t->rightChild);
	}
}


//�������
void PostOrder(BST t) {
	if (t != nullptr) {
		PostOrder(t->leftChild);
		PostOrder(t->rightChild);
		cout << t->data << " ";
	}
}



//��α���(һ��һ�㣬ÿһ������ң�
//�������У��Ƚ��������ӣ��Ӳ��ճ��ӣ��ٽ������ҽ�㣨���ҽ�㲻Ϊ�յ�����£���ӣ��Դ�����
void LevelOrder(BST t) {
	queue<BST> Q;
	if (t == NULL) {
		return;
	}
	Q.push(t);
	while (!Q.empty()) {
		BST p = Q.front();
		cout << p->data << " ";
		Q.pop();
		if (p->leftChild != nullptr)
			Q.push(p->leftChild);
		if (p->rightChild != nullptr)
			Q.push(p->rightChild);
	}
}



//��������Ŀ��
int Width(BST t) {
	if (t == NULL) {
		return 0;
	}
	queue<BST> Q;
	Q.push(t);
	int width = 0;
	while (!Q.empty()) {
		int size = Q.size();
		width = max(width, size);

		for (int i = 0; i < size; i++) {
			BST p = Q.front();
			Q.pop();
			if (p->leftChild != nullptr)
				Q.push(p->leftChild);
			if (p->rightChild != nullptr)
				Q.push(p->rightChild);
		}
	}
	return width;
}



//������������
int Height(BST t) {
	if (t == nullptr) {
		return 0;
	}
	else {
		int left_height = Height(t->leftChild);
		int right_height = Height(t->rightChild);
		return (left_height > right_height ? left_height : right_height) + 1;
	}
}




//ͳ�ƶ���Ϊ2�Ľ�����
int findDegreeTwoNodes(BST t,int &count) {
	if (t == NULL) {
		return 0;
	}

	if (t->leftChild != NULL && t->rightChild != NULL) {
		count++;
	}

	findDegreeTwoNodes(t->leftChild, count);
	findDegreeTwoNodes(t->rightChild, count);
	return count;
}



//ͳ�ƶ���Ϊ1�Ľ�����
int findDegreeOneNodes(BST t, int &count) {
	if (t == NULL) {
		return 0;
	}

	if ((t->leftChild != NULL && t->rightChild == NULL)||(t->leftChild == NULL && t->rightChild != NULL)) {
		count++;
	}

	findDegreeOneNodes(t->leftChild, count);
	findDegreeOneNodes(t->rightChild, count);
	return count;
}



//ͳ�ƶ���Ϊ0�Ľ�����
	int findDegreeNoneNodes(BST t, int &count) {
		if (t == NULL) {
			return 0;
		}

		if (t->leftChild == NULL && t->rightChild == NULL) {
			count++;
		}

		findDegreeNoneNodes(t->leftChild, count);
		findDegreeNoneNodes(t->rightChild, count);
		return count;
	}

	
BST Search(BST t, T key) {
	if (t == NULL || t->data == key) {
		cout << "������������ҵ�������" << endl;
		return t;
	}
	if (key < t->data) {
		Search(t->leftChild, key);
	}
	else {
		Search(t->rightChild, key);
	}
}


void RemoveBST(BST&t, T key) {
	if (t == NULL) {
		return;
	}
	BSTNode*p = t;
	if (key < p->data) {
		RemoveBST(t->leftChild, key);
	}
	else if (key > p->data) {
		RemoveBST(t->rightChild, key);
	}
	else {
		//�Ȳ�����Ҳ��С��
		//˵���ҵ��ˣ���ʼ����ɾ������
		if (p->leftChild == NULL && p->rightChild == NULL) {
			free(p);
			t = NULL;   //��䲻����
		}
		else if (p->leftChild != NULL && p->rightChild == NULL) {
			t = p->leftChild;
			free(p);
		}
		else if (p->leftChild == NULL && p->rightChild != NULL) {
			t = p->rightChild;
			free(p);
		}
		else {
			//���������������
			p = t->leftChild;
			while (p->rightChild != NULL) {
				p = p->rightChild;
			}
			t->data = p->data;
			RemoveBST(t->leftChild, p->data);
		}


	}
}



	void main() {
		BST t=NULL;
		int select = 1;
		T x;
		T y;
		int count0 = 0, count1 = 0, count2 = 0;
		vector<int>ar = { 16,3,7,11,9,26,18,14,15 };
		int n = ar.size();
		while (select) {
			cout << "[1]InsertBST              [2]PreOrder  " << endl;
			cout << "[3]InOrder                [4]PostOrder "<<endl;
			cout << "[5]LevelOrder             [6]height        " << endl;
			cout << "[7] width                 [8]findDegreeTwoNodes" << endl;
			cout << "[9]findDegreeOneNodes     [10]findDegreeNoneNodes" << endl;
			cout << "[11]RemoveBST             [12] Search" << endl;
			cout << "[13]quit_system" << endl;

			cout << "��ѡ��";
			cin >> select;
			if (select == 13) {
				break;
			}

			switch (select) {
			case 1:
				for (int i = 0; i < n; i++) {
					InsertBST(t, ar[i]);
				}
				break;
			case 2:
				PreOrder(t);
				cout << endl;
				break;
			case 3:
				InOrder(t);
				cout << endl;
				break;
			case 4:
				PostOrder(t);
				cout << endl;
				break;
			case 5:
				LevelOrder(t);
				cout << endl;
				break;
			case 6:
				cout << "���ĸ߶��ǣ�" << Height(t) << endl;
				cout << endl;
				break;
			case 7:
				cout << "���Ŀ���ǣ�" << Width(t) << endl;
				break;
			case 8:
				cout << "����Ϊ2�Ľ������Ϊ��" << findDegreeTwoNodes(t, count2) << endl;
				break;
			case 9:
				cout << "����Ϊ1�Ľ������Ϊ��" << findDegreeOneNodes(t, count1) << endl;
				break;
			case 10:
				cout << "����Ϊ0�Ľ������Ϊ��" << findDegreeNoneNodes(t, count0) << endl;
				break;
			case 11:
				cout << "������Ҫɾ�������ݣ�";
				cin >> x;
				RemoveBST(t, x);
				break;

			case 12:
				cout << "������Ҫ���ҵ����ݣ�";
				cin >> y;
				Search(t, y);
			}
			cout << endl;
		}
	}