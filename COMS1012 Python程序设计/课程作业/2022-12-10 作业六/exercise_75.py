"""题目：
在程序中创建两个字典，找出并显示两个字典中相同的键。
"""


from typing import Any, TypeVar


T = TypeVar('T')


def assignment75(dct1: dict[T, Any], dct2: dict[T, Any]) -> list[T]:
    """返回两个字典中相同的键"""

    return [i for i in dct1 if i in dct2]


if __name__ == '__main__':
    d1 = dict(eval(input('请输入第一个字典: ')))
    d2 = dict(eval(input('请输入第二个字典: ')))
    res = assignment75(d1, d2)
    print(res)
