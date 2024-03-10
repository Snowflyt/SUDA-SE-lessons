# 单词计数

## 介绍

使用 Node.js 编写。对文件中的英文单词计数，统计每个单词的出现次数。用户输入单词时，打印计数，若未出现该单词，打印-1。输入`###`退出程序。

第一次运行时，会将计数数据缓存到词典文件中。此后运行程序时，首先会检查源数据文件是否更改（通过缓存时将源数据文件的 MD5 码也保存到缓存词典文件中，并进行比对），如已更改，重新读取并生成缓存词典文件。如未更改，则从缓存词典文件中读取数据。

## 软件架构

- 语言: TypeScript
- 运行时：Node.js (ts-node)
- 包管理: npm
- 代码风格: TypeScript ESLint Recommended
- 测试：Jest
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行运行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 运行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认读取`data/sample-en.txt`并生成`./dict.index`作为缓存词典文件。如需更改，请修改`src/main.ts`文件头的两个相应常量`SOURCE_FILE_PATH`和`DICT_FILE_PATH`。
2. 同时，应用也安装了 Jest，并编写了相应的测试用例。运行`npm run test`以运行这些测试用例。
