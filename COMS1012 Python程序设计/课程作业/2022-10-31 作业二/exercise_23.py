# -*- UTF-8 -*-

"""题目：
已知一个整数列表，判断列表内容是否为回文，即无论正序还是倒序，列表的内容是否相同。
"""

from typing import TypeVar

T = TypeVar('T')


# 例子 list_input=[1,2,3,4,3,2,1]
#       output=True
# 例子 list_input=[1,2,4,4,3,2,1]
#       output=False
def assignment23(list_input: list[T]) -> bool:
    """判断列表内容是否为回文"""
    return list_input == list_input[::-1]


if __name__ == '__main__':
    lst = [1, 2, 3, 4, 3, 2, 1]
    res = assignment23(lst)
    print(res)
