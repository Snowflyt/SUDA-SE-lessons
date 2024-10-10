#include <iostream>
#include <malloc.h>
#include<assert.h>
using namespace std;
#define SEQLIST_INIT_SIZE 8
#define INC_SIZE 3
typedef int ElemType;      //typedef������Ϊ���е��������ʹ���һ���µ����֡�ʹ���뷽���Ķ�����⣻

typedef struct SeqList {
	ElemType* base;		   //int���͵�ָ�룬ָ��˳���ռ�
	int capacity;		   //����    
	int size;              //��С
}SeqList;


bool Inc(SeqList* list) {
	ElemType* newbase = (ElemType*)realloc(list->base, sizeof(ElemType) * list->capacity + INC_SIZE);
	if (newbase == NULL) {
		cout << "����ռ�ʧ�ܣ��ڴ治��" << endl;
		return false;
	}
	list->base = newbase;
	list->capacity += INC_SIZE;
	return true;
}


void InitSetList(SeqList* list) {
	list->base = (ElemType*)malloc(sizeof(ElemType)* SEQLIST_INIT_SIZE);
	assert(list->base != NULL);                   //���ԣ���ָ֤�벻���գ�����ָ���κ�λ�ã�
	list->capacity = SEQLIST_INIT_SIZE;
	list->size = 0;
}

void push_back(SeqList* list, ElemType x) {           //�ѵ㣺���ĸ������(base)�� �ڱ��е��ĸ�λ�ò���(size)��
	if (list->size >= list->capacity && Inc(list) == false) {
		cout << "˳���ռ�����������β����������" << endl;
		return;
	}
	list->base[list->size] = x;                    //baseָ������Ա��±�Ϊsize�Ĵ�С
	list->size++;
}

void show_list(SeqList* list) {
	for (int i = 0; i < list->size; i++) {
		printf("%d", list->base[i]);
	}
	printf("\n");
}

void push_front(SeqList* list, ElemType x) {       //��ʱҪ�ƶ����ݣ�Ҫ�ƶ����ٸ��أ�
	if (list->size >= list->capacity && Inc(list) == false) {
		cout<<"˳���ռ�����������ͷ����������"<<endl;
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
		cout << "˳����ѿգ�����β��ɾ������" << endl;
		return;
	}
	list->size--;                                  //β��ɾ��ֻҪ��size����1���У���һ��Ҫ���߼���ɾ��
}

void pop_front(SeqList* list) {
	if (list->size == 0) {
		cout << "˳����ѿգ�����ͷ��ɾ������" << endl;
		return;
	}
	for (int i = 0; i < list->size - 1; i++) {
		list->base[i] = list->base[i + 1];
	}                                             //�ƶ����ݣ�ע��Ҫ���ƶ��ڶ������ݣ���ֹ������
	list->size--;
}

void insert_pos(SeqList* list, ElemType pos, ElemType Item) {
	//�ж�λ���Ƿ�Ϸ��������λ���ܷ����㹹�����Ա������
	if (pos > list->size || pos < 0 && Inc(list) == false) {
		cout << "�������ݵ�λ���ǷǷ��ģ����ܲ�������" << endl;;
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
		if (list->base[i] == key) {                  //�˷�����Ӧ����˳�����û���ظ�������
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
		cout << "ɾ�����ݵ�λ�ò��Ϸ�������ɾ������" << endl;
	}
	for (int i = pos; i < list->size - 1; i++) {
		list->base[i] = list->base[i + 1];
	}
	list->size--;
}

void delete_val(SeqList* list, ElemType key) {
	int pos = find(list, key);
	if (pos == -1) {
		cout << "Ҫɾ�������ݲ����ڣ�����ɾ������" << endl;;
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
	list->size = 0;                            //������ݣ����Ǵ��ڵģ����Լ���ִ����Ӳ���
}

void destroy(SeqList* list) {
	free(list->base);                          //��ָ����ָ��Ŀռ��ͷ�
	list->base = NULL;                         //ָ�����ָ���ַ0
	list->capacity = 0;                        //��������Ϊ0
	list->size = 0;                            //��С����Ϊ0
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
		printf("*[3] show_list  [4] pop_back   *\n");             //pop_backβ��ɾ��
		printf("*[5] pop_front  [6] insert_pos *\n");
		printf("*[7] find       [8] lenght     *\n");
		printf("*[9] delete_pos [10] delete_val*\n");
		printf("*[11] sort      [12] resver    *\n");
		printf("*[13] clear     [14] destroy   *\n");
		printf("*[0] quit_system               *\n");
		printf("********************************\n");
		printf("��ѡ��:>");
		scanf_s("%d", &select);
		if (select == 0)
			break;
		switch (select) {
		case 1:
			printf("������Ҫ�������(-1����)��>\n");     //��whileѭ�� ʡ��һ��һ���Ĳ���
			while (scanf_s("%d", &Item), Item != -1) {     //���ű��ʽ��ֻ������������
				push_back(&mylist, Item);
			}
			break;
		case 2:
			printf("������Ҫ�������(-1����)��>\n");
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
			printf("������Ҫ���������>\n");
			scanf_s("%d", &Item);
			printf("������Ҫ�����λ�ã�>\n");
			scanf_s("%d", &pos);
			insert_pos(&mylist, pos, Item);
			break;
		case 7:
			printf("������Ҫ���ҵ����ݣ�>\n");
			scanf_s("%d", &Item);
			pos = find(&mylist, Item);
			if (pos == -1) {
				printf("���ҵ�����%d��˳����в����ڡ�\n");
			}
			else
				printf("���ҵ�������˳����е�%d���±�λ�á�\n", Item);
			break;
		case 8:
			printf("˳���ĳ���Ϊ:>&d��\n", length(&mylist));
			break;
		case 9:
			printf("������Ҫɾ�����ݵ�λ��:>");
			scanf_s("%d", &pos);
			delete_pos(&mylist, pos);
			break;
		case 10:
			printf("������Ҫɾ��������:>");
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
			printf("�����ѡ��������������롣\n");
			break;
		}
	}
	return 0;
}

