"""题目：
编写一个函数实现选择排序。从键盘依次输入10个字母（如果有大小写，需要区分），
按照字母的ASCII码值分别进行从小到大、从大到小的排序，并输出排序的结果。
"""


import random


def assignment93(lst: list[int], reverse=False) -> list[int]:
    """返回选择排序后的列表"""

    result = lst.copy()

    for i in range(len(result) - 1):
        min_val = result[i]
        min_index = i
        for j in range(i + 1, len(result)):
            if result[j] < min_val if not reverse else result[j] > min_val:
                min_val = result[j]
                min_index = j
        result[i], result[min_index] = result[min_index], result[i]

    return result


if __name__ == '__main__':
    l = [random.randint(1, 200) for _ in range(10)]
    print(l)
    res = assignment93(l)
    print(res)
    res = assignment93(l, reverse=True)
    print(res)
