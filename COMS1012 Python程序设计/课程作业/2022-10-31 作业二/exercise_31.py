# -*- UTF-8 -*-

"""题目：
编写程序让用户输入两个字符串（一定是小写字母组成），判断两个字符串是否同构。
如果有两个字符串，其中一个字符串的字符重新排列后，能变成另一个字符串，那么称
为同构。
"""

# 例子1：输入 ： stringA：“hellow”, stringB:"llehow"
#       输出:True

# 例子1：输入 ： stringA：“world”, stringB:"wolrd"
#       输出:False

# 提示：可以将两个字符串按照同一种规则进行调整，然后比较调整后的两个字符串是否相等，
# 如果相等就是同构，否则就不是同构
def assignment31(str1: str, str2: str) -> bool:
    """判断两个字符串是否同构"""

    # step1: 判断两个字符串的长度是否相等
    if len(str1) != len(str2):
        return False

    # step2: 判断两个字符串是否有相同的字符
    if set(str1) != set(str2):
        return False

    # step3: 判断两个字符串是否每一个字符都有相同的个数
    return all(str1.count(i) == str2.count(i) for i in set(str1))


if __name__ == '__main__':
    str_a = "hellow"
    str_b = "llehow"
    res = assignment31(str_a, str_b)
    print(res)
