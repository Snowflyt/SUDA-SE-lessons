# -*- UTF-8 -*-

"""题目：
求无序整数列表的中位数。如列表元素为偶数个，则取列表升序排列时中间两数中数值
较小的元素为中位数。
"""

import random


# 例子 list_input=[2,3,5,1,4,6]
#       output=3  取list_input升序排序后[1,2,3,4,5,6]中间两个元素的较小元素
def assignment22(list_input: list[int]) -> int:
    """取无序整数列表的中位数"""

    sorted_list = sorted(list_input)

    length = len(sorted_list)
    if length % 2 == 0:
        return min(sorted_list[length // 2 - 1:length // 2 + 1])

    return sorted_list[length // 2]


if __name__ == '__main__':
    n = random.randint(20, 40)
    lst = [random.randint(1, 100) for _ in range(n)]
    res = assignment22(lst)
    print(res)
