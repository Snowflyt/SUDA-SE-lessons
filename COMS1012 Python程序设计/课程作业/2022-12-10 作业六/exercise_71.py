"""题目：
编写一个程序，有一个元组，内部有重复的若干元素，将重复元素去除后存入新的列表中。
"""


from typing import TypeVar


T = TypeVar('T')


def assignment71(tpl: tuple[T, ...]) -> list[T]:
    """返回元组内的元素去重后的列表"""

    result = []

    for i in tpl:
        if i not in result:
            result.append(i)

    return result


if __name__ == '__main__':
    t = tuple(eval(input('请输入一个元组: ')))
    res = assignment71(t)
    print(res)
