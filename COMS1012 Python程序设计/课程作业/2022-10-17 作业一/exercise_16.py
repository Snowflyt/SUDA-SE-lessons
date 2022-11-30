# pyright: strict

"""题目：
请编写一个程序，从键盘输入两个时间点，格式 hh:mm:ss（时：分：秒），计算并输出
两个时间点相隔的秒数。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

from datetime import datetime, timedelta


def get_time_difference(time1_str: str, time2_str: str) -> int:
    """Get the difference between two time points (format: hh:mm:ss)"""

    # get the difference between two time points
    time1, time2 = map(lambda s: datetime.strptime(s, '%H:%M:%S'), (time1_str, time2_str))
    # when time1 is later than time2, time2 add one day
    if time1 > time2:
        time2 += timedelta(days=1)
    # return the difference in seconds
    return (time2 - time1).seconds


if __name__ == '__main__':
    print('Please enter two time points (format: hh:mm:ss), separated by a space: ', end='')
    t1, t2 = input().split()
    diff = get_time_difference(t1, t2)
    print(f'The difference between {t1} and {t2} is {diff} seconds')
