# -*- UTF-8 -*-

"""题目：
给定一个二进制字符串，例如“10100101”，计算并输出字符串中0的个数以及所有数字之和。
"""


def assignment55(binary: str) -> tuple[int, int]:
    """返回二进制字符串中0的个数和所有数字之和"""

    num = sum(1 for i in binary if i == '0')

    sum_num = sum(int(i) for i in binary)

    return num, sum_num


if __name__ == '__main__':
    n, s = assignment55("10100101")
    print(f'0的个数是{n}')
    print(f'所有数字之和{s}')
