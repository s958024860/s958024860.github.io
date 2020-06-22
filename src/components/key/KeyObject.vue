<!--
 * @Author: fzsong3
 * @Date: 2020/6/22 11:16
 * @Description:
-->
<template>
  <div class="key-object">
    <span>id: {{ dataObj.id }} | </span>
    <span>name: {{ dataObj.name }} | </span>
    <span>job: {{ dataObj.job }}</span>
  </div>
</template>

<script>
export default {
  name: 'KeyObject',
  props: {
    dataObj: {
      type: Object,
      default: () => ({})
    },
  },
  mounted () {
    console.log(`mounted------${ this.dataObj.id}`)
  },
  updated () {
    console.log(`updated------${ this.dataObj.id}`)
  }
}
</script>

<style scoped>

</style>
