# -*- UTF-8 -*-

"""题目：
已知一个整数列表，筛选出该列表中不同的质数，
并求出该列表中有多少个质数可以表达为该列表中另外两个**质数**的和。
"""

import random


def is_prime(num: int) -> bool:
    """判断n是否为质数"""
    if num < 2:
        return False
    if num < 4:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    for i in range(5, int(num**0.5)+1, 6):
        if num % i == 0 or num % (i+2) == 0:
            return False
    return True


# 例子：input:lst = [1,2,3,3,4,5,5,5,6,7,8,11,13,12,24,25]
# result1:[2,3,5,7,11,13] lst中所有不重复的质数
# result2:[3,5,7,13]  result1中能表示成另外两个元素的和的质数
# <- 答案有误：应为[5, 7, 13]
def assignment28(nums: list[int]) -> tuple[list[int], list[int]]:
    """筛选出该列表中不同的质数，并求出该列表中有多少个质数可以表达为该列表中另外两个质数的和"""

    # step1: 找出lst中的所有质数，并且要求在结果中不重复
    result1 = list(filter(is_prime, set(nums)))

    # step2: 找出result1中能表示成另外两个元素的和的元素
    result2 = [i for i in result1
               if any(i == j + k
                      for j in nums
                      for k in nums
                      if j != k)]

    return result1, result2


if __name__ == '__main__':
    n = random.randint(20, 40)
    lst = [random.randint(1, 100) for _ in range(n)]

    res1, res2 = assignment28(lst)

    print(res1, res2)
