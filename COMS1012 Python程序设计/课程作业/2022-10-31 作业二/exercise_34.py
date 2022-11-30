# -*- UTF-8 -*-

"""题目：
现有 5 名同学期末考试高数和线代成绩如下：
姓名 高数 线代
张飞 78 75
李大刀 92 67
李墨白 84 88
王老虎 84 50
雷小米 92 98
编写程序，按照高数成绩从高到低进行排序，如果高数分数一样，则按照线代分数从高
到低排序，最后输出姓名和相关成绩。
"""


def assignment35(student_scores: dict[str, tuple[int, int]]) -> dict[str, tuple[int, int]]:
    """按照高数成绩从高到低进行排序，如果高数分数一样，则按照线代分数从高到低排序"""
    return dict(sorted(student_scores.items(), key=lambda x: (x[1][0], x[1][1]), reverse=True))


if __name__ == '__main__':
    scores = {
        "张飞": (78, 75),
        "李大刀": (92, 67),
        "李墨白": (84, 88),
        "王老虎": (84, 50),
        "雷小米": (92, 98)
    }
    res = assignment35(scores)
    print(res)
