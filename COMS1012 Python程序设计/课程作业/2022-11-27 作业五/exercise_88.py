"""题目：
编写一个函数，计算一个整数的所有因子之和，其中因子不包括整数本身，并编写测试
程序，在测试程序中输入整数和输出整数的所有因子之和。例如：输入8，调用该函数
之后，得到结果为7。
"""


def assignment88(num: int) -> int:
    """返回一个整数的所有因子之和，其中因子不包括整数本身"""

    return sum(i for i in range(1, num) if num % i == 0)


if __name__ == '__main__':
    n = input('请输入一个整数: ')
    res = assignment88(int(n))
    print(res)
