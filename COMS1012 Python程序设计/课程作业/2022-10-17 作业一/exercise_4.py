# pyright: strict

"""题目：
编写一个程序，让用户输入自己姓名，输出该姓名字符串的长度。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_length(string: str) -> int:
    """calculate the length of a string"""
    return len(string)


if __name__ == '__main__':
    print('Please input your name: ', end='')
    length = calculate_length(input())
    print(f'The length of your name is {length}')
