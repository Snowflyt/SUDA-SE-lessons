# pyright: strict

"""题目：
编写一个程序，产生一个在[5，20]之间的随机实数。假设该随机数是一个圆锥的底面半
径，已知高度为 10，请计算该圆锥的体积。将底面半径、高和体积输出到屏幕上，输出
时每个值占 10 列，保留 3 位小数，右对齐。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import math
import random


def calculate_volume(radius: float, height: float) -> float:
    """calculate the volume of a cone"""
    return math.pi * radius ** 2 * height / 3


if __name__ == '__main__':
    r, h = random.uniform(5, 20), 10
    print(f'Radius: {r:10.3f}')
    print(f'Height: {h:10.3f}')
    volume = calculate_volume(r, h)
    print(f'Volume: {volume:10.3f}')
