"""题目：
编写一个递归函数，求解Fibonacci数列（兔子繁殖）问题的某项的值。编写测试程序，
从键盘输入指定项，并输出Fibonacci数列指定项的值。
"""


def assignment91(num: int) -> int:
    """返回Fibonacci数列的指定项的值"""

    return 1 if num <= 2 else assignment91(num - 1) + assignment91(num - 2)


if __name__ == '__main__':
    n = int(input('请输入一个整数: '))
    res = assignment91(n)
    print(res)
