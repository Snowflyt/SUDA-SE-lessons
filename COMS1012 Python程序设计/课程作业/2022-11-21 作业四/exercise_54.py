# -*- UTF-8 -*-

"""题目：
从键盘输入一个字母， 如果输入的是小写英文字母， 请将其转换为大写字母后显示输出；
如果输入的是大写英文字母，请将其转换为小写字母后显示输出；如果既不是小写英文
字母、也不是大写英文字母，则原样显示。
"""


def assignment54(character: str) -> str:
    """返回一个字母的大小写转换结果。如果不是字母，则原样返回"""

    if character.islower():
        return character.upper()
    if character.isupper():
        return character.lower()
    return character


if __name__ == '__main__':
    char = input('请输入一个字母: ')
    result = assignment54(char)
    print(result)
