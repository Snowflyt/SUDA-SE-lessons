# -*- UTF-8 -*-

"""题目：
从键盘输入一个十进制正整数，利用列表和除二取余法，计算出该数字的二进制值。
"""


import random


def assignment51(num: int) -> tuple[int, ...]:
    """返回一个整数的二进制数字序列"""

    result = []

    while num > 0:
        result.append(num % 2)
        num //= 2

    result.reverse()

    return tuple(result)


if __name__ == '__main__':
    # 输入一个十进制数num
    n = random.randint(1, 100)
    res = assignment51(n)
    print(n, ":", res)
