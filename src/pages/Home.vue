<template>
  <div class="home">
    <ul>
      <li>
        <router-link to="/test">测试</router-link>
      </li>
      <li>
        <router-link to="/formTableTest">表格嵌套表单</router-link>
      </li>
      <li>
        <router-link to="/keyTest">key值测试</router-link>
      </li>
      <li>
        <router-link to="/video-tee3">tee3音视频测试</router-link>
      </li>
      <li>
        <router-link to="/touch-scale">双指缩放图片</router-link>
      </li>
      <li>
        <router-link to="/component-name-test">组件命名测试</router-link>
      </li>
      <li>
        <router-link to="/css-var">css变量交互</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>

</style>
