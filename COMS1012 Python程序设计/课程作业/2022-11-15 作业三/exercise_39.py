# -*- UTF-8 -*-

"""题目：
从键盘输入2个正整数，比较两者大小，输出较大值。
"""


def assignment39(num1: int, num2: int) -> int:
    """判断2个正整数的大小，输出较大值"""

    if num1 <= 0 or num2 <= 0:
        raise ValueError('输入的数不在范围内')

    return num1 if num1 > num2 else num2


if __name__ == '__main__':
    a, b = map(int, input('请输入2个正整数: ').split())
    res = assignment39(a, b)
    print(res)
