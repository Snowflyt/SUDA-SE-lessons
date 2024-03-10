# nestjs-lottery-app

抽奖程序后端，基于 NestJS 开发，使用 SQLite 作为数据库，使用 GraphQL 作为 API 接口。

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

## 简介

这实际上是一个已经配完 JWT 鉴权和完整测试的项目，作为平时作业的后端，似乎有点太过复杂和笨重了。尤其是涉及 Prisma 和鉴权相关的几个装饰器的部分，我运用了大量 TS 类型体操，这部分代码应该不容易看懂。不过除此之外的部分我认为应该是相对规范的，用作一个学习项目倒也无妨。

如果你不熟悉 NestJS，它是 JS 后端社区的一个类似于 Java 生态里 Spring 的后端框架。它的官网在[这里](https://nestjs.com/)，文档写的非常好，该项目主要涉及了 NestJS 的 Prisma、GraphQL、JWT 鉴权、Caching 这几个部分，如果你试图了解本项目的代码逻辑，可以针对性看看这几个部分。

本项目的所有 API 接口均使用 GraphQL——如果你不熟悉 GraphQL，它是区别于传统 RESTful API 的一种新型 API 接口，说大白话就是可以让前端指定需要什么数据，后端仅返回前端请求的数据。我个人是很喜欢 GraphQL 的思路的，但这东西的生态不算好，属于有一些拥蹙者，但始终没有大火的状态，而 JS 后端算是目前 GraphQL 后端生态最好的地方了，所以选 NestJS 而不是其他编程语言的后端框架也颇有些无奈。

在运行 `npm start` 后，你可以在 `http://localhost:3000/graphql` 看到 GraphQL Playground，这是一个用于测试 GraphQL API 的工具，你可以在这里测试本项目的所有 API 接口。

本项目采用 Prisma 作为 ORM，为了方便使用，与 Prisma 相关的代码颇做了一番类型体操，虽然这部分类型体操代码很难读，但用起来应该还是挺好用的。为了方便测试，`prisma/schema.prisma` 文件是用一个叫做 Schemix 的库生成的，在常规环境下使用 `prisma/dev.db` 作为数据库，在测试环境下使用 `prisma/test.db` 作为数据库（该数据库每次测试都会删除重建）。为了简单起见，数据库使用了 SQLite，如果你想使用其他数据库，可以自行修改 `.env` 文件和 `prisma/index.ts` 文件的相关部分。

项目也配置了完整的 JWT 鉴权，基本遵照 NestJS 的官方文档，使用了 passport-jwt 这个库。鉴权的思路也比较传统，采用了 User-Role-Permission 三个实体的思路。相应的，为了方便使用，我在 `src/common/auth/decorators` 中定义了一些鉴权相关的装饰器，它们的示例可以比较轻松地在代码其余部分里找到。

然后项目的测试应该是非常完整的，你可以运行 `npm test` 和 `npm run test:e2e` 运行它们。E2E 测试里构建 GraphQL Query String 的部分用了我自己造的轮子 graphql-intuitive-request，这主要是个客户端用的 GraphQL 请求库，这里只是简单用于创建测试用的 Query String.

最后，和本次作业活动抽奖有关的部分位于 `src/lottery` 中，这部分代码写得非常简陋，也没写测试，但应该很容易看懂。

## 安装

确保你的电脑上已经安装了 Node.js 及 npm，然后进入本项目的根目录，运行以下命令即可。

```shell
npm install
```

## 启动

本项目需要在根目录下创建一个 `.env` 文件用于配置环境变量，该文件被 `.gitignore` 排除了，所以需要手动创建。你可以参考 `.env.example` 文件创建一个 `.env` 文件，然后填入你的配置——如果你懒得改，也可以直接复制 `.env.example` 文件并重命名为 `.env`。其中 `DATABASE_URL` 是数据库的连接字符串，`JWT_SECRET` 是 JWT 的密钥（这里使用了一个随机生成的 GUID，用作生产时请务必确保密钥的安全性），`TEST_ADMIN_USERNAME` 和 `TEST_ADMIN_PASSWORD` 是用于测试的管理员账号的用户名和密码，默认是 `su` 和 `1234`.

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
