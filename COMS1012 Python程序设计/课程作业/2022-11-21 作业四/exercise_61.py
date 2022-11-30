# -*- UTF-8 -*-

"""题目：
计算s=a+aa+aaa+aaaa+aa...a的结果，其中a是0-9的数字，有n个数相加（最大的数有n位）。
例如2+22+222+2222+22222（此时共有5个数相加）。
编写程序，随机生成a，从键盘输入n，将公式进行输出，并输出计算结果。
"""


import random


def assignment61(num: int, repeat: int) -> tuple[str, int]:
    """返回一个元组，第一个元素是公式，第二个元素是计算结果。"""

    nums = tuple(int(str(num) * i) for i in range(1, repeat + 1))
    return '+'.join(map(str, nums)), sum(nums)


if __name__ == '__main__':
    # 初始化a是一个0-9的数字
    a = random.randint(0, 9)
    # 输入n
    n = int(input('输入n: '))
    print(f'a={a:2d}; n={n:3d}')
    result = assignment61(a, n)
    print(result)
