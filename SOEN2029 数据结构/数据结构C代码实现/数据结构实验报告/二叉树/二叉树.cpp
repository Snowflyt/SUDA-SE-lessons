#include <iostream>
#include<malloc.h>
#include<assert.h>
#include<queue>
using namespace std;

#define ElemType char

typedef struct BinTreeNode {
	ElemType data;
	struct BinTreeNode *leftChild;
	struct BinTreeNode *rightChild;
}BinTreeNode;

typedef struct BinTree {
	BinTreeNode *root;        //�������ĸ� �ý�����͵�ָ���ʾ
	ElemType refvalue;        //stop flag
}BinTree;


//��������� ʵ������һ���ݹ�ĸ���
void InitBinTree(BinTree &bt, ElemType ref) {
	bt.root = nullptr;
	bt.refvalue = ref;
}


//���������
//��������Ϊ��ABC##DE##F##G#H##

void CreatBinTree_1(BinTree&bt, BinTreeNode*& t) {   //���غ���   Ҫ�������õķ�ʽ���ݸ����
	ElemType Item;
	cin >> Item;
	if (Item == bt.refvalue) {
		t = nullptr;
	}
	else {
		t = (BinTreeNode*)malloc(sizeof(BinTreeNode));
		assert(t != nullptr);
		t->data = Item;
		CreatBinTree_1(bt, t->leftChild);
		CreatBinTree_1(bt, t->rightChild);
	}
}


void CreatBinTree_1(BinTree& bt) {      //�����ϵĺ���  
	CreatBinTree_1(bt, bt.root);        //�ڲ���������ʵʵ�ֶ����������ĺ�����
}


//�������
void PreOrder(BinTreeNode*& t) {
	if (t != nullptr) {
		cout << t->data;
		PreOrder(t->leftChild);          //�ȱ�������
		PreOrder(t->rightChild);         //���������
	}
}
void PreOrder(BinTree& bt) {
	PreOrder(bt.root);
}


//�������
void InOrder(BinTreeNode*& t) {
	if (t != nullptr) {
		InOrder(t->leftChild);
		cout << t->data;
		InOrder(t->rightChild);
	}
}
void InOrder(BinTree& bt) {
	InOrder(bt.root);
}


//�������
void PostOrder(BinTreeNode*& t) {
	if (t != nullptr) {
		PostOrder(t->leftChild);
		PostOrder(t->rightChild);
		cout << t->data;
	}
}
void PostOrder(BinTree& bt) {
	PostOrder(bt.root);
}


//��α���(һ��һ�㣬ÿһ������ң�
//�������У��Ƚ��������ӣ��Ӳ��ճ��ӣ��ٽ������ҽ�㣨���ҽ�㲻Ϊ�յ�����£���ӣ��Դ�����
void LevelOrder(BinTreeNode* t) {
	queue<BinTreeNode*> Q;
	if (t == NULL) {
		return;
	}
	Q.push(t);
	while (!Q.empty()) {
		BinTreeNode*p = Q.front();
		cout << p->data;
		Q.pop();
		if (p->leftChild != nullptr)
			Q.push(p->leftChild);
		if (p->rightChild != nullptr)
			Q.push(p->rightChild);
	}
}
void LevelOrder(BinTree bt) {
	LevelOrder(bt.root);
}


//��������Ŀ��
int Width(BinTreeNode* t) {
	if (t == NULL) {
		return 0;
	}
	queue<BinTreeNode*> Q;
	Q.push(t);
	int width = 0;
	while (!Q.empty()) {
		int size = Q.size();
		width = max(width, size);

		for (int i = 0; i < size; i++) {
			BinTreeNode*p = Q.front();
			Q.pop();
			if (p->leftChild != nullptr)
				Q.push(p->leftChild);
			if (p->rightChild != nullptr)
				Q.push(p->rightChild);
		}
	}
	return width;
}

int Width(BinTree &bt) {
	return Width(bt.root);
}


//������������
int Height(BinTreeNode* t) {
	if (t == nullptr) {
		return 0;
	}
	else {
		int left_height = Height(t->leftChild);
		int right_height = Height(t->rightChild);
		return (left_height > right_height ? left_height : right_height) + 1;
	}
}

int Height(BinTree &bt) {
	return Height(bt.root);
}


//ͳ�ƶ���Ϊ2�Ľ�����
int findDegreeTwoNodes(BinTreeNode* t,int &count) {
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

int findDegreeTwoNodes(BinTree bt,int &count) {
	return findDegreeTwoNodes(bt.root, count);
}

//ͳ�ƶ���Ϊ1�Ľ�����
int findDegreeOneNodes(BinTreeNode* t, int &count) {
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

int findDegreeOneNodes(BinTree bt, int &count) {
	return findDegreeOneNodes(bt.root, count);
}


//ͳ�ƶ���Ϊ0�Ľ�����
	int findDegreeNoneNodes(BinTreeNode* t, int &count) {
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

	int findDegreeNoneNodes(BinTree bt, int &count) {
		return findDegreeNoneNodes(bt.root, count);
	}




	void main() {
		BinTree mytree;
		int select = 1;
		int count0 = 0, count1 = 0, count2 = 0;
		while (select) {
			cout << "[1]InitBinTree          [2]CreatBinTree" << endl;
			cout << "[3]PreOrder             [4]InOrder   " << endl;
			cout << "[5]PostOrder            [6]LevelOrder "<<endl;
			cout << "[7]height               [8]width      " << endl;
			cout << "[9]findDegreeTwoNodes   [10]findDegreeOneNodes" << endl;
			cout << "[11]findDegreeNoneNodes [12]quit_system " << endl;

			cout << "��ѡ��";
			cin >> select;
			if (select == 12) {
				break;
			}

			switch (select) {
			case 1:
				InitBinTree(mytree, '#');
				break;
			case 2:
				CreatBinTree_1(mytree);
				break;
			case 3:
				PreOrder(mytree);
				cout << endl;
				break;
			case 4:
				InOrder(mytree);
				cout << endl;
				break;
			case 5:
				PostOrder(mytree);
				cout << endl;
				break;
			case 6:
				LevelOrder(mytree);
				cout << endl;
				break;
			case 7:
				cout << "���ĸ߶��ǣ�" << Height(mytree) << endl;
				break;
			case 8:
				cout << "���Ŀ���ǣ�" << Width(mytree) << endl;
				break;
			case 9:
				cout << "����Ϊ2�Ľ������Ϊ��" << findDegreeTwoNodes(mytree, count2) << endl;
				break;
			case 10:
				cout << "����Ϊ1�Ľ������Ϊ��" << findDegreeOneNodes(mytree, count1) << endl;
				break;
			case 11:
				cout << "����Ϊ0�Ľ������Ϊ��" << findDegreeNoneNodes(mytree, count0) << endl;
				break;

			default:
				printf("��������������������롣\n");
				break;
			}
			cout << endl;
		}
	}