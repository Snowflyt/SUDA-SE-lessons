"""题目：
一个字符串如果正读和反读都一样，那么它就是一个回文串。
编写一个函数，判断一个字符串在下列规则下是否是回文串:
1）忽略所有空格；
2）忽略所有的句号、逗号、感叹号；
3）不区分大小写。如果是回文串，返回True，否则返回False。
"""


def assignment104(string: str) -> bool:
    """判断忽略空格、句号、逗号、感叹号后的字符串是否为回文串"""

    result = string.replace(' ', '').replace(',', '').replace('.', '').replace('!', '').lower()
    return result == result[::-1]


if __name__ == '__main__':
    s = 'ab,b a'
    res = assignment104(s)
    print(res)
