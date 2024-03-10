# 倒排索引

## 介绍

使用 Node.js + compromise（一个 JS 上的 NLP 库）编写。

实现了对布尔查询表达式的完整解析，首先通过词法分析器（lexer）将布尔查询表达式分解为词法单元（token），然后通过语法分析器（parser）将词法单元解析成语法树（AST），最后通过遍历语法树，将其中的节点转换为对应的查询操作，最终得到查询结果。

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

程序运行后，将首先查找索引文件是否存在，如存在，直接读取索引文件；若不存在，则先读取各文档并构建索引文件。在索引文件读取完成后，程序将等待用户输入布尔查询表达式，并在用户按下回车后展示查询结果。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 主要使用框架：compromise
- 包管理器: npm / Yarn
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认将`./data/`目录作为源文档所在的目录，并将`./dict.index`作为输出的词典文件路径。这两个常量都定义在`./src/main.ts`代码文件的开头，如需更改，直接更改这几个常量即可。
