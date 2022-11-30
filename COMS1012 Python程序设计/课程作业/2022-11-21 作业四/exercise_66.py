# -*- UTF-8 -*-

"""题目：
提示用户输入一个整型数字 n（ n 代表后续需要输入整型数的数量），将 n 个整型数加起
来并输出，如果输入的是非整型数则提示当前的输入非法，需要重新输入数值，如果输
入‘ n=0’代表退出程序，否则继续提示用户输入新的 n。
例：
Please input the number of numbers： （假设输入3）
Please input number 1： (假设输入 3)
Please input number 2： (假设输入 4)
Please input number 3： (假设输入 5)
输出： sum = 12
Please input the number of numbers：
…
Please input the number of numbers： （假设输入0，则退出程序）
"""


def assignment66() -> None:
    """主程序"""

    while True:
        user_input = input('Please input the number of numbers: ')
        if user_input == 0:
            break
        if not user_input.isdigit():
            print('Invalid input. Please input a number.')
            continue
        num = int(user_input)
        total = 0
        for i in range(num):
            while True:
                number = input(f'Please input number {i + 1}: ')
                if number.isdigit():
                    total += int(number)
                    break
                print('Invalid input. Please input a number.')
        print(f'sum = {total}')


if __name__ == '__main__':
    assignment66()
