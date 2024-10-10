#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// 顺序查找
int sequential_search(int *data, int n, int target, int *comparisons, int *failures)
{
	for (int i = 0; i < n; i++)
	{
		(*comparisons)++;
		if (data[i] == target)
			return 1;
	}
	(*failures)++;
	return 0;
}

// 非递归二分查找
int binary_search_iterative(int *data, int n, int target, int *comparisons, int *failures)
{
	int low = 0, high = n - 1;
	while (low <= high)
	{
		(*comparisons)++;
		int mid = (low + high) / 2;
		if (data[mid] == target)
			return 1;
		else if (data[mid] < target)
			low = mid + 1;
		else
			high = mid - 1;
	}
	(*failures)++;
	return 0;
}

// 递归二分查找
int binary_search_recursive(int *data, int low, int high, int target, int *comparisons, int *failures)
{
	if (low > high)
	{
		(*failures)++;
		return 0;
	}

	(*comparisons)++;
	int mid = (low + high) / 2;
	if (data[mid] == target)
		return 1;
	else if (data[mid] < target)
		return binary_search_recursive(data, mid + 1, high, target, comparisons, failures);
	else
		return binary_search_recursive(data, low, mid - 1, target, comparisons, failures);
}

int main()
{
	int n, m;
	printf("Enter the size of the array (n): ");
	scanf_s("%d", &n);

	int *data = (int *)malloc(n * sizeof(int));
	printf("Enter %d integers for the array:\n", n);
	for (int i = 0; i < n; i++)
		scanf_s("%d", &data[i]);

	printf("Enter the number of searches to perform (m): ");
	scanf_s("%d", &m);

	srand(time(NULL));
	int target, comparisons, failures;
	clock_t start_time, end_time;
	double execution_time;

	// 顺序查找
	comparisons = 0;
	failures = 0;
	start_time = clock();
	for (int i = 0; i < m; i++)
	{
		target = rand() % 100; // Assuming integers in the range 0-99
		sequential_search(data, n, target, &comparisons, &failures);
	}
	end_time = clock();
	execution_time = ((double)end_time - start_time) / CLOCKS_PER_SEC;
	printf("Sequential Search:\n");
	printf("Average comparisons: %lf\n", (double)comparisons / m);
	printf("Failure comparisons: %lf\n", (double)failures / m);
	printf("Execution time: %lf seconds\n\n", execution_time);

	// 二分查找（非递归）
	comparisons = 0;
	failures = 0;
	start_time = clock();
	for (int i = 0; i < m; i++)
	{
		target = rand() % 100;
		binary_search_iterative(data, n, target, &comparisons, &failures);
	}
	end_time = clock();
	execution_time = ((double)end_time - start_time) / CLOCKS_PER_SEC;
	printf("Binary Search (Iterative):\n");
	printf("Average comparisons: %lf\n", (double)comparisons / m);
	printf("Failure comparisons: %lf\n", (double)failures / m);
	printf("Execution time: %lf seconds\n\n", execution_time);

	// 二分查找（递归）
	comparisons = 0;
	failures = 0;
	start_time = clock();
	for (int i = 0; i < m; i++)
	{
		target = rand() % 100;
		binary_search_recursive(data, 0, n - 1, target, &comparisons, &failures);
	}
	end_time = clock();
	execution_time = ((double)end_time - start_time) / CLOCKS_PER_SEC;
	printf("Binary Search (Recursive):\n");
	printf("Average comparisons: %lf\n", (double)comparisons / m);
	printf("Failure comparisons: %lf\n", (double)failures / m);
	printf("Execution time: %lf seconds\n", execution_time);

	free(data);
	return 0;
}
