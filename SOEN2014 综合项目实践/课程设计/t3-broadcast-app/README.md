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
3. 直播功能需要一个使用 ZLMediaKit 搭建的支持 WebRTC 的流媒体服务器，可参考[官方说明](https://github.com/ZLMediaKit/ZLMediaKit/wiki/zlm%E5%90%AF%E7%94%A8webrtc%E7%BC%96%E8%AF%91%E6%8C%87%E5%8D%97)搭建。对于 Windows 系统，建议在本地 WSL2 中安装 Ubuntu 20.04 LTS 及以上版本，在其中搭建 ZLMediaKit 服务器并启动 MediaServer，以保证网络带宽满足视频流传输的需求。如需使用来自其他地址的服务器，请在修改 `./src/utils/rtc.ts` 中的 `SERVER_URL` 常量。（下一节将详细演示在本地搭建 ZLMediaKit 服务器的过程）
4. 在调试状态下 WebSocket 服务可能会不定时重启，导致依赖于 WebSocket 的 tRPC Subscription 失效，这可能使直播间的聊天功能无法正常使用。如遇此问题，请尝试刷新页面并等待十数秒再尝试，第一次发送消息可能会失败，但之后应该就能正常使用了。

## 搭建 ZLMediaKit 服务器

下面演示了如何在本地搭建 ZLMediaKit 服务器。下面演示中使用了 Windows 11 系统，在 WSL2 Ubuntu 24.04 LTS 环境中搭建 ZLMediaKit 服务器。以下步骤应当也适用于 macOS 或其他较新的 Linux 发行版。

首先执行以下命令安装 libsrtp：

```bash
wget https://github.com/cisco/libsrtp/archive/refs/tags/v2.6.0.tar.gz
tar -zxvf v2.6.0.tar.gz && rm v2.6.0.tar.gz
cd libsrtp-2.6.0
sudo apt install -y libssl-dev
./configure --enable-openssl
make -j${nproc} && sudo make install
cd ..
rm -rf ./libsrtp-2.6.0
```

然后编译 ZLMediaKit：

```bash
git clone --depth 1 https://gitee.com/xia-chu/ZLMediaKit ZLMediaKit-src
cd ZLMediaKit-src
git submodule update --init
mkdir build && cd build
cmake .. -DENABLE_WEBRTC=true -DCMAKE_BUILD_TYPE=Release
cmake --build . --target MediaServer
cd ../..
mv ./ZLMediaKit-src/release/linux/Release ./ZLMediaKit
rm -rf ./ZLMediaKit-src
# 重新生成配置文件
cd ./ZLMediaKit && rm -f config.ini && sudo ./MediaServer & pid=$!; sleep 5; kill $pid >/dev/null 2>&1
sed '1,2d' config.ini | head -n -2 > temp && mv -f temp config.ini
cd ..
```

然后建议修改 `config.ini` 中的 `rtc.externIP` 配置项。对于本地部署（如这里的示例）的情况，将其设置为 `127.0.0.1` 就可以了——如果你在其他地方部署 ZLMediaKit（如你自己的云服务器上），将其设置为你的服务器的公网 IP 地址。

例如以下命令将 `config.ini` 中的 `rtc.externIP` 配置项设置为 `127.0.0.1`：

```bash
sudo apt install -y crudini
crudini --set ./ZLMediaKit/config.ini rtc externIP 127.0.0.1
```

然后在 ZLMediaKit 目录下运行 `./MediaServer` 即可：

```bash
cd ./ZLMediaKit
sudo ./MediaServer
```

在启动本项目时，请确保 ZLMediaKit 服务器正在运行。除此之外，如果你将 ZLMediaKit 部署在非本地的服务器上，请遵照上一节“使用说明”中的中的第 3 点相应地修改 `./src/utils/rtc.ts` 中的 `SERVER_URL` 常量。