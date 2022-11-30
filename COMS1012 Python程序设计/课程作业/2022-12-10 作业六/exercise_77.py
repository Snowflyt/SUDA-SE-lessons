"""题目：
已知两个列表，一个列表存放姓，一个列表存放名。编写程序生成一个字典，字典的键
由姓和名构成，姓按列表顺序选取，名从列表中随机选择，字典的值使用[0-100]的随机
整数。将字典内值在0-18范围内的元素全部去除。
"""


import random


def assignment77(first_names: list[str], last_names: list[str]) -> dict[str, int]:
    """
    返回一个字典，字典的键由姓和名构成。
    姓按列表顺序选取，名从列表中随机选择，字典的值使用[0-100]的随机整数。
    将字典内值在0-18范围内的元素全部去除。
    """

    return dict(filter(lambda item: item[1] > 18,
                       {f'{first_name}{last_names[random.randrange(0, len(last_names))]}':
                           random.randint(0, 100)
                        for first_name in first_names}.items()))


if __name__ == '__main__':
    f_names = list(eval(input('请输入存放姓的列表: ')))
    l_names = list(eval(input('请输入存放名的列表: ')))
    res = assignment77(f_names, l_names)
    print(res)
