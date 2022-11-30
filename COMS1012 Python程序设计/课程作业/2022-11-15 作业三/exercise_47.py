# -*- UTF-8 -*-

"""题目：
假设银行对1年期的存款利息计算法方法如下：如果存款金额I小于10万元，则按照
1.5%的年利率计算利息；如果存款金额I大于等于10万元，但小于50万元，则按照
2%的年利率计算利息；如果存款金额I大于等于50万元，但小于100万元，则按照3%
的年利率计算利息；如果存款金额大于等于100万元，则按照3.5%的年利率计算利息。
现在从键盘输入一个整数表示存款金额，请计算一年后的本金和利息总共有多少，将计
算结果输出到屏幕上。
"""


def assignment47(money: int) -> float:
    """计算一年期存款与利息"""

    if money < 10:
        return money * 1.015

    if money < 50:
        return money * 1.02

    if money < 100:
        return money * 1.03

    return money * 1.035


if __name__ == '__main__':
    # step1: 输入存款金额
    money = int(input('请输入存款金额（万元）: '))
    # step2: 调用函数计算存款与利息
    result = assignment47(money)
    print(f'{money:.4f}万元一年的利息和本金有:{result:.4f}')
