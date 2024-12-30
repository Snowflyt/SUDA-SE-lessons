#include<stdio.h>
#include <malloc.h>
#include <assert.h>
typedef int ElemType;

typedef struct Node {      //��������
	ElemType data;
	Node* next;
}Node, *PNode;            //PNode=Node*��PNodeΪ������͵�ָ�룬������������

//typedef Node* PNode;     

typedef struct List {    //����һ�����������й���ʽ������
	PNode first;          //first last��Ϊָ�����ָ��
	PNode last;
	size_t size;          //size_t��64λϵͳ�϶���Ϊunsighed int,�����ͱ�ʾC���κζ������ܴﵽ����󳤶�
}List;

void InitList(List* list) {                      //��������&�������Ҫ��*��list��List*�͵ı���
	list->first = list->last = (Node*)malloc(sizeof(Node));
	//�տ�ʼfirst��lastָ�����ͬһ�����
	assert(list->first != NULL);
	list->first->next = NULL;
	list->size = 0;
}

//-----------�Ż�����start-------------
//-----------One------------------
Node* _buynode(ElemType x) {
	Node* s = (Node*)malloc(sizeof(Node));
	assert(s != NULL);
	s->data = x;
	s->next = NULL;
	return s;
}

//---------Two----------------------
typedef Node* It;
//��д������ ʹ������Ӽ��
It begin(List* list) {
	return list->first->next;     //ָ���һ�����
}
It end(List* list) {
	return list->last->next;     //ָ�����һ��������һ�����
}

//�����λ�ø�����ĳ�����ĵ�ַ ��ʱ����Ҫ������λ�ý���ǰ����в��빤��
void insert(List* list, It pos, ElemType x) {
	Node* p = list->first;
	while (p->next != pos) {
		p = p->next;
	}

	Node* s = _buynode(x);
	s->next = p->next;
	p->next = s;

	if (pos == NULL) {
		list->last = s;
	}
	list->size++;
}

//���ʱβ����������Ըĳ�
void push_back(List* list, ElemType Item) {
	insert(list, end(list), Item);
}

//ͷ������ɱ�Ϊ
void push_front(List* list, ElemType Item) {
	insert(list, begin(list), Item);              //insert(begin(),Item);
}

//-------------�Ż�����end-----------------

//void push_back(List*list, ElemType Item) {
//	/*Node* s = (Node*)malloc(sizeof(Node));
//	assert(s != NULL);
//	s->data = Item;
//	s->next = NULL;  */ 
//
//	Node* s=_buynode(Item);  //�Դ���ĸĽ� ������Դ�����
//
//	list->last->next = s;
//	list->last = s;
//	list->size++;
//}
//
//void push_front(List* list, ElemType Item) {
//	Node* s = (Node*)malloc(sizeof(Node));
//	assert(s != NULL);
//	s->data = Item;
//	s->next = list->first->next;
//	list->first->next = s;
//	//�տ�ʼfirst��lastָ�����ͬһ����㣬���Ե������һ������ʱ��Ҫ��֤last��ָ��Ҫ�ı�
//	//��֮��Ĳ����о������ٶ�
//	//����ڲ���֮ǰ����Ҫ�����ж�
//	if (list->size == 0) {
//		list->last = s;
//	}
//	list->size++;
//}


void show_list(List* list) {
	Node* p = list->first->next;
	while (p != NULL) {
		printf("%d--", p->data);
		p = p->next;
	}
	printf("Nul \n");
}

void pop_back(List* list) {
	if (list->size == 0) {
		return;
	}
	Node* p = list->first;
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
	Node* p = list->first->next;
	list->first->next = p->next;
	free(p);
	//Ҫ������������ֻ��һ������ʱ��ͷɾ֮��Ҫ����lastָ��
	if (list->size == 1) {
		list->last = list->first;
	}
	list->size--;
}

