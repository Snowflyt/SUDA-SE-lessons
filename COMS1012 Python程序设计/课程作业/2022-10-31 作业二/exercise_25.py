# -*- UTF-8 -*-

"""题目：
随机生成一个20以内的奇数列表，随机生成一个[0, 20]的整数a，判断a是否在列表中。
"""

import random


# 例子：将随机列表，随机数，和判断结果均返回
def assignment25() -> tuple[list[int], int, bool]:
    """生成一个20以内的奇数列表，随机生成一个[0, 20]的整数，判断它是否在列表中"""

    # step1: 生成两个随机整数length和num，length表示列表元素个数
    length = random.randint(1, 20)
    num = random.randint(0, 20)

    # step2: 根据length生成一个20以内的随机奇数列表
    ord_list = [random.randint(1, 10) * 2 - 1 for _ in range(length)]

    # step3: 判断num是否在ord_list中
    result = num in ord_list

    return ord_list, num, result


if __name__ == '__main__':
    lst, a, res = assignment25()
    print(lst, a, res)
