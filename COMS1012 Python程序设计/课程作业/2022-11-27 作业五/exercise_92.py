"""题目：
编写一个函数实现冒泡排序。从键盘输入依次输入10个整数，分别按照从小到大、从
大到小进行排序，并分别输出排序后的结果。
"""


import random


def assignment92(lst: list[int], reverse=False) -> list[int]:
    """返回冒泡排序后的列表"""

    result = lst.copy()

    for i in range(len(result) - 1):
        for j in range(len(result) - i - 1):
            if result[j] > result[j + 1] if not reverse else result[j] < result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]

    return result


if __name__ == '__main__':
    l = [random.randint(1, 200) for _ in range(10)]
    print(l)
    res = assignment92(l)
    print(res)
    res = assignment92(l, reverse=True)
    print(res)
