# -*- UTF-8 -*-

"""题目：
随机生成一个[0, 100]的整数，判断这个数是奇数还是偶数。
"""


import random


def is_even(num: int) -> bool:
    """判断一个数是否为偶数"""
    return num % 2 == 0


def assignment36() -> tuple[int, str]:
    """随机生成一个[0, 100]的整数，判断这个数是奇数还是偶数。"""
    return (num := random.randint(0, 100)), '偶数' if is_even(num) else '奇数'


if __name__ == '__main__':
    res = assignment36()
    print(res)
