"""题目：
英语语法中，动词的第三人称单数形式规则简要概括（不完全）如下：
a) 如果动词以y字母结尾，则去掉y并加上ies。
b) 如果动词以o，ch，s，sh，x，z字母结尾，则加上es。
c) 默认直接在动词最后加上字母s。
请编写一个程序，对于任意给定的一个动词，返回其第三人称单数形式
"""


def assignment101(word: str) -> str:
    """为动词添加第三人称单数"""

    if word.endswith('y'):
        return word[:-1] + 'ies'
    if any(word.endswith(x) for x in ('o', 'ch', 's', 'sh', 'x', 'z')):
        return word + 'es'
    return word + 's'


if __name__ == '__main__':
    w = 'study'
    res = assignment101(w)
    print(res)
