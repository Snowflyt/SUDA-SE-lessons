# -*- UTF-8 -*-

"""题目：
有一组人员的姓名和年龄数据，编写程序找到这组数据中年龄最大的人，输出相关人员信息
"""


def assignment60(dataset: list[tuple[str, int]]) -> tuple[str, int]:
    """查找年龄最大的人员信息"""

    return max(dataset, key=lambda x: x[1])


if __name__ == '__main__':
    # step1: 编写一组list包含所有人员的姓名和年龄，例如datasets=[('Lisa', 30), ('Anna', 20)]
    lst = [('Lisa', 30), ('Anna', 20), ('Tom', 40), ('Jack', 50), ('Lily', 25)]
    print(lst)

    # step2: 查询这组数据年龄最大的一组，并且输出其信息
    res = assignment60(lst)
    print(res)
