# -*- UTF-8 -*-

"""题目：
模拟系统登录。建立一个用户信息列表，内部存有若干组用户名和密码。随机生成一个
4位数验证码，用户从键盘依次输入用户名、密码和验证码，将用户输入的结果和用户
信息列表以及校验码进行比较，如果用户名和密码不正确则输出提示“用户名或密码不
正确”，如果验证码不正确则提示“验证码有误”，如果全部正确提示“登录成功”。
"""


import random


user_info_list = [['Joy', 'abc123'], ['Mary', '1234'], ['Tom', '123456']]
curr_code = random.randint(1000, 9999)


def assignment41(input_username: str, input_password: str, input_code: str) -> str:
    """模拟系统登录"""

    if input_code != str(curr_code):
        return '验证码有误'

    for user_info in user_info_list:
        if user_info[0] == input_username and user_info[1] == input_password:
            return '登录成功'

    return '用户名或密码不正确'


if __name__ == '__main__':
    input_username = input('请输入用户名: ')
    input_password = input('请输入密码: ')
    input_code = input(f'请输入验证码（当前验证码{curr_code}）: ')
    print(assignment41(input_username, input_password, input_code))
