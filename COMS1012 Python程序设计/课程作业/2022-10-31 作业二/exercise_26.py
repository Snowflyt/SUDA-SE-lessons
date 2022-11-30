# -*- UTF-8 -*-

"""题目：
现有一个列表[1,3,4,6,6,7,8,8,10,21,22,22]，编写程序，直接操作列表，
使得列表不存在重复元素，**且元素均小于10**。
"""

# 功能：对给定的列表lst，使得列表中不存在重复元素，也就是删除重复元素，只保留一份
# 例子：input:[1,3,4,6,6,7,8,8,10,21,22,22]
# result:[1,3,4,6,7,8,10,21,22] <- 此处答案有误，应为[1, 3, 4, 6, 7, 8]
def assignment26(nums: list[int]) -> list[int]:
    """删除列表中的重复元素（且元素均小于10）"""

    # 使用集合提高效率（集合的in操作是O(1)的）
    unique_elements = set(nums)

    result: list[int] = []
    for i in nums:
        if i < 10 and i in unique_elements:
            result.append(i)
    return result


if __name__ == '__main__':
    l = [1, 3, 4, 6, 6, 7, 8, 8, 10, 21, 22, 22]
    res = assignment26(l)
    print(res)