//��������ǰҪ��֤����������� ����ItemѰ�Һ��ʵ�λ�ò���
//����������޷���ֵ����
void insert_val(List* list, ElemType Item) {
	//������һ�����
	Node* s = (Node*)malloc(sizeof(Node));
	assert(s != NULL);
	s->data = Item;
	s->next = NULL;

	Node* p = list->first;     //˼���˶���ָ����ָ������û���ָ������ǰ����
	while (p->next != NULL && p->next->data < Item) {   //�����������˳��ǧ���ܽ������������������p->next=NULL����� �ǲ�����p->next->dataֵ�ģ��ᵼ�³���ı���
		p = p->next;
	}
	//�ж�����������Ƿ���β������(�ǵĻ�Ҫ�޸�lastָ���ָ��)
	//��Ϊ����ѭ�������������һ���ҵ����ʵ�λ�� / ����p�ߵ�ͷ��
	if (p->next == NULL) {
		list->last = s;
	}
	s->next = p->next;
	p->next = s;
	list->size++;
}

Node* find(List* list, ElemType key) {
	Node* p = list->first->next;
	//�������������  һ��û�ҵ���pָ��� /�����ҵ��˲����ص�ǰ�ĵ�ַ
	while (p != NULL && p->data != key) {       //�����������˳��ǧ���ܽ������������������p=NULL����� �ǲ�����dataֵ�ģ��ᵼ�³���ı���
		p = p->next;
	}
	return p;
}

int length(List* list) {
	return list->size;
}

void delete_val(List* list, ElemType key) {
	if (list->size == 0) {
		return;
	}
	Node* p = find(list, key);
	if (p == NULL) {
		printf("Ҫɾ�������ݲ�����.\n");
		return;
	}
	if (p == list->last) {
		pop_back(list);
	}
	else {
		Node* q = p->next;        //��˼·
		p->data = q->data;        //�Ƚ�q��ָ������ݸ��Ƶ�p��ָ������ݣ����串�ǵ�
		p->next = q->next;        //Ȼ����ɾ��q��ָ���ָ��
		free(q);
		list->size--;             //���Ҫд���������� ��Ϊβ��ɾ���ĺ������Ѿ�������
	}
}

void sort(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}

	//����������ֳ���������
	Node* s = list->first->next;
	Node* q = s->next;
	list->last = s;
	list->last->next = NULL;
	//-----------------------
	//��q�����н�ÿһ�����������ֱ�����һ��������
	while (q != NULL) {
		s = q;
		q = q->next;

		//����������ֵ����Ĵ���
		Node* p = list->first;     //˼���˶���ָ����ָ������û���ָ������ǰ����
		while (p->next != NULL && p->next->data < s->data) {   //�����������˳��ǧ���ܽ������������������p->next=NULL����� �ǲ�����p->next->dataֵ�ģ��ᵼ�³���ı���
			p = p->next;
		}
		//�ж�����������Ƿ���β������(�ǵĻ�Ҫ�޸�lastָ���ָ��)
		//��Ϊ����ѭ�������������һ���ҵ����ʵ�λ�� / ����p�ߵ�ͷ��
		if (p->next == NULL) {
			list->last = s;
		}
		s->next = p->next;
		p->next = s;
	}
}

//����������������һ����Ҫ�Խ��������в���
void resver(List* list) {
	if (list->size == 0 || list->size == 1) {
		return;
	}
	//������ֳ��������� 
	Node* p = list->first->next;
	Node* q = p->next;
	list->last = p;
	list->last->next = NULL;

	while (q != NULL) {
		p = q;
		q = q->next;

		//Ȼ���ٶԺ���������Ľ�����ͷ��
		p->next = list->first->next;
		list->first->next = p;
	}
}

void clear(List* list) {
	if (list->size == 0) {
		return;
	}
	Node* p = list->first->next;
	while (p != NULL) {
		list->first->next = p->next;
		free(p);
		p = list->first->next;
	}
	list->last = list->first;
	list->size = 0;
}

void destroy(List* list) {
	clear(list);
	free(list->first);
	list->first = list->last = NULL; //��ͷָ��βָ������
}

void main() {
	List mylist;
	InitList(&mylist);
	int select = 1;
	int Item;
	Node* p;
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
				printf("���ҵ������������в�����");
			}
			break;
		case 8:
			printf("������ĳ���Ϊ:> %d \n", length(&mylist));
			break;
		case 9:
			printf("������Ҫɾ����ֵ:> \n");
			scanf_s("d%", &Item);
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
