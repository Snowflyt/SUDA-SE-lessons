"""题目：
编写程序，计算并输出由0~7所能组成的奇数的个数。
"""


import math


def assignment86(digits: list[int]) -> int:
    """返回由digits所能组成的奇数的个数，每个数都必须出现一次并仅能出现一次，0不能开头"""

    # 求A(len(digitalLst), len(digitalLst))
    result = math.factorial(len(digits))
    # 去除0开头的数字（若有0）
    if 0 in digits:
        result -= math.factorial(len(digits) - 1)
    # 去除其中的偶数
    if 0 in digits:
        num_even_without_zero = sum(1 for i in digits if i % 2 == 0 and i != 0)
        # 先减去0结尾的偶数
        result -= math.factorial(len(digits) - 1)
        # 再减去不以0结尾的偶数
        result -= (math.factorial(len(digits) - 1) -
                   math.factorial(len(digits) - 2)) * num_even_without_zero
    else:
        num_even = sum(1 for i in digits if i % 2 == 0)
        result -= math.factorial(len(digits) - 1) * num_even

    return result


if __name__ == '__main__':
    d = list(range(8))
    res = assignment86(d)
    print(res)
