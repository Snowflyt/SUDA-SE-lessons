# -*- UTF-8 -*-

"""题目：
有一条地铁线一共有30个站点，这些站点编号为0~29，已知所有相邻站点间的距离，
distance[i]表示编号为i的车站到编号为i+1车站间的距离，单位为km，站距均在
1.5km~3.0km间。假设地铁的车票和距离有关，基础票价为2元（5km内），超过5km后
每5km增加1元（不满5km的部分按1元计算）。编写一个程序，计算花n元最多能
乘坐多少站(站数不包括起点站，包括终点站)。
"""


import random


def assignment64(distances: list[float], money: float) -> int:
    """返回最多能乘坐的站数"""

    result = 0

    for start in range(len(distances)):
        for end in range(start + 1, len(distances) + 1):
            if sum(distances[start:end]) <= (money - 2) * 5 + 5:
                result = max(result, end - start)

    return result


if __name__ == '__main__':
    dists = [3, 3, 3, 3, 3, 1.5, 1.5, 3, 3, 3, 3, 3,
             2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    # step1: 产生[1,15]的随机整数
    m = random.randint(1, 15)
    res = assignment64(dists, m)
    print(f'{m:3d}元最多能乘坐的车站数:{res:3d}')
