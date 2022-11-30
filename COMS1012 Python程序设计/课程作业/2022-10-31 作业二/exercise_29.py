# -*- UTF-8 -*-

"""题目：
用筛法求 500 之内的所有质数，并打印输出所有的质数，每行输出 5 个质数。
"""

def assignment29() -> list[int]:
    """用筛法求500之内的所有质数"""
    primes = []
    for num in range(2, 500):
        for j in range(2, num):
            if num % j == 0:
                break
        else:
            primes.append(num)
    return primes


if __name__ == '__main__':
    res = assignment29()
    for i in range(0, len(res), 5):
        print(' '.join(map(str, res[i:i+5])))
