# 分词

## 介绍

使用 Node.js 编写。根据词典文件，对一个未分词的文本文件进行分词，并与人工分词结果进行对比。

文件运行时，会依次调用前向最大匹配算法、反向最大匹配算法与 jieba 库进行分词，统计运行时间，根据人工分词文件打印分词的 P/R/F 评价指标，并保存分词结果。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 包管理: npm
- 代码风格: TypeScript ESLint Recommended
- 测试: Jest
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认读取`data/corpus.dict.txt`作为词典文件，读取`data/corpus.sentence.txt`作为未分词的本文文件，读取`data/corpus.answer.txt`作为人工分词的文件路径。应用默认输出前向最大匹配的结果到`data/corpus.out.txt`，输出反向最大匹配的结果到`data/corpus.out.backward/txt`，输出 jieba 分词的结果到`data/corpus.out.jieba.txt`。

   这几个常量都定义在`./src/main.ts`的文件头，如需更改，直接更改这几个常量即可。

2. 同时，应用也安装了 Jest，并编写了相应的测试用例，且达到了 100%的测试覆盖率。执行`npm run test`以运行这些测试用例。
