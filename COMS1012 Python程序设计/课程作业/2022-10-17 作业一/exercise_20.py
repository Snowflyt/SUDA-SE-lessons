# pyright: strict

"""题目：
请编写一个程序，产生两个[10，50]之间的随机数，用这两个数构造一个复数，计算复
数的模、辐角(要求转换成角度)，最后将复数、复数的模和辐角显示在屏幕上。要求每
个占 7 列，保留 2 位小数，右对齐。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import random


def calculate_complex(comp: complex) -> tuple[float, float]:
    """Calculate the modulus and argument of a complex number"""

    # calculate the modulus
    modulus = abs(comp)
    # calculate the argument
    argument = comp.imag / comp.real

    return modulus, argument


if __name__ == '__main__':
    # generate two random numbers
    num1, num2 = random.uniform(10, 50), random.uniform(10, 50)
    # construct a complex number
    c = complex(num1, num2)
    # calculate the modulus and argument
    mod, arg = calculate_complex(c)
    # display the complex number, modulus and argument
    print(f'Complex number: {c:7.2f}')
    print(f'Modulus: {mod:7.2f}')
    print(f'Argument: {arg:7.2f}')
