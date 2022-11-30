# -*- UTF-8 -*-

"""题目：
自行定义两个列表，列表元素个数大于 10。将 2 个列表合并，然后截取第 8 至第 15 个
元素，输出最后得到的结果。
"""

from typing import TypeVar

T = TypeVar('T')
U = TypeVar('U')


# list1是第一个列表，list2是第二个列表，返回result_list（包含8-18的元素）
# 例子 input: list1=[1,2,3,4,5,6,7,8,9,10,11] ,list2=[11,12,13,14,15,16,17,18,19,20,21,22,23]
# output:result_list=[8,9,10,11,12,13,14,15]
def assignment21(list1: list[T], list2: list[U]) -> list[T | U]:
    """合并两个列表并截取第8-15个元素"""
    return (list1 + list2)[7:16]


if __name__ == '__main__':
    lst1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    lst2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
    res = assignment21(lst1, lst2)
    print(res)
