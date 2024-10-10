#include<vector>
#include<queue>
#include<iostream>

using namespace std;

template<typename datatype>
class stack
{
public:
	bool find(datatype x);
	void push(const datatype& x);
	datatype pop();//删除并返回栈顶
	datatype top();//不删除栈顶，仅返回栈顶
	bool is_empty();//判断栈是否为空
	int size() { return elem.size(); }//返回vector的元素个数
	void print();

protected:
	vector<datatype> elem;//保护成员是vectorS
};

template<typename datatype>
void stack<datatype>::print()
{
	for (int i = 0; i < size(); i++)
	{
		cout << elem[i] << " ";
	}
}

template<typename datatype>
bool stack<datatype>::find(datatype x)
{
	int i;
	for (i = 0; i < elem.size(); i++)
	{
		if (elem[i] == x)
			return true;
	}
	return false;
}
template<typename datatype>
bool stack<datatype>::is_empty()
{
	return elem.empty();
}
template<typename datatype>
datatype stack<datatype>::pop()
{
	if (is_empty())
	{
		cout << "satck is empty" << endl;
		exit(0);
	}
	else
	{
		datatype topelem = elem.back();
		elem.pop_back();
		return topelem;
	}
}
template<typename datatype>
void stack<datatype>::push(const datatype& x)
{
	elem.push_back(x);
}

template<typename datatype>
datatype stack<datatype>::top()
{
	if (is_empty())
	{
		cout << "stack is empty" << endl;
		exit(0);
	}
	return elem.back();
}

void  cat_fish(stack<int> &ms, queue<int>& playerA, queue<int>& playerB)//用于输出过程并返回一个代表输赢的数字
{
	int player = 0;
	while (!playerA.empty() && !playerB.empty())
	{
		int tempa = playerA.front();
		int tempb = playerB.front();
		if (player == 0)
		{
			if (ms.find(tempa) && !ms.is_empty())//先A后B
			{
				playerA.pop();
				playerA.push(tempa);
				while (ms.top() != tempa)
				{
					playerA.push(ms.pop());
				}
				playerA.push(ms.pop());
			}
			else
			{
				ms.push(tempa);
				playerA.pop();
			}
			player = 1 - player;
		}
		if (player == 1)
		{
			if (ms.find(tempb) && !ms.is_empty())
			{
				playerB.pop();
				playerB.push(tempb);
				while (ms.top() != tempb)
				{
					playerB.push(ms.pop());
				}
				playerB.push(ms.pop());
			}
			else
			{
				ms.push(tempb);
				playerB.pop();
			}
			player = 1 - player;
		}


		stack<int> desk = ms;
		vector<int> a;
		cout << "Cards on the desk:";
		while (!desk.is_empty())
		{
			a.push_back(desk.pop());
		}
		for (int j = a.size() - 1; j >= 0; j--)
		{
			cout << a[j] << " ";
		}
		cout << endl;
		cout << "Cards in A's hand:";
		queue<int> tempA = playerA;
		while (!tempA.empty())
		{
			cout << tempA.front() << " ";
			tempA.pop();
		}

		cout << endl;
		cout << "Cards in B's hand:";
		queue<int> tempB = playerB;
		while (!tempB.empty())
		{
			cout << tempB.front() << " ";
			tempB.pop();
		}
		cout << endl;
		cout << "================================" << endl;
	}

	if (playerA.empty())
	{
		cout << "胜者为B";

	}
	else
	{
		cout << "胜者为A";
	}

}
int main()
{
	stack<int> ms;
	queue<int> playerA;
	queue<int> playerB;
	int n;
	cin >> n;

	int num1, num2;
	for (int i = 0; i < n;i++) {
		cin >> num1;
		playerA.push(num1);
	}
	for (int j = 0; j < n;j++) {
		cin >> num2;
		playerB.push(num2);
	}
	cat_fish(ms, playerA, playerB);
}