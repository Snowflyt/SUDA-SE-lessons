# pyright: strict

"""题目：
一只大象口渴了，要喝 20 升水才能解渴，但现在只有一个深 h 厘米，底面半径为 r 厘
米的小圆桶(h 和 r 都是整数)。问大象至少要喝多少桶水才会解渴。编写程序输入半径
和高度，输出需要的桶数（一定是整数）。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import math


WATER_NEEDED = 20


def calc_buckets(radius: int, height: int) -> int:
    """calculate the number of buckets needed to quench the thirst of an elephant"""

    # the volume of a bucket
    bucket_volume = math.pi * radius ** 2 * height

    # the volume of water needed to quench the thirst of an elephant
    water_needed = WATER_NEEDED

    return math.ceil(water_needed / bucket_volume)


if __name__ == '__main__':
    print('Please input the radius and height of the bucket, separated by spaces: ', end='')
    r, h = map(int, input().split())
    buckets = calc_buckets(r, h)
    print(f'Buckets: {buckets}')
