# pyright: strict

"""题目：
编写一个程序，产生一个随机 3 位正整数，并将该整数的数字首尾互换输出，例如：157
互换后为 751。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import random


def swap_digits(number: int) -> int:
    """swap the first and last digits of a number"""

    # the simplest way is to use int(str(number)[::-1]),
    # but is may be hard to understand for
    # those who are not very familiar with slicing

    # get the first digit
    first_digit = number
    number_length = 1
    while first_digit >= 10:
        first_digit //= 10
        number_length += 1

    # get the last digit
    last_digit = number % 10

    # construct the new number
    return (last_digit * 10 ** (number_length - 1) +
            number % (10 ** (number_length - 1)) // 10 * 10 +
            first_digit)


if __name__ == '__main__':
    n = random.randint(100, 999)
    print(f'Original number: {n}')
    swapped = swap_digits(n)
    print(f'Number after swapping the first and last digits: {swapped}')
