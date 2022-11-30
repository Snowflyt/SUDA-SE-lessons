# -*- UTF-8 -*-

"""题目：
输入一个[0, 100]的整数，判断这个数是否能被3整除，如果输入的数不在范围内提示错误信息。
"""


def assignment37(num: int) -> bool:
    """判断一个数是否能被3整除（0-100）"""

    if num < 0 or num > 100:
        raise ValueError('输入的数不在范围内')

    return num % 3 == 0


if __name__ == '__main__':
    n = int(input('请输入一个[0, 100]的整数: '))
    res = assignment37(n)
    print(res)
