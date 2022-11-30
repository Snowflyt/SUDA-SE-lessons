# -*- UTF-8 -*-

"""题目：
从键盘输入两个浮点数x1和y1作为圆心坐标，从键盘输入一个浮点数r作为半径，这
样就在XOY二维平面上唯一地确定了一个圆。再从键盘输入两个浮点数x2和y2，编
写程序以判断坐标点(x2,y2)是在圆内还是在圆外（注：在圆周上也是在圆内），并显示
相应的判断结果。
"""


import math


def assignment50(center: tuple[float, float], radius: float, point: tuple[float, float]) -> str:
    """判断坐标点与圆的位置"""

    # step1: 计算圆心到point的距离
    distance = ((center[0] - point[0]) ** 2 +
                (center[1] - point[1]) ** 2) ** 0.5

    # step2: 判断point与圆的位置
    if distance < radius:
        return '点在圆内'
    if math.isclose(distance, radius):
        return '点在圆上'
    return '点在圆外'


if __name__ == '__main__':
    # step1: 输入圆心坐标和半径
    center = tuple(map(float, input('请输入圆心坐标，格式为x,y: ').split(',')))
    radius = float(input('请输入圆的半径: '))
    # step2: 输入点坐标
    point = tuple(map(float, input('请输入点坐标，格式为x,y: ').split(',')))
    # step3: 调用函数判断点与圆的位置
    print(assignment50(center, radius, point))  # type: ignore
