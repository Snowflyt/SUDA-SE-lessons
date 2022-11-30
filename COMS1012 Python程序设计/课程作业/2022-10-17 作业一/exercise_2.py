# pyright: strict

"""题目：
编写一个程序，从键盘输入四个整数，并输出其中最大的数。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_max(*numbers: int) -> int:
    """calculate the max number of the given numbers"""

    # the simplest and fastest way is to use the built-in function max()
    # the following code is just for demonstration

    result = numbers[0]

    for i in numbers:
        if i > result:
            result = i

    return result


if __name__ == '__main__':
    print('Please input 4 integers: ', end='')
    max_number = calculate_max(*map(int, input().split()))
    print(f'The max number is {max_number}')
