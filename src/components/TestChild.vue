<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:13
 * @Description:
-->
<template>
  <div class="test-child">
    当前行： {{ source.id }}
  </div>
</template>

<script>
export default {
  name: 'TestChild',
  props: {
    source: Object,
  }
}
</script>

<style scoped>

</style>
