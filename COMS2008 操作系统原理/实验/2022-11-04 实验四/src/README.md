# README

1. 项目使用CMake管理，具体配置参见CMakeLists.txt

2. 建议使用CMake编译运行，具体命令如下（运行前请确保CMake已正确安装，且已安装合适的C编译器，如Clang或GCC）

   ```bash
   mkdir -p build && cd build && cmake .. && make && cd .. && ./build/RockPaperScissorsGame <rounds>
   ```

   `<rounds>`为占位符，运行时请填入具体数字

   如不想安装CMake，直接编译运行也是可以的

   使用GCC：

   ```bash
   mkdir -p build && gcc -o ./build/RockPaperScissorsGame main.c && ./build/RockPaperScissorsGame <rounds>
   ```

   使用Clang：

   ```bash
   mkdir -p build && clang -o ./build/RockPaperScissorsGame main.c && ./build/RockPaperScissorsGame <rounds>
   ```

3. 由于代码使用了部分较新的C语言特性，请确保使用的编译器至少支持至C99标准
