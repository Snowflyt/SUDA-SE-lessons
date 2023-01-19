"""题目：
制作一个密码加密工具，从键盘输入一个字符串，然后输出加密结果。设计一个字典，
英文字母使用一个两位数表示，数字使用一个小写英文字母表示。加密过程根据字典将
字符串的字符逐一替换。
"""


def encrypt(string: str, encryption_dict: dict) -> str:
    """返回用加密字典加密后的字符串"""

    return ''.join(encryption_dict.get(c, c) for c in string)


def decrept(string: str, encryption_dict: dict) -> str:
    """
    返回用加密字典解密后的字符串
    英文字母必须用两位数表示，数字必须用小写英文字母表示
    """

    # 生成一个反向字典
    decryption_dict = {v: k for k, v in encryption_dict.items()}

    # 用反向字典解密
    tmp = ''  # 用来处理两位数
    result = ''
    for c in string:
        if c.isdigit() and not tmp:
            tmp = c
        elif c.isdigit() and tmp:
            tmp += c
            result += decryption_dict[tmp]
            tmp = ''
        else:
            result += decryption_dict[c]

    return result


if __name__ == '__main__':
    s = input('请输入一个字符串: ')

    # 加密字典，英文字母使用一个两位数表示，数字使用一个小写英文字母表示
    e_dict = {chr(i): str(i - 87) for i in range(97, 123)}
    e_dict.update({str(i): chr(i + 97) for i in range(10)})
    print(e_dict)

    encrypt_string = encrypt(s, e_dict)
    print(encrypt_string)

    decrypt_string = decrept(encrypt_string, e_dict)
    print(decrypt_string)
