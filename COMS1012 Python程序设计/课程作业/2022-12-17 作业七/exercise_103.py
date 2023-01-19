"""题目：
编写一个函数，将一个a进制的数转换成一个b进制的数，其中a和b都在[2, 16]之间。
该函数有3个参数，前两个参数分别是a和b，第三个参数是一个字符串，表示a进制
的数。如果a和b不在给定范围之内，返回None，否则返回对应的b进制数
"""


def assignment103(decimal1: int, decimal2: int, number: str) -> str | None:
    """将一个decimal1进制的数转换成一个decimal2进制的数"""

    if decimal1 < 2 or decimal1 > 16 or decimal2 < 2 or decimal2 > 16:
        return None

    result = ''
    num = 0
    for index, char in enumerate(number):
        if '0' <= char <= '9':
            num += (ord(char) - ord('0')) * (decimal1 ** (len(number) - index - 1))
        else:
            num += (ord(char) - ord('a') + 10) * (decimal1 ** (len(number) - index - 1))

    while num > 0:
        if num % decimal2 >= 10:
            result = chr(num % decimal2 - 10 + ord('a')) + result
        else:
            result = str(num % decimal2) + result
        num //= decimal2

    return result


if __name__ == '__main__':
    a, b, c = 13, 10, 'a'
    res = assignment103(a, b, c)
    print(res)
