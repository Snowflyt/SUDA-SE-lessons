# nestjs-chatroom-app

聊天室后端，基于 NestJS 开发，使用 SQLite 作为数据库，使用 GraphQL 作为 API 接口。聊天的主要实现基于 GraphQL Subscriptions（实际上是 WebSocket 的封装）。

架构和 [nestjs-lottery-app](../../lottery/nestjs-lottery-app/README.md) 没有任何区别，为数不多的区别在于 `src/common/graphql.module.ts` 增加了一些与 GraphQL Subscriptions 相关的配置，除此之外 `src/common/auth/jwt-auth.guard.ts` 加了一些代码以修复 NestJS 的 GraphQL Subscriptions 支持与 JWT 鉴权的一些不兼容问题。

聊天室的主要实现在 `src/chatrooms` 目录下。

## 软件架构

- 语言: TypeScript
- 主要使用框架: NestJS
- API 接口: GraphQL (Apollo Server)
- 数据库: SQLite
- ORM: Prisma
- 鉴权: JWT (passport-jwt)
- 测试: Jest
- 代码风格: TypeScript ESLint Recommended
- 其他: Prettier + ESLint

## 安装

确保你的电脑上已经安装了 Node.js 及 npm，然后进入本项目的根目录，运行以下命令即可。

```shell
npm install
```

## 启动

本项目需要在根目录下创建一个 `.env` 文件用于配置环境变量，该文件被 `.gitignore` 排除了，所以需要手动创建。你可以参考 `.env.example` 文件创建一个 `.env` 文件，然后填入你的配置——如果你懒得改，也可以直接复制 `.env.example` 文件并重命名为 `.env`。其中 `DATABASE_URL` 是数据库的连接字符串，`JWT_SECRET` 是 JWT 的密钥（这里使用了一个随机生成的 GUID，用作生产时请务必确保密钥的安全性），`TEST_ADMIN_USERNAME` 和 `TEST_ADMIN_PASSWORD` 是用于测试的管理员账号的用户名和密码，默认是 `su` 和 `1234`.

除了 `su` 这个管理员账号外，还有两个测试账号分别是 `u1` 和 `u2`，密码都是 `1234`.

运行以下命令启动项目：

```shell
npm start
```

你应该能看到 `prisma/` 目录下生成了一个 `dev.db` 文件，这就是项目使用的 SQLite 数据库，如果你使用 VSCode 可以安装 SQLite Viewer 插件查看数据库中的数据。访问 `http://localhost:3000/graphql` 即可看到 GraphQL Playground，你可以在这里测试本项目的所有 API 接口。

如果需要监听代码更新，使用以下命令启动项目：

```shell
npm run start:dev
```

## 测试

```shell
# 单元测试
npm test

# E2E 测试
npm run test:e2e

# 测试覆盖率
npm run test:cov
```
