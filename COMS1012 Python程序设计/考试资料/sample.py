import math
import re

def func1(s1,s2):
    return len(s2) if s2.lower() in s1.lower() else len(s1)


def func2(s):
    return 0 if s == '' else sum(ord(c) for c in s if c.islower()) // len(s)


def func3(a, b):
    sums = {b[i] + b[j] for i in range(len(b)) for j in range(i, len(b))}
    return [num for num in a if num in sums]


def func4(lst):
    if not lst:
        return -1
    freq = {}
    for num in lst:
        freq[num] = freq.get(num, 0) + 1
    max_num, max_freq = max(freq.items(), key=lambda item: item[1])
    max_nums = [item[0] for item in freq.items() if item[1] == max_freq]
    return max_num if len(max_nums) == 1 else sorted(max_nums)


def func5(lst, center, K):
    count = 0
    is_prev_larger = lst[0] > center
    is_prev_smaller = lst[0] < center
    for num in lst[1:]:
        if num > center:
            if is_prev_larger:
                count += 1
            else:
                count = 1
                is_prev_larger = True
                is_prev_smaller = False
        elif num < center:
            if is_prev_smaller:
                count += 1
            else:
                count = 1
                is_prev_larger = False
                is_prev_smaller = True
        else:
            is_prev_larger = False
            is_prev_smaller = False
        if count >= K:
            return True
    return False


def func6(lstScore, lstID):
    return list(map(lambda tpl: tpl[1],
                    sorted(zip(lstScore, lstID),
                           key=lambda tpl: (-tpl[0], tpl[1]))))


def func7(words):
    keyboard = ({'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'},
                {'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'},
                {'Z', 'X', 'C', 'V', 'B', 'N', 'M'})
    return [word for word in words
            if any(all(c.upper() in row for c in word) for row in keyboard)]


def func8(string):
    word2num = {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
                'six': 6, 'seven': 7, 'eight': 8, 'nine': 9}
    nums_str = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'}
    return sum({int(word) if all(c in nums_str for c in word) and word[0] != '0'
                else word2num.get(word.lower(), 0)
                for word in string.split(' ') if word != ''})


if __name__=="__main__":
    print(func1('aBcabCdaBCe', 'bc'))
    print(func1('abcabcdabce', 'abd'))
    print(func1('abcabdces', 'bc'))
    print(func1('abcabdces', 'cd'))
    print(func1('aBcabbCes', ''))
    print(func1('', 'ac'))
    print(func1('aBcabbCes', 'AbC'))
    print(func2('aBc12D'))
    print(func2(''))
    print(func2('aBCAbdcES'))
    print(func2('aBCA1d2ES'))
    print(func2('aBCA;b,56ES'))
    print(func3([], [1, 2, 3]))
    print(func3([8, 9], [1, 2, 3]))
    print(func3([11, 6, 5, 7, 8], [1, 2, 3]))
    print(func4([]))
    print(func4([56, 56, 2, 1, 2, 3, 2, 3, 4]))
    print(func4([56, 56, 2, 1, 2, 3, 2, 3, 4, 56]))
    print(func5([2, 2, 5, 5, 5, 5, 5, 5, 6, 7], 3, 4))
    print(func5([2, 2, 5, 5, 5, 5, 5, 5, 6, 7], 3, 777))
    print(func6([80, 80, 90], ['2201', '2202', '2203']))
    print(func6([70, 85, 70], ['2201', '2202', '2203']))
    print(func7(['Dad', 'boy', 'wet', 'pot']))
    print(func7(['apple']))
    print(func8('We have one snake 2 turtles 3 dogs 5 chickens and 3 cats'))
    print(func8('We have one snake 2 turtles 3 dogs and 4 cats'))
    print(func8('We have 1 snake 2 turtles 3 dogs and 3 cats'))
    print(func8(''))
    print(func8('We have 1 snake 2 turtles 3 dogs and 4 cats'))
