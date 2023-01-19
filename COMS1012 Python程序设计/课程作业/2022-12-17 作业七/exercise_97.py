"""题目：
统计一个字符串中所有字符出现的次数。
例：给定'google.com'，输出: {'o': 3, 'g': 2, '.': 1, 'e': 1, 'l': 1, 'm': 1, 'c': 1}
"""


def assignment97(string: str) -> dict[str, int]:
    """返回一个字符串中所有字符出现的次数"""

    return {char: string.count(char) for char in string}


if __name__ == '__main__':
    s = 'google.com'
    res = assignment97(s)
    print(res)
