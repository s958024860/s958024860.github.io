<!--
 * @Author: fzsong3
 * @Date: 2020/6/22 10:43
 * @Description:
-->
<template>
  <div class="key-test">
    <div>
      操作下标：<el-input-number v-model="targetIndex"></el-input-number>
      <el-button @click="insert">插入</el-button>
      <el-button @click="del">删除</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="update">修改</el-button>
    </div>
    <KeyObject
      v-for="item in keyList"
      :key="item.id"
      :data-obj="item"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import KeyObject from '../components/key/KeyObject'
import { getKeyList } from '../api'
export default {
  name: 'KeyTest',
  components: { KeyObject },
  data () {
    return {
      keyList: [],
      targetIndex: -1,
      initList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      getKeyList()
        .then(({ data }) => {
          this.keyList = data.rows
          this.initList = _.cloneDeep(data.rows)
        })
    },
    insert () {
      this.keyList.splice(Number(this.targetIndex), 1)
    },
    del () {
      this.keyList.splice(Number(this.targetIndex), 1)
    },
    reset () {
      this.keyList = _.cloneDeep(this.initList)
    },
    update () {
      const _obj = {
        id: uuidv4(),
        name: 'sfz',
        age: 30,
        job: '插入工程师'
      }
      this.keyList.splice(this.targetIndex, 1, _obj)
    },
  }
}
</script>

<style scoped>

</style>
