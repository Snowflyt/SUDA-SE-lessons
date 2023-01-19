"""题目：
给定字符串，将其中的单词倒序输出。例：给定'What a wonderful day!'，输出: 'day| wonderful a What'。
"""


def assignment96(string: str) -> str:
    """返回单词倒序的字符串"""

    return ' '.join(string.split()[::-1])


if __name__ == '__main__':
    s = 'What a wonderful day!'
    res = assignment96(s)
    print(res)
