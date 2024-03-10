# 模糊匹配

## 介绍

使用 Node.js + fuzzball.js（JS 上对 Python fuzzywuzzy 库的移植）编写。

程序运行后，将首先查找索引文件是否存在，如存在，直接读取索引文件；若不存在，则先读取各文档并构建索引文件。在索引文件读取完成后，程序将等待首先提示用户选择所使用的查询算法（使用 fuzzball.js 的模糊匹配、简单按字模糊匹配、加入距离计算的按字模糊匹配三种算法），用户选择查询算法后，程序将循环等待用户输入布尔查询表达式，并在用户按下回车后展示查询结果。

此外，同上一次作业，也实现了对布尔查询表达式的完整解析，包含了相应的 lexer 和 parser，并实现了查询分数的合并算法。

布尔查询表达式支持的操作符有：

- `AND`：与
- `OR`：或
- `NOT`：非
- `()`：括号

示例：

- `A AND B`：A 与 B 同时出现
- `A OR B`：A 或 B 至少出现一次
- `A AND NOT B`：A 出现，但 B 未出现
- `(A AND NOT B) OR C`：A 出现，但 B 未出现，或 C 出现

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 主要使用库：fuzzball.js
- 包管理器: npm / Yarn
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认将`./data/`目录作为源文档（即`corpus.txt`）所在的目录，并将`./data/courpusnew.txt`作为输出的分词后的源文档的路径。这两个常量都定义在 `./src/main.ts` 代码文件的开头，如需更改，直接更改这几个常量即可。
2. 使用 jieba 分词的索引文件路径默认为`./dict.index`，按字的索引文件路径默认为`./dict.index.char`。除此之外，还包含一个增强版的按字索引，除了保存汉字是否在文档中出现外，还保存其在文档中出现的位置，该索引用于实现更好的按字模糊搜索算法，其路径默认为`./dict.index.char.enhanced`。这些常量也都定义在`./src/main.ts`代码文件的开头，如需更改，直接更改这几个常量即可。
