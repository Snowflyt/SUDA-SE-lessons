# -*- UTF-8 -*-

"""题目：
算数练习题。编写一个程序，实现100以内的随机四则运算出题，将题目输出在屏幕上，
例如：1+1=。然后接收用户输入，判断回答是否正确，将结果输出到屏幕上。如果回答
正确，则提示回答正确，如果错误在提示回答错误的同时，将正确答案输出。
"""


import random


OPERATOR_LIST = ['+', '-', '*', '/']


def assignment43(num1: int, num2: int, operator: str, user_answer: str) -> None:
    """猜数字游戏"""

    if eval(f'{num1}{operator}{num2}') == eval(user_answer):
        print('回答正确')
    else:
        print('回答错误，正确答案是:', eval(f'{num1}{operator}{num2}'))


if __name__ == '__main__':
    n1, n2 = random.randint(1, 100), random.randint(1, 100)
    op = OPERATOR_LIST[random.randrange(0, 4)]
    assignment43(n1, n2, op, input(f'{n1}{op}{n2}='))
