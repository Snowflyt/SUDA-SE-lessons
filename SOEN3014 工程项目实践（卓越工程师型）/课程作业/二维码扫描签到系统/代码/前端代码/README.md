# 前端代码

模板基于[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)，如遇问题可参考其文档。

## 运行步骤

```bash 
# Install dependencies
npm install --registry=https://registry.npmmirror.com

# Serve with hot reload at localhost:9528
npm run dev
```

构建完成后即可访问`http://localhost:9528`看到前端页面（注意后端必须已运行）

如果后端修改了端口，或者已经部署到服务器上，请修改`vue.config.js`中`devServer/proxy/[process.env.VUE_APP_BASE_API]/target`中的相关服务器地址

如果需要修改前端端口，请修改`vue.config.js`中的`port`常量

## 构建步骤

```bash
# Build for production with minification
npm run build

# Build for production and view the bundle analyzer report
npm run build --report
```

