"""题目：
创建一个有关雇员姓名和编号处理的程序。从键盘输入一组雇员姓名和编号。在此基础上实现：
a) 按照雇员姓名的顺序输出数据，雇员姓名显示在前面，后面是对应的雇员编号。
b) 按照雇员编号的顺序输出数据，雇员编号显示在前面，后面是对应的雇员姓名。
"""


def assignment82(lst: list[tuple[str, int]]) -> tuple[list[tuple[str, int]], list[tuple[int, str]]]:
    """返回按照雇员姓名和编号排序的结果"""

    return (sorted(lst, key=lambda x: x[0]),
            sorted(((x[1], x[0]) for x in lst), key=lambda x: x[0]))


if __name__ == '__main__':
    names = input('请输入雇员姓名，以空格分隔: ').split()
    nums = map(int, input('请输入雇员编号，以空格分隔: ').split())
    l = list(zip(names, nums))
    result = assignment82(l)
    print(result)
