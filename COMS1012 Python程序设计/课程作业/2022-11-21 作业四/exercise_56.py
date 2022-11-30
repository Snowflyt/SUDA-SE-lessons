# -*- UTF-8 -*-

"""题目：
一块球拍售价15元，球3元，水2元。现在有N元，要求每种商品至少购买一个，有多少种可能正好把这N元花完?
"""


def assignment56(money: int) -> int:
    """返回正好花完的可能数"""

    return sum(1 for i in range(money // 15 + 1)
               for j in range(money // 3 + 1)
               for k in range(money // 2 + 1)
               if i * 15 + j * 3 + k * 2 == money)


if __name__ == '__main__':
    n = int(input('输入N元钱: '))
    res = assignment56(n)
    print(res)
