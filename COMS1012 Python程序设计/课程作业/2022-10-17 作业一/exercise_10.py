# pyright: strict

"""题目：
公园要修一道长 x 米，宽 y 米，高 z 米的围墙，每立方米用砖 600 块。编写一个程序，
提示用户从键盘输入 x、y 和 z，输出所需砖块的数量。（尺寸为浮点数，砖块为整数）
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_bricks(length: float, width: float, height: float) -> int:
    """calculate the number of bricks needed"""
    return int(length * width * height * 600)


if __name__ == '__main__':
    print('Please input the length, width and height of the wall, separated by spaces: ', end='')
    x, y, z = map(float, input().split())
    bricks = calculate_bricks(x, y, z)
    print(f'Bricks: {bricks}')
