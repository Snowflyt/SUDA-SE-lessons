# pyright: strict

"""题目：
请编写一个程序，从键盘输入两个向量，每个向量的维度是 2，向量中每个元素的范围
在 0 到 1 之间，计算两个向量的余弦相似度，并输出结果。
"""

# 警告：由于程序使用大量Python 3.8~3.10版本的新增特性，
# 为确保程序正确运行，请在Python 3.10及以上版本中运行本程序
# 本程序在Python 3.10.7版本中测试通过


def calculate_cosine_similarity(vector1: tuple[float, float], vector2: tuple[float, float]) -> float:
    """Calculate cosine similarity of two vectors"""

    # calculate the numerator
    numerator = vector1[0] * vector2[0] + vector1[1] * vector2[1]
    # calculate the denominator
    square_sum1, square_sum2 = map(
        lambda v: v[0] ** 2 + v[1] ** 2,
        (vector1, vector2))
    denominator = square_sum1 ** 0.5 * square_sum2 ** 0.5

    return numerator / denominator


if __name__ == '__main__':
    print('Please input the first vector, '
          'each element should be between 0 and 1, '
          'and the dimension is 2, separated by spaces: ', end='')
    v1 = tuple(map(float, input().split()))
    print('Please input the second vector, '
          'each element should be between 0 and 1, '
          'and the dimension is 2, separated by spaces: ', end='')
    v2 = tuple(map(float, input().split()))
    similarity = calculate_cosine_similarity(v1, v2)
    print(f'The cosine similarity of {v1} and {v2} is {similarity}')
