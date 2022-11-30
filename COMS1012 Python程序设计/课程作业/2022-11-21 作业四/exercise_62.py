# -*- UTF-8 -*-

"""题目：
有一列表，存放有若干同学的姓名，编写程序将这些信息分成两组，元素顺序为偶数的
放在一组，奇数的放在另一组，然后将分组的信息进行输出。例如：
["张三","李四", "王五", "赵六", "孙七"," 周八", "吴九"]
分组     1    2     3    4    5
奇数组  张三  王五   孙七 吴九
偶数组  李四  赵六  周八
"""


import math


def assignment62(names: list[str]) -> tuple[list[str], list[str]]:
    """返回奇数组和偶数组"""

    return names[::2], names[1::2]


if __name__ == '__main__':
    # step1: 构建名字列表，例如：lstName=['张三', '王五', '孙七', '吴九']
    lst_names = ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九']
    print(lst_names)

    # step2: 分组，分成两个list
    lstGroup = assignment62(lst_names)
    print('分组    ', end='')
    for i in range(math.ceil(len(lst_names) / 2)):
        print(f'{i + 1:8d}', end='')
    print()

    # step3: 输出奇数组的名字信息，每个名字占8列，右对齐
    print('奇数组  ', end='')
    for name in lstGroup[0]:
        print(f'{name:>8s}', end='')
    print()

    # step4: 输出偶数组的名字信息，每个名字占8列，右对齐
    print('偶数组  ', end='')
    for name in lstGroup[1]:
        print(f'{name:>8s}', end='')
    print()
