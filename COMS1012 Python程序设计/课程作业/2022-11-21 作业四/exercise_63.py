# -*- UTF-8 -*-

"""题目：
假设某人每月计划给地铁卡充一些钱用于坐公交， 已知当地地铁票费用按照下表进行计
算。 编写一个程序， 从键盘输入充值金额， 计算并输出充值的金额最多能坐多少次公交。
当月累计次数 票价
1~10 2 元（原价）
10~20 原价 9.5 折
21-50 原价 8 折
51 次以上 原价 5 折
"""


def assignment63(money: float, price: float) -> int:
    """返回最多能坐多少次公交"""

    if money >= price * 0.5 * 51:
        return int(money // (price * 0.5))

    if money >= price * 0.8 * 21:
        return int(money // (price * 0.8))

    if money >= price * 0.95 * 10:
        return int(money // (price * 0.95))

    return int(money // price)


if __name__ == '__main__':
    m = float(input('请输入充值金额: '))
    res = assignment63(m, 2)
    print("最多能坐公交的次数", res)
