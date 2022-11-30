# pyright: strict

"""题目：
编写一个程序，提示用户输入三角形的三个顶点(x1，y1)、（x2，y2）、（x3， y3），然后
计算三角形面积，这里假定输入的三个点能构成三角形。将面积输 出到屏幕，要求输
出 占 7 列，保留 2 位小数，左对齐。 三角形面积公式如下：
s=(side1+side2+side3)/2,area=√(s(s-side1)(s-side2)(s-side3))
其中：side1,side2,side3 表示三角形三条边的长度
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import math


def calculate_square(side1: float, side2: float, side3: float) -> float:
    """calculate the square of a triangle"""
    heron_p = (side1 + side2 + side3) / 2
    return math.sqrt(heron_p * (heron_p - side1) * (heron_p - side2) * (heron_p - side3))


if __name__ == '__main__':
    x1, y1 = map(float, input('Enter x1 and y1 for Point1: ').split())
    x2, y2 = map(float, input('Enter x2 and y2 for Point2: ').split())
    x3, y3 = map(float, input('Enter x3 and y3 for Point3: ').split())

    s1 = math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
    s2 = math.sqrt((x3 - x2) ** 2 + (y3 - y2) ** 2)
    s3 = math.sqrt((x1 - x3) ** 2 + (y1 - y3) ** 2)

    square = calculate_square(s1, s2, s3)

    print(f'The area of the triangle is {square:7.2f}')
