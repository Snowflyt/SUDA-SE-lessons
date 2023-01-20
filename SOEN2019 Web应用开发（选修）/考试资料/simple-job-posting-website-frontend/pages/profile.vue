<template>
  <div>
    <h1>个人档案</h1>
    <div>用户名: {{ profile.username }}</div>
    <div>邮箱: {{ profile.email === null ? '未设置' : profile.email }}</div>
    <div>电话: {{ profile.phone === null ? '未设置' : profile.phone }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { getAccountInfo } from '~~/utils/auth'

const profile = ref(getAccountInfo())
</script>
