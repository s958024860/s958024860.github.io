<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:11
 * @Description:
-->
<template>
  <div class="test">
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
      testData: [
        { id: 'sdf', name: 'sdf' },
        { id: 'sgsdf', name: 'sdf' },
        { id: 'sdfggh', name: 'sdf' },
        { id: 'sdhhhf', name: 'sdf' },
        { id: 'sddsssf', name: 'sdf' },
      ]
    }
  }
}
</script>

<style scoped>

</style>
