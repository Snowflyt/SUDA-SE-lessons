# -*- UTF-8 -*-

"""题目：
猜数字游戏。随机生成一个[0, 100]的数字。要求用户从键盘输入一个数字，如果输入的
数字大于则输出“大了”，等于50则输出“恭喜，猜正确了”，否则输出“小了”，如果输入
的数字不在[0, 100]之间，则输出“输入错误”。
"""


import random


curr_num = 0


def assignment42(num: int, curr_num: int) -> str:
    """猜数字游戏"""

    if num < 0 or num > 100:
        return '输入错误'

    if num > curr_num:
        return '大了'

    if num == curr_num:
        return '恭喜，猜正确了'

    return '小了'


if __name__ == '__main__':
    curr_num = random.randint(0, 100)
    while True:
        input_num = int(input('请输入一个数字: '))
        result = assignment42(input_num, curr_num)
        print(result)
        if result == '恭喜，猜正确了':
            break
