"""题目：
从键盘上随机输入若干个大写英文字母，编写程序使用字典统计所输入的每个字母出现的次数。
"""


def assignment74(string: str) -> dict[str, int]:
    """统计字符串中各个字符出现的次数"""

    return {c: string.count(c) for c in string}


if __name__ == '__main__':
    s = input('请输入若干个大写英文字母: ')
    res = assignment74(s)
    print(res)
