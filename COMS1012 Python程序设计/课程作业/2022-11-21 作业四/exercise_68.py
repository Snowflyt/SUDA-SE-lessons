# -*- UTF-8 -*-

"""题目：
矩阵相加：提示用户输入一个数字n，为矩阵的行数，再提示用户输入一个数字m，为
矩阵的列数，接下来，提示用户输入2*n*m个数字（每次输入一个数字）。输出 C=A+B。
提示：思考怎么用Python实现二维数组（如果做矩阵相加没有问题了，可以思考如何
做矩阵相乘）。
Please input the number of rows：（假设输入 n=2） 
Please input the number of columns：（假设输入 m=3） 
Please input A[0,0]: 1
Please input A[0,1]: 1
Please input A[0,2]: 1
Please input A[1,0]: 1
Please input A[1,1]: 1
Please input A[1,2]: 1
Please input B[0,0]: 2
Please input B[0,1]: 2
Please input B[0,2]: 2
Please input B[1,0]: 2
Please input B[1,1]: 2
Please input B[1,2]: 2
输出：C = [[3, 3, 3], [3, 3, 3]]
"""


def assignment68(matrix1: list[list[int]], matrix2: list[list[int]]) -> list[list[int]]:
    """矩阵求和"""

    return [[matrix1[i][j] + matrix2[i][j] for j in range(len(matrix1[0]))]
            for i in range(len(matrix1))]


if __name__ == '__main__':
    # step1:提示用户输入n和m，分别表示矩阵的行数和列数
    n, m = (int(input('Please input the number of rows: ')),
            int(input('Please input the number of columns: ')))

    # step2:提示用户依次输入n*m个数,构成第一个矩阵
    mat1: list[list[int]] = []
    for i in range(n):
        mat1.append([])
        for j in range(m):
            mat1[i].append(int(input(f'Please input A[{i},{j}]: ')))

    # step3:提示用户依次输入n*m个数,构成第二个矩阵
    mat2: list[list[int]] = []
    for i in range(n):
        mat2.append([])
        for j in range(m):
            mat2[i].append(int(input(f'Please input B[{i},{j}]: ')))

    # step3:调用函数输出C=A+B
    res = assignment68(mat1, mat2)
    print(f'C={res}')
