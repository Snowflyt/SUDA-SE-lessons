"""题目：
反素数指一个素数将其逆向拼写后也是一个素数的非回文数。例如：17和71都是素
数且都不是回文数，所以17和71都是反素数。请编写一个函数判断一个数是否是反
素数？并编写测试程序找出前30个反素数输出到屏幕上，要求每行输出8个数，每个
数占5列，右对齐。
"""


def is_prime(num: int) -> bool:
    """判断一个数是不是素数"""

    if num < 2:
        return False

    if num < 4:
        return True

    if num % 2 == 0 or num % 3 == 0:
        return False

    for i in range(5, int(num ** 0.5) + 1, 6):
        if num % i == 0 or num % (i + 2) == 0:
            return False

    return True


def is_palindrome(num: int) -> bool:
    """判断一个数是不是回文数"""

    return str(num) == str(num)[::-1]


def assignment90(num: int) -> bool:
    """判断一个数是不是反素数"""

    return is_prime(num) and is_prime(int(str(num)[::-1])) and not is_palindrome(num)


if __name__ == '__main__':
    count, n = 0, 1
    while count < 30:
        if assignment90(n):
            print(f'{n:5}', end='')
            count += 1
            if count % 8 == 0:
                print()
        n += 1
