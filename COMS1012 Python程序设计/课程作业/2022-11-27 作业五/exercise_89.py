"""题目：
编写一个函数，将一个整数的各位数字对调，并编写测试程序，在测试函数中输入整数
和输出新的整数。例如：输入123，调用该函数之后，得到结果为321。
"""


def assignment89(num: int) -> int:
    """返回一个整数的各位数字对调后的结果"""

    return int(str(num)[::-1])


if __name__ == '__main__':
    n = input('请输入一个整数: ')
    res = assignment89(int(n))
    print(res)
