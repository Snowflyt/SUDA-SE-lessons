# -*- UTF-8 -*-

"""题目：
从键盘输入一个十六进制正整数，计算出该数字的二进制值。
"""


def assignment52(num: int) -> tuple[int, ...]:
    """返回一个整数的二进制数字序列"""

    result = []

    while num > 0:
        result.append(num % 2)
        num //= 2

    result.reverse()

    return tuple(result)


if __name__ == '__main__':
    # 输入一个十六进制数num
    n = int(input("请输入一个十六进制整数:"), 16)
    res = assignment52(n)
    print(res)
