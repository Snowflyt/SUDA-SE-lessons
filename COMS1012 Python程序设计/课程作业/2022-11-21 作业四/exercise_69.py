# -*- UTF-8 -*-

"""题目：
有一个弹性小球从H(H>=100)米的高度做自由落体运动，每次落地后会反弹，反弹高度
为上次下落高度的一半，然后继续下落，如此反复（假设反弹和下落不会停止）；编写
程序，计算并输出小球第N次落地时，共经过了多少米，第N次反弹的高度为多少。
"""


def assignment69(height: float, count: int) -> tuple[float, float]:
    """计算小球第count次落地时，共经过了多少米，第count次反弹的高度为多少"""

    total = height
    height /= 2
    for _ in range(count - 1):
        total += height * 2
        height /= 2

    return total, height


if __name__ == '__main__':
    # step1: 输入高度和反弹次数N的值
    h, n = int(input('请输入高度H: ')), int(input('请输入反弹次数N: '))
    # step2: 调用函数输出结果
    result = assignment69(h, n)
    print(result)
