"""题目：
请利用正则表达式写一个Python程序以尝试解析XML/HTML标签。现有如下一段内容：
<composer>Wolfgang Amadeus Mozart</composer>
<author>Samuel Beckett</author>
<city>London</city>
希望自动格式化重写为：
composer: Wolfgang Amadeus Mozart
author: Samuel Beckett
city: London
"""

import re


def assignment106(contents: str) -> dict:
    """返回解析后的字典"""

    pattern = re.compile(r'<(\w+)>(.*?)</\1>')
    return dict(pattern.findall(contents))


if __name__ == '__main__':
    contents = '<composer>Wolfgang Amadeus Mozart</composer> <author>Samuel Beckett</author> <city>London</city> '
    for key, value in assignment106(contents).items():
        print(f'{key}: {value}')
