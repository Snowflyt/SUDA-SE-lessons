# -*- UTF-8 -*-

"""题目：
用*输出一个等腰三角形。提示用户输入一个整数n，代表输出的等边三角形由n行*组成。
例：输入n=3。输出：
   *
  ***
 *****
"""


def assignment58(num: int) -> None:
    """打印等腰三角形"""

    for i in range(1, num + 1):
        print(' ' * (num - i) + '*' * (2 * i - 1))


if __name__ == '__main__':
    n = int(input('请输入一个整数: '))
    assignment58(n)
