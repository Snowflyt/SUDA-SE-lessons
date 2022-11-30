"""题目：
有两个元组，一组存放了姓名，一组存放了年龄。将两组数据进行合并形成一个字典，并输出。
"""


from typing import TypeVar


T = TypeVar('T')


def assignment80(tpl1: tuple[T, ...], tpl2: tuple[T, ...]) -> dict[T, T]:
    """将两个元组按照顺序进行合并构成一个字典"""

    return dict(zip(tpl1, tpl2))


if __name__ == '__main__':
    names = tuple(eval(input('请输入存放姓名的元组: ')))
    ages = tuple(eval(input('请输入存放年龄的元组: ')))
    res = assignment80(names, ages)
    print(res)
