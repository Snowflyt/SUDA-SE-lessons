#include <stdio.h>
#include <malloc.h>
#include <assert.h>

typedef int ElemType;

typedef struct Node {
	ElemType data;
	struct Node* prio;
	struct Node* next;
}Node, *PNode;

typedef struct List {
	PNode first;
	PNode last;
	int size;
}List;

void InitDList(List *list) {
	PNode s = (PNode)malloc(sizeof(Node));
	assert(s != NULL);
	list->first = list->last = s;
	list->last->next = NULL;         //����ָ��Ϊ��
	list->first->prio = NULL;        //ǰ��ָ��Ϊ��
	list->size = 0;
}

PNode _buynode(ElemType x) {
	PNode s = (PNode)malloc(sizeof(Node));
	assert(s != NULL);
	s->data = x;
	s->next = s->prio = NULL;            //����ǰ������ͬ ���ﹺ�����ʱ��Ҫ����ǰ���ͺ���
	return s;
}

void push_back(List* list, ElemType x) {
	PNode s = _buynode(x);
	s->prio = list->last;
	list->last->next = s;
	list->last = s;
	list->size++;
}

void push_front(List* list, ElemType x) {
	PNode s = _buynode(x);

	if (list->first == list->last) {
		list->last = s;
	}
	//�����Ϻ�����ٶϿ� �޸��ĸ�ָ��
	else {
		s->next = list->first->next;
		s->next->prio = s;
	}
	s->prio = list->first;
	list->first->next = s;
	list->size++;
}

void show_list(List* list) {
	Node* p = list->first->next;
	while (p != NULL) {                    //��ѭ�������whileѭ����ֹ����Ϊ��ָ��
		printf("%d-->", p->data);
		p = p->next;
	}
	printf("Nul.\n");
}

void pop_back(List* list) {
	if (list->size == 0) {
		return;
	}
	PNode p = list->first;
	while (p->next != list->last) {
		p = p->next;
	}
	free(list->last);
	list->last = p;
	list->last->next = NULL;
	list->size--;
}

void pop_front(List* list) {
	if (list->size == 0) {
		return;
	}

	PNode p = list->first->next;

	if (list->first->next == list->last) {
		list->last = list->first;
		list->last->next = NULL;
	}
	else {
		list->first->next = p->next;
		p->next->prio = list->first;
	}
	free(p);
	list->size--;
}
void insert_val(List* list, ElemType x) {
	PNode p = list->first;                         //��������Ҫ��ͷ��㿪ʼ����
	while (p->next != NULL && p->next->data < x) {
		p = p->next;
	}
	if (p->next == NULL) {
		push_back(list, x);
	}
	else {
		PNode s = _buynode(x);
		s->next = p->next;
		s->next->prio = s;
		s->prio = p;
		p->next = s;
		list->size++;
	}
}

PNode find(List* list, ElemType key) {
	PNode p = list->first->next;            //Ѱ��������ӵ�һ�������ݵĽ�㿪ʼ
	while (p != NULL && p->data != key) {    //�������������Խ���˳��
		p = p->next;
	}
	return p;           //��һ��������������������������
}

int length(List* list) {
	return list->size;
}

void delete_val(List* list, ElemType key) {
	if (list->size == 0) { return; }
	PNode p = find(list, key);
	if (p == NULL) {
		printf("Ҫɾ����ֵ������.\n");
		return;
	}
	//�뵥������ͬ���ǲ���Ҫ�ú�������ݸ���Ҫɾ��������

	if (p == list->last) {
		list->last = p->prio;
		list->last->next = NULL;
		/*free(p);*/
	}
	else {
		p->prio->next = p->next;
		p->next->prio = p->prio;
		/*free(p);*/
	}
	free(p);
	list->size--;
}

void sort(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}
	PNode s = list->first->next;
	PNode q = s->next;
	list->last = s;
	list->last->next = NULL;

	while (q != NULL) {
		s = q;
		q = q->next;

		PNode p = list->first;                         //��������Ҫ��ͷ��㿪ʼ����
		while (p->next != NULL && p->next->data < s->data) {
			p = p->next;
		}
		if (p->next == NULL) {
			//s����Ѿ����ڣ�����β��ķ�������Ҫ�Լ����±�д
			s->next = NULL;
			s->prio = list->last;
			list->last->next = s;
			list->last = s;
		}
		else {
			//������� �޸��ĸ�ָ��
			s->next = p->next;
			s->next->prio = s;
			s->prio = p;
			p->next = s;
		}
	}
}

void resver(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}
	PNode p = list->first->next;
	PNode q = p->next;

	list->last = p;
	list->last->next = NULL;

	while (q != NULL) {
		p = q;
		q = q->next;

		p->next = list->first->next;
		p->next->prio = p;
		p->prio = list->first;
		list->first->next = p;
	}
}

void clear(List* list) {
	//����ͷɾ ֱ��ɾ�����н��
	if (list->size == 0) {
		return;
	}
	PNode p = list->first->next;
	while (p != NULL) {
		if (p == list->last) {          //�ж��Ƿ�ɾ����Ϊ���һ�����
			list->last = list->first;
			list->last->next = NULL;
		}
		else {  //����ͷɾ����
			p->next->prio = list->first;
			list->first->next = p->next;
		}
		free(p);
		p = list->first->next;
		list->size--;
	}
}


void destroy(List* list) {
	clear(list);
	free(list->first);
	list->first = list->last = NULL;
}

void main() {
	List mylist;
	InitDList(&mylist);
	int select = 1;
	int Item;
	PNode p;
	while (select) {
		printf("**********************************\n");
		printf("*[1]push_back     [2]push_front  *\n");
		printf("*[3]show_list     [4]pop_back    *\n");
		printf("*[5]pop_front     [6]insert_val  *\n");
		printf("*[7]find          [8]length      *\n");
		printf("*[9]delete_val    [10]sort       *\n");
		printf("*[11]resver       [12]clear      *\n");
		printf("*[13]destroy      [0]quit_system *\n");
		printf("**********************************\n");
		printf("��ѡ��>");
		scanf_s("%d", &select);

		if (select == 0) {
			break;
		}

		switch (select) {
		case 1:
			printf("������Ҫ��������ݣ�-1������:>");
			while (scanf_s("%d", &Item), Item != -1) {
				push_back(&mylist, Item);
			}
			break;
		case 2:
			printf("������Ҫ��������ݣ�-1������:>");
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
			printf("������Ҫ���������:>");
			scanf_s("%d", &Item);
			insert_val(&mylist, Item);
			break;
		case 7:
			printf("������Ҫ���ҵ�����:>");
			scanf_s("%d", &Item);
			p = find(&mylist, Item);
			if (p == NULL) {
				printf("���ҵ������������в�����.\n");
			}
			break;
		case 8:
			printf("������ĳ���Ϊ:> %d \n", length(&mylist));
			break;
		case 9:
			printf("������Ҫɾ����ֵ:>");
			scanf_s("%d", &Item);
			delete_val(&mylist, Item);
			break;
		case 10:
			sort(&mylist);
			break;
		case 11:
			resver(&mylist);
			break;
		case 12:
			clear(&mylist);
			break;
		case 13:
			destroy(&mylist);
			break;
		default:
			printf("��������������������롣\n");
			break;
		}
	}
}