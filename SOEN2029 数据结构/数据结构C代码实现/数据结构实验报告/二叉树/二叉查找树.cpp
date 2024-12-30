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
		//申请结点
		BSTNode*s = (BSTNode*)malloc(sizeof(BSTNode));
		s->data = x;
		s->leftChild = s->rightChild = NULL;

		//插入节点
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


//先序遍历
void PreOrder(BST t) {
	if (t != nullptr) {
		cout << t->data << " ";
		PreOrder(t->leftChild);          //先遍历左树
		PreOrder(t->rightChild);         //后遍历右树
	}
}



//中序遍历
void InOrder(BST t) {
	if (t != NULL) {
		InOrder(t->leftChild);
		cout << t->data << " ";
		InOrder(t->rightChild);
	}
}


//后序遍历
void PostOrder(BST t) {
	if (t != nullptr) {
		PostOrder(t->leftChild);
		PostOrder(t->rightChild);
		cout << t->data << " ";
	}
}



//层次遍历(一层一层，每一层从左到右）
//借助队列，先将根结点入队，队不空出队，再将其左右结点（左右结点不为空的情况下）入队，以此类推
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



//求二叉树的宽度
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



//求二叉树的深度
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




//统计度数为2的结点个数
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



//统计度数为1的结点个数
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



//统计度数为0的结点个数
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
		cout << "二叉查找树中找到该数据" << endl;
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
		//既不大于也不小于
		//说明找到了，开始进行删除操作
		if (p->leftChild == NULL && p->rightChild == NULL) {
			free(p);
			t = NULL;   //这句不能少
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
			//具有左右子树结点
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

			cout << "请选择：";
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
				cout << "树的高度是：" << Height(t) << endl;
				cout << endl;
				break;
			case 7:
				cout << "树的宽度是：" << Width(t) << endl;
				break;
			case 8:
				cout << "度数为2的结点总数为：" << findDegreeTwoNodes(t, count2) << endl;
				break;
			case 9:
				cout << "度数为1的结点总数为：" << findDegreeOneNodes(t, count1) << endl;
				break;
			case 10:
				cout << "度数为0的结点总数为：" << findDegreeNoneNodes(t, count0) << endl;
				break;
			case 11:
				cout << "请输入要删除的数据：";
				cin >> x;
				RemoveBST(t, x);
				break;

			case 12:
				cout << "请输入要查找的数据：";
				cin >> y;
				Search(t, y);
			}
			cout << endl;
		}
	}