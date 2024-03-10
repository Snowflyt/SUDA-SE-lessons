# 在线教育直播平台

## 介绍

“综合项目实践”课程项目，基于 [T3 Stack](https://create.t3.gg/) 开发的在线教育直播平台 Demo.

全部使用大前端相关技术搭建。前端使用 Next.js (React 元框架) 搭建，后端使用 Prisma (ORM) + tRPC (RPC) 搭建。除此之外，还使用了 NextAuth.js (认证)、Tailwind CSS (CSS 框架) 等技术。

项目采用 Monorepo 方案，因此尽管项目仍是前后端分离的，但是代码都在同一个仓库中。

## 软件架构

- 语言: TypeScript
- 运行时: 浏览器（前端） / Node.js（后端）
- 包管理器: Yarn
- 代码风格: TypeScript ESLint Recommended
- UI 框架: React (Next.js)
- ORM: Prisma
- RPC: tRPC
- 其他: Prettier + ESLint

## 安装教程

1. 确保电脑上已经安装 Node.js 运行时环境，如未安装，前往[官网](https://nodejs.org/en/download/)或以其他方式下载安装对应操作系统的版本。请确保 Node.js 版本不低于 18，否则可能由于代码中引用了一些较新的标准库而无法运行。（测试使用的 Node.js 版本为 19.9.0）
2. 在目录下启动命令行执行 `yarn --registry https://registry.npm.taobao.org`，安装依赖。如果未安装 Yarn，请先执行 `npm install -g yarn --registry https://registry.npm.taobao.org` 安装 Yarn.
3. 执行 `yarn dev`，启动应用，如应用正常在终端（非浏览器终端）中打印日志，说明运行成功。

## 使用说明

1. 为方便安装起见，项目使用了 SQLite 作为数据库，并且已经配置完成。如遇数据库相关问题，请尝试删除 `./prisma/db.sqlite` 文件，并运行 `yarn prisma db push` 重新创建数据库。
2. 项目默认会在应用初始化时创建用户名为 tea 和 stu 的两个用户（若未创建），其角色分别为教师和学生。密码均为 123456.
3. 直播功能需要一个使用 ZLMediaKit 搭建的支持 WebRTC 的流媒体服务器，可参考[官方说明](https://github.com/ZLMediaKit/ZLMediaKit/wiki/zlm%E5%90%AF%E7%94%A8webrtc%E7%BC%96%E8%AF%91%E6%8C%87%E5%8D%97)搭建。对于 Windows 系统，建议在本地 WSL2 中安装 Ubuntu 20.04 LTS 及以上版本，在其中搭建 ZLMediaKit 服务器并启动 MediaServer，以保证网络带宽满足视频流传输的需求。如需使用来自其他地址的服务器，请在修改 `./src/utils/rtc.ts` 中的 `SERVER_URL` 常量。
4. 在调试状态下 WebSocket 服务可能会不定时重启，导致依赖于 WebSocket 的 tRPC Subscription 失效，这可能使直播间的聊天功能无法正常使用。如遇此问题，请尝试刷新页面并等待十数秒再尝试，第一次发送消息可能会失败，但之后应该就能正常使用了。
