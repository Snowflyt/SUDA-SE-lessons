# -*- UTF-8 -*-

"""题目：
从键盘输入一批学生的成绩（成绩为整数），输入0或负数则输入结束，
然后统计并输出优秀（大于等于90）、通过（60～89）和不及格（小于60）的人数。
"""


def assignment57(scores: list[int]) -> tuple[int, int, int]:
    """返回优秀人数、通过人数和不及格人数"""

    return (sum(1 for x in scores if x >= 90),
            sum(1 for x in scores if 60 <= x < 90),
            sum(1 for x in scores if x < 60))


if __name__ == '__main__':
    lst = []
    while True:
        score = int(input('请输入学生成绩: '))
        if score <= 0:
            break
        lst.append(score)

    lst_grad = assignment57(lst)
    print(f'优秀人数: {lst_grad[0]}')
    print(f'通过人数: {lst_grad[1]}')
    print(f'不及格人数: {lst_grad[2]}')
