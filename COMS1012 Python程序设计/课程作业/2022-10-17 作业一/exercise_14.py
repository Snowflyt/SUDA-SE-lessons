# pyright: strict

"""题目：
假设每月存 100 元到一个年利率为 6%的储蓄账户。因此，月利率为 0.06/12=0.005。
a) 第一个月后，账户的存款金额为: 100*(1+0.005)=100.5
b) 第二个月后，账户的存款金额为: (100+100.5)*(1+0.005)=201.5025
c) 第三个月后，账户的存款金额为: (100+201.5025)*(1+0.005)=303.3115
d) 请编写程序计算 5 个月后，该储蓄账户的存款金额是多少，并显示在屏幕上，要求保留
   5 位小数，右对齐。计算总体收益相对总体本金的收益率(此收益率值：总收益/总本金)，
   并显示在屏幕上，要求以百分数形式显示，保留 2 位小数，右对齐。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

MONTHLY_RATE = 0.06 / 12
DEPOSIT = 100
MONTHS = 5


def calculate_savings(months: int, rate: float, deposit: float) -> float:
    """calculate the savings after a certain period of time"""
    return deposit * (1 + rate) ** months


if __name__ == '__main__':
    SAVINGS = calculate_savings(MONTHS, MONTHLY_RATE, DEPOSIT)
    print(f'The savings after {MONTHS} months is: {SAVINGS:>.5f}')
    print(f'The rate of return is: {SAVINGS / DEPOSIT - 1:.2%}')
