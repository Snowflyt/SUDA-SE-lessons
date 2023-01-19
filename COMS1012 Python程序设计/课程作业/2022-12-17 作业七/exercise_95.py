"""题目：
写一个程序处理用户输入的字符串，并按用户要求删除其中第n个字符，返回删除字符后的字符串。
"""


def assignment95(string: str, num: int) -> str:
    """删除输入字符串中第num个字符，返回新的字符串，假设num小于等于字符串长度"""

    return string[:num - 1] + string[num:]


if __name__ == '__main__':
    s, n = 'hellow wolrd', 3
    res = assignment95(s, n)
    print(res)
