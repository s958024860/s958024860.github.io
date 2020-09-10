<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:11
 * @Description:
-->
<template>
  <div class="test">
    <el-select v-model="dataFieldCode" filterable @change="dataChanged">
      <el-option
        v-for="(item, index) in codeOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import TestChild from './TestChild'
export default {
  name: 'Test',
  components: { TestChild },
  data () {
    return {
      dataFieldCode: '',
      codeOptions: [
        { name: 'sfz', id: 'sdf' },
        { name: 'sfz1', id: 'sfz1' },
        { name: 'sfz2', id: 'sfz2' },
        { name: 'sfz3', id: 'sfz3' },
        { name: 'sfz4', id: 'sfz4' },
        { name: 'sfz5', id: 'sfz5' },
        { name: 'sfz6', id: 'sfz6' },
      ]
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
    dataChanged (item) {
      console.log(item)
    },
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
