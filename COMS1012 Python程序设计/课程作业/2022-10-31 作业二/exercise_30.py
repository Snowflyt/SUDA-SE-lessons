# -*- UTF-8 -*-

"""题目：
现有列表[35,46,57,13,24,35,99,68,13,79,88,46]，
请编写程序将其中重复的元素去除，并按从小到大的顺序排列后输出。
"""

from abc import abstractmethod
from typing import Any, Protocol, TypeVar


class Comparable(Protocol):
    """可比较协议，用于支持sorted函数的类型检查
    由于Pylance对Protocol的支持不完善，这里Pylance的类型检查会出现问题
    如果检查器报错，请改用MyPy"""

    @abstractmethod
    def __lt__(self, other: Any) -> bool: ...

    @abstractmethod
    def __eq__(self, other: object) -> bool: ...


CT = TypeVar('CT', bound=Comparable)


# 例子：input:[35,46,57,13,24,35,99,68,13,79,88,46]
# result:[13, 24, 35, 46, 57, 68, 79, 88, 99]
def assignment30(lst: list[CT]) -> list[CT]:
    """去除列表中重复的元素，并按从小到大的顺序排列"""

    # step1: 删除lst中重复元素，使得重复元素只保留一份
    temp_lst = set(lst)

    #step2: 对temp_lst进行升序排序
    result = sorted(temp_lst)

    return result


if __name__ == '__main__':
    l = [35, 46, 57, 13, 24, 35, 99, 68, 13, 79, 88, 46]
    res = assignment30(l)
    print(res)
