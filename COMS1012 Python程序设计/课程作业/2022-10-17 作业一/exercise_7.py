# pyright: strict

"""题目：
编写一个程序，产生一个在[5，20]之间的随机实数。假设该随机数是一个球的半径，请
计算该球的体积。最后将球的半径和体积输出到屏幕上，要求每个值占 15 列，保留 3
位小数，右对齐。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import math
import random


def calculate_volume(radius: float) -> float:
    """calculate the volume of a sphere"""
    return (4 / 3) * math.pi * radius ** 3


if __name__ == '__main__':
    r = random.uniform(5, 20)
    print(f'Radius: {r:15.3f}')
    volume = calculate_volume(r)
    print(f'Volume: {volume:15.3f}')
