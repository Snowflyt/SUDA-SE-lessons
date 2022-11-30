"""题目：
有一个列表，存有若干英文单词。遍历整个列表，将这些单词按照首字母进行分类，存
储在字典中，最后输出这个字典。例如列表为['alpha', 'all', 'dig', 'date', 'egg']，
字典为{'a': ['alpha', 'all'], 'd': ['dig', 'date'], 'e': ['egg']}
"""


def assignment72(lst: list[str]) -> dict[str, list[str]]:
    """返回按首字母分类的字典"""

    return {i[0]: [j for j in lst if j[0] == i[0]] for i in lst}


if __name__ == '__main__':
    l: list[str] = list(eval(input('请输入一个英文单词的列表: ')))
    res = assignment72(l)
    print(res)
