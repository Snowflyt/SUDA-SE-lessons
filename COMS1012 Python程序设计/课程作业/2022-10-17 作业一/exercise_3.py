# pyright: strict

"""题目：
编写一个程序，提示用户从键盘输入两个正整数 a 和 b ，计算并输出 a / b 的商和余数。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_quotient_and_remainder(num1: int, num2: int) -> tuple[int, int]:
    """calculate the quotient and remainder of a / b"""
    return num1 // num2, num1 % num2


if __name__ == '__main__':
    print('Please input two positive integers: ', end='')
    quotient, remainder = calculate_quotient_and_remainder(
        *map(int, input().split()))
    print(f'The quotient is {quotient}, the remainder is {remainder}')
