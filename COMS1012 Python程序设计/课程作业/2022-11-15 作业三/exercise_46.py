# -*- UTF-8 -*-

"""题目：
小明带着N元钱去买酱油。酱油15块钱一瓶，商家进行促销，每买3瓶送1瓶，
或者每买5瓶送2瓶。请问小明最多可以得到多少瓶酱油。N的数值 由用户输入，
并且一定是整数。
"""


def assignment46(money: int) -> int:
    """根据money计算最多能买的酱油数量"""

    result = 0

    if money >= 15:
        result = money // 15

    if result >= 5:
        if result % 5 >= 3:
            result += result // 5 * 2 + 1
        else:
            result += result // 5 * 2
    elif result >= 3:
        result += 1

    return result


if __name__ == '__main__':
    # step1: 输入钱数
    money = int(input('请输入钱数: '))
    # step2: 计算能购买的酱油数量
    result = assignment46(money)
    print("{0:d}元钱最多能购买{1:d}瓶酱油".format(money, result))
