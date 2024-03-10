# NER Demo Client

基于 Tauri 及 Svelte 的 NER Demo 客户端，使用 Vite 作为构建工具，并使用了 TailwindCSS. 使用时需要确保正在运行相应的后端。

与应用功能相关的部分已经包含在了实验报告中。这里仅介绍开发相关的内容。

## 安装

建议使用 Yarn 安装依赖，这也是开发所使用的工具。

确保你的电脑上已经安装了 Node.js 及 npm，然后运行以下命令安装 Yarn.

```bash
npm install -g yarn
```

然后进入本项目的根目录，运行以下命令即可。

```bash
yarn
```

## 启动

运行以下命令启动项目：

```bash
yarn tauri dev
```

注意不是 `yarn dev`，该命令不会启动 Tauri，只会启动 Vite.

由于 Tauri 基于 Rust，请确保你的电脑上正确安装了 Rust. 建议使用 Rustup 安装 Rust，不要通过其他方式（如包管理器 Scoop）安装，可能会造成问题。

## 构建

运行以下命令构建：

```bash
yarn tauri build
```

同样的，注意不是 `yarn build`.

构建结束应能在 `./src-tauri/target/release` 中找到对应平台的可执行文件。如果构建出现问题也不一定意味着构建失败，只要能在对应目录下找到可执行文件即可。
