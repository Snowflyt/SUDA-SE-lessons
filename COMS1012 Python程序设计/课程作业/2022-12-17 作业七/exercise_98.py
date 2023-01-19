"""题目：
从键盘输入2个字符串，第一个是待过滤字符串，第二个是过滤字符集合，
将待过滤字符串按照过滤字符集合进行过滤，最后将过滤后的字符串输出。
例如带过滤字符串为1+2=3，过滤字符集为+=，过滤结果为123
"""


def assignment98(string: str, filters: str) -> str:
    """对输入的字符串按照过滤字符集进行过滤"""

    return ''.join(char for char in string if char not in filters)


if __name__ == '__main__':
    s = '1+2=3'
    f = '+='
    res = assignment98(s, f)
    print(res)
