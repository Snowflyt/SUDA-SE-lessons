# -*- UTF-8 -*-

"""题目：
从键盘分别输入3个XOY二维平面内某三角形的顶点坐标（6个浮点数），在此基础上
计算三角形的面积和周长。如果不能构成三角形需要提示错误信息。
"""


def assignment48(point1: tuple[float, float],
                 point2: tuple[float, float],
                 point3: tuple[float, float]) -> tuple[float, float]:
    """根据三角形三个顶点的坐标，计算三角形面积和周长"""

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

    # step3: 计算三角形的周长
    perimeter = side1 + side2 + side3

    # step4: 计算三角形的面积
    p = perimeter / 2
    area = (p * (p - side1) * (p - side2) * (p - side3)) ** 0.5

    return area, perimeter


if __name__ == '__main__':
    # step1: 输入三个点坐标，并构成一个包含3个元素的二维列表
    lstPoint = eval(input('请输入三个点坐标，格式为：[[x1,y1],[x2,y2],[x3,y3]]: '))
    p1, p2, p3 = map(tuple, lstPoint)
    # step2: 调用计算三角形面积和周长
    a, p = assignment48(p1, p2, p3)  # type: ignore
    print(f'面积为:{a:.4f},周长为:{p:.4f}')
