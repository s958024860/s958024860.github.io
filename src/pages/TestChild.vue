<!--
 * @Author: fzsong3
 * @Date: 2020/9/3 11:45
 * @Description:
-->
<template>
  <div ref="box" class="box">收代理费快结束了收代理费快结束了收代理费快结束了收代理费快结束了</div>
</template>

<script>
export default {
  name: 'TestChild',
  data () {
    return {
      text: '收代理费快结束了收代理费快结束了收代理费快结束了收代理费快结束了',
    }
  },
  filters: {
    testFormat (value) {
      return value + '13245'
    },
  },
  mounted () {
    const { clientWidth, scrollWidth } = this.$refs['box']
    console.log(clientWidth, scrollWidth)
  }
}
</script>

<style scoped>

</style>
