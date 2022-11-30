# pyright: strict

"""题目：
请编写一个程序，显示当前北京时间。要求显示格式如下：
a) 当前时间是：几时：几分：几秒
b) 输出示例：
c) 当前时间是： 14：26：32
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过

from datetime import datetime


def format_current_time() -> str:
    """Get current time and format it"""

    # get current time
    current_time = datetime.now()
    # format the time
    return current_time.strftime('%H:%M:%S')


if __name__ == '__main__':
    print(format_current_time())
