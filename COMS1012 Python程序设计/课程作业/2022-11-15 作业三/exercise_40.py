# -*- UTF-8 -*-

"""题目：
从键盘输入任意3个整数，按从小到大的顺序输出。
"""


def assignment40(num1: int, num2: int, num3: int) -> tuple[int, int, int]:
    """按从小到大的顺序返回3个整数"""

    a = min(num1, num2, num3)

    if a == num1:
        b = min(num2, num3)
        c = max(num2, num3)
    elif a == num2:
        b = min(num1, num3)
        c = max(num1, num3)
    else:
        b = min(num1, num2)
        c = max(num1, num2)

    return a, b, c


if __name__ == '__main__':
    a, b, c = map(int, input('请输入3个整数: ').split())
    res = assignment40(a, b, c)
    print(res)
