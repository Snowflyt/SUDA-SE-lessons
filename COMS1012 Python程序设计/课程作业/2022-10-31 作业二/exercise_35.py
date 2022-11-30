# -*- UTF-8 -*-

"""题目：
从键盘输入n，打印n阶魔方阵（n为奇数）。
魔方阵的每一行、每一列和两个对角线的和都相等。
"""

# 例子1：输入 n=3
#       输出:[8,1,6,3,5,7,4,9,2]
# 3x3的矩阵
# 8 1 6
# 3 5 7
# 4 9 2
# 提示：查阅魔方阵的生成方法，然后设计算法实现魔方阵的生成
def assignment35(order: int) -> list[int]:
    """输出order阶魔方阵"""

    # step1: 判断order是否为奇数
    if order % 2 == 0:
        raise ValueError("order must be odd")

    # step2: 初始化魔方阵
    magic_square = [[0 for _ in range(order)] for _ in range(order)]

    # step3: 生成魔方阵
    i, j = 0, order // 2
    for num in range(1, order ** 2 + 1):
        magic_square[i][j] = num
        i, j = (i - 1) % order, (j + 1) % order
        if magic_square[i][j] != 0:
            i = (i + 2) % order
            j = (j - 1) % order

    # step4: 将魔方阵转换为一维数组
    return [magic_square[i][j] for i in range(order) for j in range(order)]


if __name__ == '__main__':
    res = assignment35(3)
    print(res)
