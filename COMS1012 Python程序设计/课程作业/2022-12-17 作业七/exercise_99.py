"""题目：
IPv4采用32位2进制位数记录地址，在实际使用中IPv4地址通常使用点分十进制记
法表示，即使用.将IP地址平分为4段，每段地址使用0~255范围内的十进制无符号整
数表示，例如192.168.1.1。另外IPv4地址根据第一段IP的值分为5类地址，如下表所
示，例如192.168.1.1是一个C类地址。编写一个程序，从键盘输入一个字符串形式的
IP地址，判断IP地址是否是合法的IPv4地址，如果是合法地址，判断其地址类型。
"""


def assignment99(ip_string: str) -> str | None:
    """判断是否为ip地址。若是，是几类地址；若不是，返回None"""

    # 判断是否为合法的ipv4地址
    if len(ip_string.split('.')) != 4:
        return None
    for i in ip_string.split('.'):
        if not i.isdigit() or not 0 <= int(i) <= 255:
            return None

    # 判断地址类型
    if 0 <= int(ip_string.split('.')[0]) <= 127:
        return 'A'
    if 128 <= int(ip_string.split('.')[0]) <= 191:
        return 'B'
    if 192 <= int(ip_string.split('.')[0]) <= 223:
        return 'C'
    if 224 <= int(ip_string.split('.')[0]) <= 239:
        return 'D'
    if 240 <= int(ip_string.split('.')[0]) <= 255:
        return 'E'
    return None


if __name__ == '__main__':
    ip_addr = '192.168.1.1'
    res = assignment99(ip_addr)
    if res is None:
        print(f'{ip_addr}不是合法的ipv4地址')
    else:
        print(f'{ip_addr}是{res}类地址')
