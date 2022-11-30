"""题目：
现在8名体检人员的体重信息如下(65.5,70.2,100.5,45.5,88.8,55.5,73.5,67.8)，
请编写程序计算出方差。
"""


def assignment70(tpl: tuple[float, ...]) -> float:
    """返回元组中元素的方差"""

    average = sum(tpl) / len(tpl)
    return sum((i - average) ** 2 for i in tpl) / len(tpl)


if __name__ == '__main__':
    # 8名体检人员的体重信息
    weights = (65.5, 70.2, 100.5, 45.5, 88.8, 55.5, 73.5, 67.8)
    res = assignment70(weights)
    print(res)
