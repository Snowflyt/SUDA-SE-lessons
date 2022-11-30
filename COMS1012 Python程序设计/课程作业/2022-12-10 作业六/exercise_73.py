"""题目：
学校举办了“十佳歌手大赛”，有若干名选手参赛，7名评委分别对这些选手进行了评分，
评分范围为0~10。评分去掉最高分和最低分后取平均值，这个平均值将作为选手的最
终得分。编写程序，计算并输出这些选手的姓名和最终得分，得分保留一位小数。
"""


def assignment73(tpl: tuple[float, ...]) -> float:
    """返回元组内的元素去掉最高分和最低分后的平均值（保留一位小数）"""

    return round((sum(tpl) - max(tpl) - min(tpl)) / (len(tpl) - 2), 1)


if __name__ == '__main__':
    scores = tuple(eval(input('请输入七名评委的评分，评分范围为0~10，存储在元组中，如(7,8,8,8,8,8,9): ')))
    res = assignment73(scores)
    print(res)
