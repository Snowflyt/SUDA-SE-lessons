<template>
  <div id="content3" v-if="$route.name === 'login'">
    <Login />
  </div>

  <div class="-layout" v-if="$route.name !== 'login'">
    <el-container class="el-container">
      <el-aside width="200px">
        <LeftMenu />
      </el-aside>
      <el-container>
        <el-header>
          <PageHeader />
        </el-header>
        <el-main>
          <div id="content">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import LeftMenu from '../components/LeftMenu.vue'
import PageHeader from '../components/PageHeader.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Login from '../pages/Login.vue'

const router = useRouter()
onMounted(async () => {
  router.push('/login')
})

export default {
  components: { Login, PageHeader, LeftMenu }
}
</script>

<style>
.el-container {
  height: 100%;
}
</style>
