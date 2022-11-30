"""题目：
在程序中创建两个字典，找出并显示两个字典中具有相同值（要求数据类型也相同）的键。
"""


from typing import TypeVar


T = TypeVar('T')
U = TypeVar('U')


def assignment76(dct1: dict[T, U], dct2: dict[T, U]) -> list[T]:
    """返回两个字典中值相同的对应键"""

    return [item[0] for item in dct1.items() if item in dct2.items()]


if __name__ == '__main__':
    d1 = dict(eval(input('请输入第一个字典: ')))
    d2 = dict(eval(input('请输入第二个字典: ')))
    res = assignment76(d1, d2)
    print(res)
