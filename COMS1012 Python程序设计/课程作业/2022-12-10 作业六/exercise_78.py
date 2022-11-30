"""题目：
制作一个密码加密工具，从键盘输入一个字符串，然后输出加密结果。设计一个字典，
英文字母使用一个两位数表示，数字使用一个小写英文字母表示。加密过程根据字典将
字符串的字符逐一替换。
"""


def assignment78(string: str, encrypt_dict: dict) -> str:
    """返回用加密字典加密后的字符串"""

    return ''.join(encrypt_dict.get(c, c) for c in string)


if __name__ == '__main__':
    s = input('请输入一个字符串: ')
    e_dict = {chr(i): str(i) for i in range(97, 123)}
    res = assignment78(s, e_dict)
    print(res)
