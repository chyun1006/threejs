<script setup></script>

<template>
  <div style="display: flex;gap: 10px;justify-content: center;">
    <router-link to="/light">光线</router-link>
    <router-link to="/light">材质</router-link>
    <router-link to="/basic">基础</router-link>
  </div>

  <router-view></router-view>
</template>

<style scoped></style>
