#include <iostream>
#include <malloc.h>
#include<assert.h>
using namespace std;
#define SEQLIST_INIT_SIZE 8
#define INC_SIZE 3
typedef int ElemType;      //typedef作用是为现有的数据类型创建一个新的名字。使代码方便阅读和理解；

typedef struct SeqList {
	ElemType* base;		   //int类型的指针，指向顺序表空间
	int capacity;		   //容量    
	int size;              //大小
}SeqList;


bool Inc(SeqList* list) {
	ElemType* newbase = (ElemType*)realloc(list->base, sizeof(ElemType) * list->capacity + INC_SIZE);
	if (newbase == NULL) {
		cout << "增配空间失败，内存不足" << endl;
		return false;
	}
	list->base = newbase;
	list->capacity += INC_SIZE;
	return true;
}


void InitSetList(SeqList* list) {
	list->base = (ElemType*)malloc(sizeof(ElemType)* SEQLIST_INIT_SIZE);
	assert(list->base != NULL);                   //断言，保证指针不悬空（即不指向任何位置）
	list->capacity = SEQLIST_INIT_SIZE;
	list->size = 0;
}

void push_back(SeqList* list, ElemType x) {           //难点：在哪个表插入(base)？ 在表中的哪个位置插入(size)？
	if (list->size >= list->capacity && Inc(list) == false) {
		cout << "顺序表空间已满，不能尾部插入数据" << endl;
		return;
	}
	list->base[list->size] = x;                    //base指向的线性表，下标为size的大小
	list->size++;
}

void show_list(SeqList* list) {
	for (int i = 0; i < list->size; i++) {
		printf("%d", list->base[i]);
	}
	printf("\n");
}

void push_front(SeqList* list, ElemType x) {       //此时要移动数据，要移动多少个呢？
	if (list->size >= list->capacity && Inc(list) == false) {
		cout<<"顺序表空间已满，不能头部插入数据"<<endl;
		return;
	}
	for (int i = list->size; i > 0; --i) {
		list->base[i] = list->base[i - 1];
	}
	list->base[0] = x;
	list->size++;
}

void pop_back(SeqList* list) {
	if (list->size == 0) {
		cout << "顺序表已空，不能尾部删除数据" << endl;
		return;
	}
	list->size--;                                  //尾部删除只要将size减掉1就行；不一定要从逻辑里删掉
}

void pop_front(SeqList* list) {
	if (list->size == 0) {
		cout << "顺序表已空，不能头部删除数据" << endl;
		return;
	}
	for (int i = 0; i < list->size - 1; i++) {
		list->base[i] = list->base[i + 1];
	}                                             //移动数据，注意要先移动第二个数据，防止被覆盖
	list->size--;
}

void insert_pos(SeqList* list, ElemType pos, ElemType Item) {
	//判断位置是否合法，插入的位置能否满足构成线性表的条件
	if (pos > list->size || pos < 0 && Inc(list) == false) {
		cout << "插入数据的位置是非法的，不能插入数据" << endl;;
		return;
	}
	for (int i = list->size; i > pos; i--) {
		list->base[i] = list->base[i - 1];
	}
	list->base[pos] = Item;
	list->size++;
}

int find(SeqList* list, ElemType key) {
	for (int i = 0; i < list->size; i++) {
		if (list->base[i] == key) {                  //此方法对应的是顺序表里没有重复的数据
			return i;
		}
	}
	return -1;
}

int length(SeqList* list) {
	return list->size;
}

void delete_pos(SeqList* list, ElemType pos) {
	if (pos < 0 || pos >= list->size) {
		cout << "删除数据的位置不合法，不能删除数据" << endl;
	}
	for (int i = pos; i < list->size - 1; i++) {
		list->base[i] = list->base[i + 1];
	}
	list->size--;
}

