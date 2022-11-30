# -*- UTF-8 -*-

"""题目：
制作一个确认对话框，如下：
Confirm？(Y[es] or N[o])
从键盘输入内容，如果输入为Y或Yes或YES或yes，则输出“Confirmed”；如果输入
为N或No或NO或no，则输出“Not Confirmed”；输入其他内容则输出“输入错误”
"""


def assignment44(command: str) -> str:
    """根据输入的指令，返回对应的响应"""

    if command in ('Y', 'Yes', 'YES', 'yes'):
        return 'Confirmed'

    if command in ('N', 'No', 'NO', 'no'):
        return 'Not Confirmed'

    return '输入错误'


if __name__ == '__main__':
    cmd = input('Confirm？(Y[es] or N[o])')
    print(assignment44(cmd))
