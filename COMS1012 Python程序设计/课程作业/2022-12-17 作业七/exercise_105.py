"""题目：
请利用正则表达式写一个简单的拼写检查程序。实现以下功能：
a) 两个或两个以上的空格出现时将其压缩为一个。
b) 在标点符号后加上一个空格，如果这个标点符合之后还有字母。
例： 给定字符串："Thisisvery funny andcool.Indeed!"
输出："This is very funny and cool. Indeed!"
其中“ ”代表一个空格
"""

import re


def assignment105(string: str) -> str:
    """返回正确格式的字符串"""

    result = re.sub(r'\s+', ' ', string)
    result = re.sub(r'([.?!])(\w)', r'\1 \2', result)
    return result


if __name__ == '__main__':
    s = 'How    are you?Fine.'
    res = assignment105(s)
    print(res)
