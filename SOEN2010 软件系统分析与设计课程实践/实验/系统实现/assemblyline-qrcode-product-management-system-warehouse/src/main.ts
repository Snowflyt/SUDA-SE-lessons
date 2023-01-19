import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './leftMenu.css'
import * as VueRouter from 'vue-router'
import routes from './config/route'

const router = VueRouter.createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHistory(),
  routes // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
