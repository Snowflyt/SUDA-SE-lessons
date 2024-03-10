# 基于 TF-IDF 向量表示的信息检索

## 介绍

使用 Node.js 编写。程序运行后，将首先生成索引文件（若索引文件不存在，否则直接读取）。在索引文件读取完成后，程序将通过索引文件生成横轴为文档 ID、纵轴为单词的 TF-IDF 向量矩阵（稀疏矩阵），并将其保存到 `./output/tfidf-matrix.csv` 中（若检测到已存在向量矩阵，则直接读取）。

在 TF-IDF 向量矩阵生成（或读取）完成后，程序将循环等待用户输入需要查询的文档内容，并在用户按下回车后展示前 5 个相似度最高的文档信息（相似度、文档 ID 及文档内容）。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 包管理器: npm / Yarn
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。（测试使用的 Node.js 版本为 19.9.0）
2. 在目录下启动命令行执行 `npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行 `npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认将 `./data/en(utf8).txt` 作为文档集合，并将 `./dict.index` 作为输出的索引词典文件路径，将 `./output/tfidf-matrix.csv` 作为输出的 TF-IDF 向量矩阵的保存路径。这三个常量都定义在 `./src/main.ts` 代码文件的开头，如需更改，直接更改这几个常量即可。
2. 第一次运行时程序需要较长时间生成索引文件及计算 TF-IDF 向量矩阵（在我的电脑上前者大约需要 2800s，后者大约需要 1500s），请耐心等待。由于文件上传大小的限制，无法将生成好的这两个文件直接包含在源码中，请见谅。
3. 程序运行时需要较长的时间读取索引文件及 TF-IDF 向量矩阵，耗时约 25s，请耐心等待。
4. 每次查询耗时约 2-5s，在性能较差的电脑上可能会延长至 6-8s.
5. `dataframe.ts` 和 `series.ts` 的实现具有相应的测试用例，执行 `npm run test` 可以运行测试用例。如果 `dataframe.test.ts` 运行失败，请将 `dataframe.ts` 中的 `import { createSeries } from './series.js';` 一行改为 `import { createSeries } from './series';`，并重新执行 `npm run test`。
