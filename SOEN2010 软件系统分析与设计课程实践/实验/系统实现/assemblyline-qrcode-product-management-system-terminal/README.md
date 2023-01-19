# assemblyline-qrcode-product-management-system-terminal

流水线二维码产品管理系统（终端子系统）

## 安装

安装时请执行以下命令

```shell
$ npm install
```

如因网络问题遇到安装进行到electron时卡死的情况，请按照下面的步骤为npm设置Electron镜像源

1. 执行以下命令打开npm配置

   ```shell
   $ npm config edit
   ```
2. 在文件末尾添加如下配置

   ```
   electron_mirror=https://npmmirror.com/mirrors/electron/
   ```
3. 保存后关闭配置文件
4. 若已经配置npm镜像源（如淘宝源），请先执行下面命令恢复原镜像

   ```shell
   $ npm config set registry https://registry.npmjs.org/
   ```
5. 重新执行`npm install`
6. 如在步骤4中恢复了npm原镜像，记得恢复镜像源

   为方便起见，这里给出恢复淘宝镜像源的命令

   ```shell
   $ npm config set registry https://registry.npmmirror.com/
   ```

## 启动

输入以下命令启动应用

```shell
$ npm run dev
```

默认后端地址为http://localhost:8083，如果已经更改后端地址，请修改src/utils/request.ts中对应的地址。

## 发布应用

输入以下命令构建应用（安装包将输出到build/文件夹中）

```shell
$ npm run build
```

## 使用技术

1. 应用基于Electron搭建，使用React构建界面，组件库使用Material UI (MUI)，语言为TypeScript
2. 项目已配置ESLint及Prettier，遵照JavaScript Standard Style标准
