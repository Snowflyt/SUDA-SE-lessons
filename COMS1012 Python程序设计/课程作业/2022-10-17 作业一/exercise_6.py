# pyright: strict

"""题目：
编写一个程序，产生两个在[5，20]之间的随机正整数 a 和 b。a 代表班级的女生人数，
b 代表班级的男生人数，计算并输出女生占班级总人数的比例，要求输出比例结果采用
百分比形式，占 8 列，右对齐，保留 2 位小数。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

import random


def calculate_percentage(num1: int, num2: int) -> float:
    """calculate the percentage of num1 in num1 + num2"""
    return num1 / (num1 + num2) * 100


if __name__ == '__main__':
    girls, boys = random.randint(5, 20), random.randint(5, 20)
    print(f'Girls count: {girls}')
    print(f'Boys count: {boys}')
    percentage_girls = calculate_percentage(girls, boys)
    print(f'Percentage of girls in class: {percentage_girls:8.2f}%')
