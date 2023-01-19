"""题目：
写一个程序，用户输入一个字符串s，返回一个由s的前2个字符和后2个字符组成的
新字符串。如果s的长度小于2，则返回空字符串。
例：输入'python'，返回'pyon'。
"""


def assignment94(string: str) -> str:
    """对输入的字符串按照题意进行处理，返回一个新的字符串"""

    return '' if len(string) < 2 else string[:2] + string[-2:]


if __name__ == '__main__':
    s = 'python'
    res = assignment94(s)
    print(res)
