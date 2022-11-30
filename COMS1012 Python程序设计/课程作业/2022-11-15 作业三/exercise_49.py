# -*- UTF-8 -*-

"""题目：
从键盘分别输入3个XOY 二维平面内某三角形的顶点坐标（6个浮点数），判断该三角
形是等边三角形、直角三角形或其它三角形（不属于上述两种）中的哪一种。如果不能
构成三角形需要提示错误信息。
"""


import math


def assignment49(point1: tuple[float, float],
                 point2: tuple[float, float],
                 point3: tuple[float, float]) -> str:
    """根据三角形三个顶点的坐标，判断三角形的类型"""

    # step1: 计算三角形的三条边长
    side1 = ((point1[0] - point2[0]) ** 2 +
             (point1[1] - point2[1]) ** 2) ** 0.5
    side2 = ((point2[0] - point3[0]) ** 2 +
             (point2[1] - point3[1]) ** 2) ** 0.5
    side3 = ((point3[0] - point1[0]) ** 2 +
             (point3[1] - point1[1]) ** 2) ** 0.5

    # step2: 判断三条边长是否能构成三角形
    if side1 + side2 <= side3 or side1 + side3 <= side2 or side2 + side3 <= side1:
        raise ValueError('不能构成三角形')

    # step3: 判断三角形的类型
    if math.isclose(side1, side2) and math.isclose(side1, side3):
        return '等边三角形'

    if (math.isclose(side1 ** 2 + side2 ** 2, side3 ** 2) or
            math.isclose(side1 ** 2 + side3 ** 2, side2 ** 2) or
            math.isclose(side2 ** 2 + side3 ** 2, side1 ** 2)):
        return '直角三角形'

    return '其它三角形'


if __name__ == '__main__':
    # step1: 输入三个点坐标，并构成一个包含3个元素的二维列表
    p1, p2, p3 = map(tuple, eval(
        input('请输入三个点坐标，格式为：[[x1,y1],[x2,y2],[x3,y3]]: ')))
    # step2: 调用函数判断三角形特征
    print(assignment49(p1, p2, p3))  # type: ignore
