# -*- UTF-8 -*-

"""题目：
从键盘上输入一个不多于5位的正整数，编写程序实现如下要求：
（1）求出它是几位数；
（2）分别输出每一位数字；
（3）按逆序输出每位数字，例如原数为321，应输出123。
"""


def assignment38(num: int) -> tuple[int, tuple[int, ...], int]:
    """从键盘上输入一个不多于5位的正整数，求出它是几位数，分别输出每一位数字，按逆序输出每位数字"""

    if num <= 0 or num > 99999:
        raise ValueError('输入的数不在范围内')

    # 求出它是几位数
    num_len = len(str(num))

    # 分别输出每一位数字
    num_list = tuple(int(i) for i in str(num))

    # 按逆序输出每位数字
    num_reverse = int(''.join(str(i) for i in num_list[::-1]))

    return num_len, num_list, num_reverse


if __name__ == '__main__':
    n = int(input('请输入一个不多于5位的正整数: '))
    res = assignment38(n)
    print(res)
