# -*- UTF-8 -*-

"""题目：
输出一个乘法表。要求输入一个整数n，输出n*n的乘法表，
乘法表打印出来为下三角样式，格式工整。例：
输入n=4。输出：
   1 2 3 4
 1 1
 2 2 4
 3 3 6 9
 4 4 8 12 16
"""


def assignment65(num: int) -> None:
    """打印num*num的乘法表"""

    # step1: 打印表头
    print('    ', end='')
    for i in range(1, num + 1):
        print(f'{i:4}', end='')
    print()

    # step2: 打印表格
    for i in range(1, num + 1):
        print(f'{i:4}', end='')
        for j in range(1, i + 1):
            print(f'{i * j:4}', end='')
        print()


if __name__ == '__main__':
    n = int(input('n = '))
    assignment65(n)
