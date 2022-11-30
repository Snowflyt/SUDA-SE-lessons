# pyright: strict

"""题目：
一辆汽车从苏州出发前往上海，每小时行驶 80 公里，两地距离为 100 公里。假设出发
时间为当前时间，编写一个程序，计算并输出到达上海的时间，格式 hh:mm:ss（时：分：
秒）。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

from datetime import datetime, timedelta


DISTANCE = 100
SPEED = 80


def get_arrival_time() -> str:
    """Get arrival time"""

    # get current time
    current_time = datetime.now()
    # get the time of arrival
    arrival_time = current_time + timedelta(hours=DISTANCE / SPEED)
    # format the time
    return arrival_time.strftime('%H:%M:%S')


if __name__ == '__main__':
    arr_time = get_arrival_time()
    print(f'Arrival time: {arr_time}')
