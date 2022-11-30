# -*- UTF-8 -*-

"""题目：
现有 5 名同学期中考试高数和线代成绩如下：
姓名 高数 线代
张飞 78 75
李大刀 92 67
李墨白 84 88
王老虎 50 50
雷小米 99 98
编写程序按照总分从高到低进行排序后输出姓名和成绩。
"""


def assignment34(student_scores: dict[str, tuple[int, int]]) -> dict[str, tuple[int, int]]:
    """按照总分从高到低进行排序后输出姓名和成绩"""
    return dict(sorted(student_scores.items(), key=lambda x: sum(x[1]), reverse=True))


if __name__ == '__main__':
    scores = {
        "张飞": (78, 75),
        "李大刀": (92, 67),
        "李墨白": (84, 88),
        "王老虎": (50, 50),
        "雷小米": (99, 98)
    }
    res = assignment34(scores)
    print(res)
