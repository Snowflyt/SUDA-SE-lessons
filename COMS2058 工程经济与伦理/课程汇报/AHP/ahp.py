import numpy as np
from scipy.linalg import eig  # type: ignore

# 成对比较矩阵
A = np.array([
    [1, 1/5, 1/2, 1/3, 1/4, 1/5],
    [5, 1, 5, 1/3, 5, 1/2],
    [2, 1/5, 1, 1/6, 2, 1/3],
    [3, 3, 6, 1, 7, 5],
    [4, 1/5, 1/2, 1/7, 1, 1/5],
    [5, 2, 3, 1/5, 5, 1]
])
B = np.array([
    [1, 1/6, 1, 1/4, 3, 1],
    [6, 1, 2, 1, 3, 1],
    [1, 1/2, 1, 2, 3, 1/2],
    [4, 1, 1/2, 1, 5, 1],
    [1/3, 1/3, 1/3, 1/5, 1, 1/5],
    [1, 1, 2, 1, 5, 1]
])
C = np.array([
    [1, 1/6, 1/2, 1/6, 1, 3],
    [6, 1, 3, 5, 9, 9],
    [2, 1/3, 1, 3, 9, 5],
    [6, 1/5, 1/3, 1, 5, 1],
    [1, 1/9, 1/9, 1/5, 1, 2],
    [1/3, 1/9, 1/5, 1, 1/2, 1]
])
D = np.array([
    [1, 1/7, 1/5, 1/5, 1/4, 1/2],
    [7, 1, 4, 1, 5, 5],
    [5, 1/4, 1, 1/5, 3, 3],
    [5, 1, 5, 1, 5, 5],
    [4, 1/5, 1/3, 1/5, 1, 1],
    [2, 1/5, 1/3, 1/5, 1, 1]
])

# 计算平均值
X = (A + B + C + D) / 4

# 计算特征向量和特征值
eigenvalues, eigenvectors = eig(X)  # type: ignore

# 找到最大的特征值及其对应的特征向量
max_eigenvalue_index = np.argmax(eigenvalues)
max_eigenvalue_vector = eigenvectors[:, max_eigenvalue_index]

# 归一化特征向量，得到权重向量
weights = max_eigenvalue_vector / np.sum(max_eigenvalue_vector)

print(f'Weights: {weights}')
