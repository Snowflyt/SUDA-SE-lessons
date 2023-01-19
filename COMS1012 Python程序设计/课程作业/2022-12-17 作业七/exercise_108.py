"""题目：
设计一个用户注册程序，需要输入用户名、密码、确认密码三部分。这三部分分别有以下要求：
a) 用户名：长度大于等于6，不能以数字开头，不能包含!？@等符号，-除外。
b) 密码：长度大于等于5，只能使用数字、大写英文字母和小写英文字母，且必须同
时使用这2种字符。
c) 确认密码：要求与密码相同，除此之外确认密码需要和密码完全一致。
依次输入这三部分，如果输入正确输入下一项，如果错误则提示，然后重新输入该项内容
"""

import re

# 让用户输入用户名，满足要求进入下一部分
username = input('请输入用户名: ')
while True:
    if len(username) < 6:
        username = input('用户名长度需大于等于6，请重新输入: ')
    elif username[0].isdigit():
        username = input('用户名不能以数字开头，请重新输入: ')
    elif re.search(r'[^\w\-]', username):
        username = input('用户名不能含!?@等特殊符号，请重新输入: ')
    else:
        break

# 让用户输入密码，满足要求进入下一部分
password = input('请输入密码: ')
while True:
    if len(password) < 6:
        password = input('密码长度需大于等于6，请重新输入: ')
    elif not password.isalnum():
        password = input('用户名只能包含数字、大写英文字母和小写英文字母，请重新输入: ')
    elif not (any(char.isdigit() for char in password) and
              any(char.islower() for char in password) and
              any(char.isupper() for char in password)):
        password = input('密码必须同时包含数字、大写英文字母和小写英文字母，请重新输入: ')
    else:
        break

# 让用户输入确认密码，满足要求进入下一部分
ensured_password = input('请确认密码: ')
while ensured_password != password:
    ensured_password = input('密码错误，请重新输入: ')

print('注册成功')
