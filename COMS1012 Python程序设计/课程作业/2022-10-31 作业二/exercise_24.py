# -*- UTF-8 -*-

"""题目：
随机生成一个10以内整数平方的列表，要求从大到小排序
"""

import random


def assignment24() -> list[int]:
    """生成降序排序的10以内整数平方列表"""

    # step1: 生成一个随机整数，表示列表元素个数
    length = random.randint(1, 9)

    # step2: 根据个数生成一个10以内的随机整数平方的列表
    result = [random.randint(1, 10) ** 2 for _ in range(length)]

    # step3: 对lst进行降序排序
    result.sort(reverse=True)

    return result


if __name__ == '__main__':
    res = assignment24()
    print(res)
