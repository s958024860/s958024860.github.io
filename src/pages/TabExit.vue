<!--
 * @Author: fzsong3
 * @Date: 2020/7/29 20:31
 * @Description:
-->
<template>
  <div class="tab-exit">
    tab页退出提示
  </div>
</template>

<script>
export default {
  name: 'TabExit',
  created() {
    window.addEventListener('beforeunload', this.remind)
  },
  methods: {
    remind (e) {
      e.returnValue = true
    }
  },
  beforeDestroy () {
    window.removeEventListener('onbeforeload', this.remind)
  }
}
</script>

<style lang="scss" scoped>

</style>
