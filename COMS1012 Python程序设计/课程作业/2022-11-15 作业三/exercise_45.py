# -*- UTF-8 -*-

"""题目：
制作一个选择菜单，用户从键盘输入选择。如果输入内容为1、2、3中的一个，输出选
择的语言名称+“是一款非常优秀的编程语言”；如果输入 4，则输出“退出成果”；输
入其他选项提示“选择有误”。菜单内容如下：
请选择你最喜欢的编程语言
[1]Python
[2]C++
[3]Java
[4]退出
"""


LANGUAGE_LIST = ['Python', 'C++', 'Java']


def assignment45(language_index: int) -> str:
    """根据语言索引，返回提示信息"""

    if 0 <= language_index < len(LANGUAGE_LIST):
        return f'{LANGUAGE_LIST[language_index]}是一款非常优秀的编程语言'

    if language_index == len(LANGUAGE_LIST):
        return '退出成果'

    return '选择有误'


if __name__ == '__main__':
    lang = input('请选择你最喜欢的编程语言\n'
                 '[1]Python\n'
                 '[2]C++\n'
                 '[3]Java\n'
                 '[4]退出\n')
    lang_index = int(lang) - 1
    print(assignment45(lang_index))
