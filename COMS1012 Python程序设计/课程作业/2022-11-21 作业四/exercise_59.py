# -*- UTF-8 -*-

"""题目：

"""


def assignment59(num: int) -> None:
    """打印正六边形"""

    for i in range(num):
        print(' ' * (num - i - 1) + '* ' * (num + i))
    for i in range(num - 1):
        print(' ' * (i + 1) + '* ' * (num * 2 - 2 - i))


if __name__ == '__main__':
    n = int(input('请输入一个整数: '))
    assignment59(n)
