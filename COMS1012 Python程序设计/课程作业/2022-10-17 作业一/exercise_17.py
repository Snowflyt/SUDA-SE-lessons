# pyright: strict

"""题目：
请编写一个程序，计算当前距离 1970 年 1 月 1 日过去了多少天又多少小时，并输出到
屏幕上。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

from datetime import datetime


def get_days_hours() -> tuple[int, int]:
    """Get days and hours since 1970-01-01"""

    # get current time
    current_time = datetime.now()
    # get the difference between current time and 1970-01-01
    diff = current_time - datetime(1970, 1, 1)

    return diff.days, diff.seconds // 3600


if __name__ == '__main__':
    days, hours = get_days_hours()
    print(f'It has been {days} days and {hours} hours since 1970-01-01')
