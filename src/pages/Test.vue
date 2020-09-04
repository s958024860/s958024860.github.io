<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:11
 * @Description:
-->
<template>
  <div class="test">
    <TestChild />
    <!--    <div v-show="showFlag" v-if="ifFlag">-->
    <!--&lt;!&ndash;      <div class="box" v-wrap-title >{{ text | testFormat }}</div>&ndash;&gt;-->
    <!--      <TestChild/>-->
    <!--    </div>-->
    <!--    <el-button @click="showFlag = !showFlag">show显示、关闭</el-button>-->
    <!--    <el-button @click="ifFlag = !ifFlag">if显示、关闭</el-button>-->
  </div>
</template>

<script>
import TestChild from './TestChild'
export default {
  name: 'Test',
  components: { TestChild },
  data () {
    return {
      showFlag: false,
      ifFlag: false,
      text: '收代理费快结束了收代理费快结束了收代理费快结束了收代理费快结束了',
    }
  },
  filters: {
    testFormat (value) {
      return value + '13245'
    },
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    diyTest (pram2, paramArr) {
      console.log(pram2)
      console.log(paramArr)
      return paramArr + pram2
    }
  },
}
</script>

<style lang="scss" scoped>
.test {
  height: 100%;
  width: 100%;
  .box {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
