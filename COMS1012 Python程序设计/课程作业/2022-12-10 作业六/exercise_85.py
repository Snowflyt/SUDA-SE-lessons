"""题目：
使用random模块生成一个整数类型的随机数集合：生成100个[0,1000]范围内的随机数。
这些数字组成集合A。同理，按此方法生成集合B。在此基础上实现以下功能：
a) 显示A和B的结果。要求每行最多显示10个数，每个数占5列，右对齐；
b) 要求用户输入A|B和A&B的结果，并告诉用户的答案是否正确。如果用户回答错
   误，允许修改答案，然后重新验证用户输入的答案。如果用户三次提交的答案均不
   正确，程序将显示正确结果。
"""


import random


def assignment85(num_set_a: set[int], num_set_b: set[int]) -> None:
    """主函数"""

    # step1: 按照每行最多10个，每个数占5列，右对齐的格式打印A和B
    print('A:')
    for i, num in enumerate(num_set_a):
        print(f'{num:5}', end='')
        if i % 10 == 9:
            print()
    print('\nB:')
    for i, num in enumerate(num_set_b):
        print(f'{num:5}', end='')
        if i % 10 == 9:
            print()
    print()

    # step2: 要求用户输入A|B和A&B的结果，若错误可以修改，最多输入3次，3次后输出正确结果
    for i in range(3):
        a_union_b = set(int(num) for num in input('请输入A|B的结果: ').split())
        a_intersection_b = set(int(num) for num in input('请输入A&B的结果: ').split())
        if a_union_b == num_set_a | num_set_b and a_intersection_b == num_set_a & num_set_b:
            print('答案正确')
            break
        print('答案错误')
    else:
        print('正确答案为：')
        print('A|B:', num_set_a | num_set_b)
        print('A&B:', num_set_a & num_set_b)


if __name__ == '__main__':
    # step1: 生成100个[0,1000]范围内的随机数，组成集合A和集合B
    a = set(random.randint(0, 1000) for _ in range(100))
    b = set(random.randint(0, 1000) for _ in range(100))

    # step2: 主函数
    assignment85(a, b)
