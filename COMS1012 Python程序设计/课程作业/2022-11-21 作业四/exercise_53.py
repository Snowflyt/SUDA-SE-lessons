# -*- UTF-8 -*-

"""题目：
随机生成一个数[0, 100]，判断这个数是否等于50，如果不等于则重新随机生成。
最后输出一共随机生成了多少次
"""


import random


def assignment53() -> tuple[tuple[int, ...], int]:
    """生成随机数，直到生成的数为50为止，返回生成的随机数列表和生成次数"""

    lst = []

    num = random.randint(0, 100)
    lst.append(num)
    while num != 50:
        num = random.randint(0, 100)
        lst.append(num)

    return tuple(lst), len(lst)


if __name__ == '__main__':
    res = assignment53()
    print(res)
