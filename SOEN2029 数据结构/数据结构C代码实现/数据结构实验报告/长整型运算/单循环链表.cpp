#include <stdio.h>
#include <malloc.h>
#include <assert.h>

#define ElemType int
typedef struct Node {
	ElemType data;
	struct Node* next;
}Node, *PNode;

typedef struct List {
	PNode first;
	PNode last;
	int size;
}List;

void InitSCList(List* list) {
	PNode s = (PNode)malloc(sizeof(Node));
	assert(s != NULL);
	list->first = list->last = s;
	list->last->next = list->first;
	list->size = 0;
}

PNode _buynode(ElemType x) {
	PNode s = (PNode)malloc(sizeof(Node));
	assert(s != NULL);
	s->data = x;
	s->next = NULL;
	return s;
}

void push_back(List* list, ElemType x) {
	PNode s = _buynode(x);
	list->last->next = s;
	list->last = s;
	list->last->next = list->first;
	list->size++;
}

void push_front(List* list, ElemType x) {
	PNode s = _buynode(x);
	s->next = list->first->next;
	list->first->next = s;
	if (list->first == list->last) {               //ע��Ҫ�ж��ǲ��ǵ�һ������
		list->last = s;
	}
	list->size++;
}

void show_list(List* list) {
	Node* p = list->first->next;
	while (p != list->first) {
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
	list->last->next = list->first;
	list->size--;
}

void pop_front(List* list) {
	if (list->size == 0) {
		return;
	}

	PNode p = list->first->next;
	list->first->next = p->next;
	free(p);
	if (list->size == 1) {
		list->last = list->first;            //ע���ж��ǲ��������������һ������
	}
	list->size--;
}

void insert_val(List* list, ElemType x) {     //ǰ���������Ѿ�����
	PNode p = list->first;
	while (p->next != list->last && p->next->data < x) {
		p = p->next;
	}                                           //�ƶ�ָ��p�Ĺ���

	if (p->next == list->last && p->next->data < x) {
		push_back(list, x);
	}
	else {
		PNode s = _buynode(x);
		s->next = p->next;
		p->next = s;
		list->size++;
	}
}

Node* find(List* list, ElemType key) {
	if (list->size == 0) {
		return NULL;
	}
	PNode p = list->first->next;
	while (p != list->first && p->data != key) {       //ѭ�������ѭ���������Ƿ����ͷָ�룩
		p = p->next;
	}
	if (p == list->first) {    //˵������һȦû���� 
		return NULL;
	}
	return p;              //�����󲢲���p==list->first,��ô��ʱһ������Ϊֵ��Ȳ��˳���ѭ��
}

int length(List* list) {
	return list->size;
}

void delete_val(List* list, ElemType key) {
	if (list->size == 0) {
		return;
	}
	PNode p = find(list, key);              //���ҵ�λ��
	if (p == NULL) {
		printf("Ҫɾ�������ݲ����ڡ�\n");
		return;
	}

	if (p == list->last) {
		pop_back(list);
	}
	else {
		PNode q = p->next;
		p->data = q->data;
		p->next = q->next;
		free(q);
		list->size--;
	}
}

void sort(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}
	PNode s = list->first->next;
	PNode q = s->next;
	//������жϿ�����Ĳ���
	list->last->next = NULL;   //��һ�� �Ȳ�Ҫ����������ѭ��
	list->last = s;
	list->last->next = list->first;  //����һ��С�ĵ�ѭ������

	//����һ��һ�����а�ֵ����
	while (q != NULL) {
		s = q;
		q = q->next;


		PNode p = list->first;
		while (p->next != list->last && p->next->data < s->data) {
			p = p->next;
		}                                           //�ƶ�ָ��p�Ĺ���

		if (p->next == list->last && p->next->data < s->data) {
			s->next = list->last->next;
			list->last->next = s;
			list->last = s;
		}
		else {
			s->next = p->next;
			p->next = s;
		}
		//�������ȶϿ��ٲ��� ���ÿ�������size�ı仯
	}
}

void resver(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}

	PNode p = list->first->next;
	PNode q = p->next;

	//�Ͽ�����
	list->last->next = NULL;
	list->last = p;
	list->last->next = list->first;

	while (q != NULL) {
		p = q;
		q = q->next;

		p->next = list->first->next;
		list->first->next = p;
	}
}

void clear(List* list) {
	PNode p = list->first->next;
	while (p != list->first) {                 //����ѭ��һȦ
		list->first->next = p->next;
		free(p);
		p = list->first->next;
	}
	list->last = list->first;
	list->last->next = list->first;   //����������ѭ��
	list->size = 0;
}

void destroy(List* list) {
	clear(list);
	free(list->first);                    //�ͷ�ͷ���Ŀռ�
	list->first = list->last = NULL;      //�������ڹ�������ṹ���ʱ��Ͷ����
}

void main() {
	List mylist;
	InitSCList(&mylist);
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