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
	BinTreeNode *root;        //二叉树的根 用结点类型的指针表示
	ElemType refvalue;        //stop flag
}BinTree;


//定义二叉树 实际上是一个递归的概念
void InitBinTree(BinTree &bt, ElemType ref) {
	bt.root = nullptr;
	bt.refvalue = ref;
}


//构造二叉树
//构造序列为：ABC##DE##F##G#H##

void CreatBinTree_1(BinTree&bt, BinTreeNode*& t) {   //重载函数   要采用引用的方式传递根结点
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


void CreatBinTree_1(BinTree& bt) {      //明面上的函数  
	CreatBinTree_1(bt, bt.root);        //内部函数（真实实现二叉树创建的函数）
}


//先序遍历
void PreOrder(BinTreeNode*& t) {
	if (t != nullptr) {
		cout << t->data;
		PreOrder(t->leftChild);          //先遍历左树
		PreOrder(t->rightChild);         //后遍历右树
	}
}
void PreOrder(BinTree& bt) {
	PreOrder(bt.root);
}


//中序遍历
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


//后序遍历
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


//层次遍历(一层一层，每一层从左到右）
//借助队列，先将根结点入队，队不空出队，再将其左右结点（左右结点不为空的情况下）入队，以此类推
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


//求二叉树的宽度
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


//求二叉树的深度
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


//统计度数为2的结点个数
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

//统计度数为1的结点个数
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


//统计度数为0的结点个数
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

			cout << "请选择：";
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
				cout << "树的高度是：" << Height(mytree) << endl;
				break;
			case 8:
				cout << "树的宽度是：" << Width(mytree) << endl;
				break;
			case 9:
				cout << "度数为2的结点总数为：" << findDegreeTwoNodes(mytree, count2) << endl;
				break;
			case 10:
				cout << "度数为1的结点总数为：" << findDegreeOneNodes(mytree, count1) << endl;
				break;
			case 11:
				cout << "度数为0的结点总数为：" << findDegreeNoneNodes(mytree, count0) << endl;
				break;

			default:
				printf("输入命令错误，请重新输入。\n");
				break;
			}
			cout << endl;
		}
	}