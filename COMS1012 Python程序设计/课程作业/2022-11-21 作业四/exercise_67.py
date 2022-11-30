# -*- UTF-8 -*-

"""题目：
提示用户输入一个整数n，然后输出[1, n)之间所有的素数。
提示：质数（prime number）又称素数，有无限个。
质数定义为在大于1的自然数中，除了1和它本身以外不再有其他因数的数称为质数。
例：输入n=10。输出：2，3，5，7
"""


def is_prime(num: int) -> bool:
    """判断num是否为素数"""

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


def assignment67(num: int) -> list[int]:
    """输出[1, num)之间的所有素数"""

    return [i for i in range(2, num) if is_prime(i)]


if __name__ == '__main__':
    # step1: 提示用户输入n
    n = int(input('请输入一个整数n: '))
    print(n)
    # step2: 调用函数输出[1,n)之间的所有素数
    result = assignment67(n)
    print(result)
