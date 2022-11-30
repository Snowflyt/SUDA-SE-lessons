"""题目：
编写一个程序，输入一个字符串，然后显示一个选择菜单，选1英文字符全部转换为大
写，选2小写英文字符全部转换为大写，最后将结果输出。要求利用函数实现单个字符
的大小写转换。
"""


def assignment87(string: str, upper: bool) -> str:
    """根据输入模式，将字符串转化为大写或小写"""

    return string.upper() if upper else string.lower()


if __name__ == '__main__':
    s = input('请输入一个字符串: ')
    mode = int(input('请选择模式(1:大写,2:小写): '))
    result = assignment87(s, mode == 1)
    print(result)
