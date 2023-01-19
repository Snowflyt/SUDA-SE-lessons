"""题目：
编写一个函数，判断一个密码（用字符串表示）是否是好密码。一个好的密码满足：
a) 长度不小于8；
b) 至少含有一个数字；
c) 至少含有一个小写字母；
d) 至少含有一个大写字母。
如果密码是好密码，返回True，否则返回False。
"""


def assignment102(password: str) -> bool:
    """判断是否为一个好密码"""

    return (len(password) >= 8 and
            any(char.isdigit() for char in password) and
            any(char.islower() for char in password) and
            any(char.isupper() for char in password))


if __name__ == '__main__':
    passwd = '123456789abcD'
    res = assignment102(passwd)
    print(res)
