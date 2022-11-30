# pyright: strict

"""题目：
编写一个程序，提示用户从键盘输入一个 3 位整数，
请编写程序计算三位整数的各位数字之和，
并输出到屏幕上，要求输出占 4 列，右对齐。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_sum(number: int) -> int:
    """calculate the sum of the digits of a number"""

    # the simplest way is to use sum(map(int, str(number))),
    # but it is a bit slow and not very easy to understand for those
    # who are not very familiar with functional programming

    if number < 100 or number > 999:
        raise ValueError('number must be a 3-digit integer')

    result = 0
    while number > 0:
        result += number % 10
        number //= 10
    return result


if __name__ == '__main__':
    print('Please input a 3-digit integer: ', end='')
    sum_ = calculate_sum(int(input()))
    print(f'Sum of digits: {sum_:4d}')
