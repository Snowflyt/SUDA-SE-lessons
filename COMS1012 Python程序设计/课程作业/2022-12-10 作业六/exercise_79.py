"""题目：
有一个元组，元组内存放若干整数。编写程序，统计元组中的元素个数，
输出最大值、最小值、平均值。
"""


def assignment79(nums: tuple[int, ...]) -> tuple[int, int, int, float]:
    """返回元组中的元素个数、最大值、最小值、平均值"""

    return len(nums), max(nums), min(nums), sum(nums) / len(nums)


if __name__ == '__main__':
    t = tuple(eval(input('请输入一个存放若干整数的元组: ')))
    res = assignment79(t)
    print(res)
