# pyright: strict

"""题目：
编写一个程序，提示用户输入三个整数 x, y, z，把这三个数由小到大输出。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def sort_three_numbers(num1: int, num2: int, num3: int) -> tuple[int, int, int]:
    """sort three numbers from small to large"""

    # the simplest way is to use tuple(sorted((num1, num2, num3)))
    # the following code is just for demonstration

    if num1 > num2:
        num1, num2 = num2, num1
    if num1 > num3:
        num1, num3 = num3, num1
    if num2 > num3:
        num2, num3 = num3, num2
    return num1, num2, num3


if __name__ == '__main__':
    print('Please input three integers: ', end='')
    sorted_numbers = sort_three_numbers(*map(int, input().split()))
    print(f'The sorted numbers are {sorted_numbers}')
