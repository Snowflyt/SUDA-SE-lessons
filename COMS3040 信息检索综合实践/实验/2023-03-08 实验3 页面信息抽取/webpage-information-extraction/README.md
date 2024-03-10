# 页面信息抽取

## 介绍

使用 Node.js+cheerio（jQuery 在 Node.js 上的一个精简移植版本）编写。项目同时包含两个练习的源代码。

启动时，会依次运行两个练习的代码。首先将提取练习 1 中的网页 Ng.htm 的标题和主要内容，然后输出到终端并保存。再提取练习 2 中 1000 个网页的主要内容，并保存到输出文件夹中。

## 软件架构

- 语言: TypeScript
- 运行时: Node.js (ts-node)
- 主要使用框架：cheerio
- 包管理器: npm
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。
2. 在目录下启动命令行执行`npm install --registry https://registry.npm.taobao.org`，安装依赖。
3. 执行`npm run dev`，启动应用，如应用正常打印提示信息，说明运行成功。

## 使用说明

1. 应用默认将`./data/data1/Ng.htm`作为练习 1 的源网页文件，将`./output/data1/Ng.txt`作为输出文件；将`./data/data2/`作为练习 2 中 1000 个网页文件的存放文件夹，将`./output/data2/`作为输出文件夹。

   这几个常量都定义在`./src/main.ts`代码文件的开头，如需更改，直接更改这几个常量即可。

2. 应用默认仅在终端打印练习 1 的输出。如需要打印练习 2 的输出，请将`./scr/main.ts`代码文件开头的`EX2_SHOW_OUTPUT`常量设置为`true`.