void delete_val(SeqList* list, ElemType key) {
	int pos = find(list, key);
	if (pos == -1) {
		cout << "要删除的数据不存在，不能删除数据" << endl;;
		return;
	}
	delete_pos(list, pos);
	list->size--;
}

void sort(SeqList* list) {
	for (int i = 0; i < list->size - 1; i++) {
		for (int j = 0; j < list->size - i - 1; j++) {
			if (list->base[j] > list->base[j + 1]) {
				ElemType tmp = list->base[j];
				list->base[j] = list->base[j + 1];
				list->base[j + 1] = tmp;
			}
		}
	}
}

void resver(SeqList* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}
	ElemType low = 0;
	ElemType high = list->size - 1;
	ElemType tmp;
	while (low < high) {
		tmp = list->base[low];
		list->base[low] = list->base[high];
		list->base[high] = tmp;
		low++;
		high--;
	}
}

void clear(SeqList* list) {
	list->size = 0;                            //清除数据，表是存在的，可以继续执行添加操作
}

void destroy(SeqList* list) {
	free(list->base);                          //将指针所指向的空间释放
	list->base = NULL;                         //指针变量指向地址0
	list->capacity = 0;                        //容量设置为0
	list->size = 0;                            //大小设置为0
}

int main() {
	SeqList mylist;
	InitSetList(&mylist);
	ElemType Item;
	int pos;
	int select = 1;
	while (select) {
		printf("********************************\n");
		printf("*[1] push_back  [2] push_front *\n");
		printf("*[3] show_list  [4] pop_back   *\n");             //pop_back尾部删除
		printf("*[5] pop_front  [6] insert_pos *\n");
		printf("*[7] find       [8] lenght     *\n");
		printf("*[9] delete_pos [10] delete_val*\n");
		printf("*[11] sort      [12] resver    *\n");
		printf("*[13] clear     [14] destroy   *\n");
		printf("*[0] quit_system               *\n");
		printf("********************************\n");
		printf("请选择:>");
		scanf_s("%d", &select);
		if (select == 0)
			break;
		switch (select) {
		case 1:
			printf("请输入要插入的数(-1结束)：>\n");     //用while循环 省的一个一个的插入
			while (scanf_s("%d", &Item), Item != -1) {     //逗号表达式，只看最后面的条件
				push_back(&mylist, Item);
			}
			break;
		case 2:
			printf("请输入要插入的数(-1结束)：>\n");
			while (scanf_s("%d", &Item), Item != -1) {
				push_front(&mylist, Item);
			}
			break;
		case 3:
			show_list(&mylist);
			break;
		case 4:
			pop_back(&mylist);
			break;
		case 5:
			pop_front(&mylist);
			break;
		case 6:
			printf("请输入要插入的数：>\n");
			scanf_s("%d", &Item);
			printf("请输入要插入的位置：>\n");
			scanf_s("%d", &pos);
			insert_pos(&mylist, pos, Item);
			break;
		case 7:
			printf("请输入要查找的数据：>\n");
			scanf_s("%d", &Item);
			pos = find(&mylist, Item);
			if (pos == -1) {
				printf("查找的数据%d在顺序表中不存在。\n");
			}
			else
				printf("查找的数据在顺序表中的%d的下标位置。\n", Item);
			break;
		case 8:
			printf("顺序表的长度为:>&d。\n", length(&mylist));
			break;
		case 9:
			printf("请输入要删除数据的位置:>");
			scanf_s("%d", &pos);
			delete_pos(&mylist, pos);
			break;
		case 10:
			printf("请输入要删除的数据:>");
			scanf_s("%d", &Item);
			delete_val(&mylist, Item);
			break;
		case 11:
			sort(&mylist);
			break;
		case 12:
			resver(&mylist);
			break;
		case 13:
			clear(&mylist);
			break;
		case 14:
			destroy(&mylist);
			break;
		default:
			printf("输入的选择错误，请重新输入。\n");
			break;
		}
	}
	return 0;
}

