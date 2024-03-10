# 文档相似度

## 介绍

使用 Node.js 编写。程序运行后，将首先生成包含停用词与不包含停用词的索引文件（若索引文件不存在，否则直接读取）。在索引文件读取完成后，程序将依次输出二值向量、对数词频与 TF-IDF 方法生成的单词向量矩阵，然后输出三种方法生成的文档相似度矩阵，并输出每个文档对应的相似度最高的文档。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 包管理器: npm / Yarn
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认将`./data/`目录作为源文档所在的目录，并将`./dict.index`作为输出的**不包含停用词**的索引词典文件路径，将`./dict.index.with-stopwords`作为输出的**包含停用词**的索引词典路径。这三个常量都定义在`./src/main.ts`代码文件的开头，如需更改，直接更改这几个常量即可。
2. 除在终端打印上述的六个矩阵外，也会在`./output/`目录以 csv 格式输出这六个矩阵，它们的文件名分别是`binary.csv`、`log.csv`、`tfidf.csv`、`binary-similarity.csv`、`log-similarity.csv`、`tfidf-similarity.csv`。这几个常量也都定义在`./src/main.ts`代码文件的开头，如需更改，直接更改这几个常量即可。
