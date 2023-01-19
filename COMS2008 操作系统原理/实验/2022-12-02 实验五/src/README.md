# README

1. 项目使用CMake管理，具体配置参见CMakeLists.txt

2. 请确保运行时目录下已存在source.dat

3. 建议使用CMake编译运行，具体命令如下（运行前请确保CMake已正确安装，且已安装合适的C编译器，如Clang或GCC）

   ```bash
   mkdir -p build && cd build && cmake .. && make && cd .. && ./build/FileBackup <method>
   ```

   `<method>`为占位符，运行时请替换为c（使用C标准库）或s（使用系统调用）

   如不想安装CMake，直接编译运行也是可以的

   使用GCC：

   ```bash
   mkdir -p build && gcc -o ./build/FileBackup main.c && ./build/FileBackup <method>
   ```

   使用Clang：

   ```bash
   mkdir -p build && clang -o ./build/FileBackup main.c && ./build/FileBackup <method>
   ```

4. 由于代码使用了部分较新的C语言特性，请确保使用的编译器至少支持至C99标准
