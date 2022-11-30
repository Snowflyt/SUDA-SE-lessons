# pyright: strict

"""题目：
编写一个程序，提示用户输入两个平面上点的坐标 A（x1,y1）、B(x2,y2)，然后计算该
两点间的距离。|AB|=√((x1-x2)^2+(y1-y2)^2 )
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import math


def calculate_distance(abs1: float, ord1: float, abs2: float, ord2: float) -> float:
    """calculate the distance between two points"""
    return math.sqrt((abs1 - abs2) ** 2 + (ord1 - ord2) ** 2)


if __name__ == '__main__':
    print('Please input the coordinates of point A, separated by spaces: ', end='')
    x1, y1 = map(float, input().split())
    print('Please input the coordinates of point B, separated by spaces: ', end='')
    x2, y2 = map(float, input().split())
    distance = calculate_distance(x1, y1, x2, y2)
    print(f'Distance: {distance}')
