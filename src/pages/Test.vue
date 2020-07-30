<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:11
 * @Description:
-->
<template>
  <div class="test">
    <div class="form" ref="form"></div>
    <template v-for="(item, index) in testData">
      <TestChild
        v-show="currentIndex === index"
        :key="item.id"
        :source="item"
      />
    </template>
  </div>
</template>

<script>

import TestChild from '../components/TestChild'

export default {
  name: 'Test',
  components: { TestChild },
  data () {
    return {
      currentIndex: 0,
      popWidth: 0,
      testData: [
        { id: 'sdf', name: 'sdf' },
        { id: 'sgsdf', name: 'sdf' },
        { id: 'sdfggh', name: 'sdf' },
        { id: 'sdhhhf', name: 'sdf' },
        { id: 'sddsssf', name: 'sdf' },
      ]
    }
  },
  mounted () {
    this.observer = new ResizeObserver(() => {
      this.getPopWidth()
    }).observe(this.$refs['form'])
    // // // 监控表单尺寸变化 todo
    // this.observer.observe(this.$refs['form'])
  },
  beforeDestroy () {
    // 清除监听
    this.observer.unobserve(this.$refs['form'])
  },
  methods: {
    async getPopWidth () {
      await this.$nextTick()
      if (this.$refs['form']) {
        this.popWidth = this.$refs['form'].clientHeight
          ? this.$refs['form'].clientHeight - 80
          : 800
      }
      console.log(this.popWidth)
    },
  }
}
</script>

<style scoped>
  .test {
    height: 100%;
    width: 100%;
  }
  .form {
    height: 100%;
    width: 100%;
  }
</style>
