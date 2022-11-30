# -*- UTF-8 -*-

"""题目：
编写程序对一个4*4的矩阵进行随机赋值，
然后对该矩阵进行转置，并输出转置后的结果。
"""

import random


def assignment32(matrix: list[list[int]]) -> list[list[int]]:
    """对一个4*4的矩阵进行转置，并返回转置后的结果"""

    # step1: 判断矩阵是否是4*4的
    if len(matrix) != 4 or len(matrix[0]) != 4:
        raise ValueError("matrix must be 4*4")

    # step2: 对矩阵进行转置
    result = [[0] * 4 for _ in range(4)]
    for i in range(4):
        for j in range(4):
            result[j][i] = matrix[i][j]

    return result


if __name__ == '__main__':
    mat = [[random.randint(0, 100) for _ in range(4)] for _ in range(4)]
    res = assignment32(mat)
    print(res)
