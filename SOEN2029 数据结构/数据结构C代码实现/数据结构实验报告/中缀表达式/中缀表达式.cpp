#include <iostream>
#include <stack>
#include <string>
using namespace std;

//判断是否为运算符的函数
bool isOperator(char c) {
	if (c == '+' || c == '-' || c == '*' || c == '/')
		return true;
	return false;
}

//判断是否为操作数的函数
bool isNumber(char c) {
	if (c != '+' &&  c != '-'&&c != '*'&&c != '/'&&c != '('&&c != ')') {
		return true;
	}
	return false;
}

//比较运算符优先级的函数
int precedence(char op) {
	if (op == '+' || op == '-')
		return 1;
	else if (op == '*' || op == '/')
		return 2;
	return 0;
}


//计算函数
double Calculation(stack<double>&st, char c) {
	double right_val = st.top();
	st.pop();
	double left_val = st.top();
	st.pop();

	double res = 0.0;
	if (c == '+') {
		res = left_val + right_val;
	}
	else if (c == '-') {
		res = left_val - right_val;
	}
	else if (c == '*') {
		res = left_val * right_val;
	}
	else if (c == '/') {
		res = left_val / right_val;
	}
	return res;
}

double getOpnd(string str, int &i)
{
	double data = 0.0;

	while (i < str.size())
	{
		if (!isdigit(str[i]))
			break;
		else
		{
			while (isdigit(str[i]))
			{
				data = data * 10 + str[i] - '0';
				i++;
			}
			if (str[i] == '.')
			{
				i++; //跳过小数点
				double num = 0.0;
				int k = 0;
				while (isdigit(str[i]))
				{
					--k;
					num = pow(10, k);
					data = data + (str[i] - '0') * num;
					i++;
				}
			}
		}
	}

	return data;
}


double solveInfix(string s) {
	stack<double> st1;
	stack<char> st2;
	int i = 0;
	while (i < s.size() - 1)
	{
		char c = s[i];
		if (isNumber(c))
		{
			double val;
			val = getOpnd(s, i);

			st1.push(val);
		}
		else
		{
			if (c == '(')
			{               //左括号直接压栈
				st2.push(c);
			}
			else if (c == ')')
			{
				while (!st2.empty() && st2.top() != '(')
				{
					char a = st2.top();
					st1.push(Calculation(st1, a));
					st2.pop();
				}
				st2.pop();
			}

			else if (isOperator(c))
			{
				while (!st2.empty() && precedence(c) <= precedence(st2.top()))
				{
					char a = st2.top();
					st1.push(Calculation(st1, a));
					st2.pop();
				}
				st2.push(c);
			}
			i++;
		}
	}
	while (!st2.empty())
	{
		char a = st2.top();
		st1.push(Calculation(st1, a));
		st2.pop();
	}
	return st1.top();
}

int main()
{
	/*string infix = "3.5*(20+8)-1#";*/
	string infix;
	cin >> infix;
	cout << solveInfix(infix) << endl;
}
