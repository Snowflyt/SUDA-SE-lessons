"""题目：
通过[0,500]范围内随机数发生的方法分别创建两个整数数据的集合，要求每个集合中数
据的个数分别要超过200个。在此基础上实现：
a) 求出两个集合中不相同的数据，并进行显示。要求每行显示10条，每个数占5列，右对齐；
b) 求出两个集合中相同的数据，并进行显示。要求每行显示10条，每个数占5列，右对齐；
"""


import random


def assignment84(num_set1: set[int], num_set2: set[int]) -> None:
    """求两个集合中不同与相同的数据，并按照要求打印"""

    # 求两个集合中不同的数据，按照要求打印
    print('两个集合中不同的数据为:')
    for i, num in enumerate(num_set1 ^ num_set2):
        print(f'{num:5}', end='')
        if (i + 1) % 10 == 0:
            print()
    print()

    # 求两个集合中相同的数据，按照要求打印
    print('两个集合中相同的数据为:')
    for i, num in enumerate(num_set1 & num_set2):
        print(f'{num:5}', end='')
        if (i + 1) % 10 == 0:
            print()


if __name__ == '__main__':
    nums1 = set(random.randint(0, 500) for _ in range(201))
    nums2 = set(random.randint(0, 500) for _ in range(201))
    assignment84(nums1, nums2)
