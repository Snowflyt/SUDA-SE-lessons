import java.io.File;
import java.io.FileNotFoundException;
import java.util.Random;
import java.util.Scanner;

public class MatrixCalculate {

    private static final int MATRIX_SIZE = 128;
    private static final int THREAD_COUNT = 8;
    private static final int REPEAT_TIMES = 10;

    public static class Matrices {

        private static final Random random = new Random();

        private Matrices() {
            throw new UnsupportedOperationException("Utility class");
        }

        public static double[][] read(int size, String path) {
            return read(size, size, path);
        }

        public static double[][] read(int row, int col, String path) {
            double[][] result = new double[row][col];
            try (Scanner scanner = new Scanner(new File(path))) {
                for (int i = 0; i < row; i++) {
                    for (int j = 0; j < col; j++) {
                        result[i][j] = scanner.nextDouble();
                    }
                }
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
            return result;
        }

        public static double[][] random(int size) {
            return random(size, size);
        }

        public static double[][] random(int row, int col) {
            double[][] result = new double[row][col];
            for (int i = 0; i < row; i++) {
                for (int j = 0; j < col; j++) {
                    result[i][j] = random.nextDouble();
                }
            }
            return result;
        }

        public static double[][] zeroes(int size) {
            return zeroes(size, size);
        }

        public static double[][] zeroes(int row, int col) {
            return full(row, col, 0);
        }

        public static double[][] full(int size, double value) {
            return full(size, size, value);
        }

        public static double[][] full(int row, int col, double value) {
            double[][] result = new double[row][col];
            for (int i = 0; i < row; i++) {
                for (int j = 0; j < col; j++) {
                    result[i][j] = value;
                }
            }
            return result;
        }

    }

    public static class ParallelMultiplier {

        private static class RowColMultiplier implements Runnable {

            private final double[][] matrix1;
            private final int row;
            private final double[][] matrix2;
            private final int column;
            private final double[][] result;

            public RowColMultiplier(double[][] result, double[][] matrix1, int row, double[][] matrix2, int column) {
                this.matrix1 = matrix1;
                this.row = row;
                this.matrix2 = matrix2;
                this.column = column;
                this.result = result;
            }

            @Override
            public void run() {
                double sum = 0;
                for (int i = 0; i < matrix1[row].length; i++) {
                    sum += matrix1[row][i] * matrix2[i][column];
                }
                result[row][column] = sum;
            }

        }

        private final int nThreads;
        private final Thread[] threads;

        public ParallelMultiplier(int nThreads) {
            this.nThreads = nThreads;
            threads = new Thread[nThreads];
        }

        public double[][] multiply(double[][] matrix1, double[][] matrix2) {
            if (matrix1[0].length != matrix2.length) {
                throw new IllegalArgumentException("Matrix1 column count must be equal to matrix2 row count");
            }

            double[][] result = Matrices.zeroes(matrix1.length, matrix2[0].length);

            int n = 0;
            for (int i = 0; i < matrix1.length; i++) {
                for (int j = 0; j < matrix2[0].length; j++) {
                    threads[n] = new Thread(new RowColMultiplier(result, matrix1, i, matrix2, j));
                    threads[n].start();
                    n = (n + 1) % nThreads;
                    if (n == 0) {
                        waitForThreads(threads);
                    }
                }
            }

            return result;
        }

        private void waitForThreads(Thread[] threads) {
            for (Thread thread : threads) {
                try {
                    thread.join();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                    // restore interrupted status
                    Thread.currentThread().interrupt();
                }
            }
        }

    }

    public static void main(String[] args) {
        long totalTime = 0;
        for (int count = 0; count < REPEAT_TIMES; count++) {
            double[][] matrix1 = Matrices.random(MATRIX_SIZE);
            double[][] matrix2 = Matrices.random(MATRIX_SIZE);

            ParallelMultiplier parallelMultiplier = new ParallelMultiplier(THREAD_COUNT);

            long start = System.currentTimeMillis();
            double[][] result = parallelMultiplier.multiply(matrix1, matrix2);
            long end = System.currentTimeMillis();
            totalTime += (end - start);

            // print result when all threads are finished
            if (count == REPEAT_TIMES - 1) {
                for (int i = 0; i < result.length; i++) {
                    for (int j = 0; j < result[i].length; j++) {
                        System.out.printf("%.2f ", result[i][j]);
                        if (j == 5) {
                            System.out.print("...");
                            break;
                        }
                    }
                    System.out.println();
                    if (i == 5) {
                        System.out.println("...");
                        break;
                    }
                }
            }
        }

        System.out.println("Average time spent: " + totalTime / 1000.0 / REPEAT_TIMES + "s");
    }

}
