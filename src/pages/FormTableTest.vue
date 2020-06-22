<!--
 * @Author: fzsong3
 * @Date: 2020/6/22 11:05
 * @Description:
-->
<template>
  <div class="form-table-test">
    <FormTest />
  </div>
</template>

<script>
import FormTest from '../components/FormTest'
export default {
  name: 'FormTableTest',
  components: {
    FormTest
  },
}
</script>

<style scoped>
  .form-table-test {
    height: 100%;
    width: 100%;
    display: flex;
  }

</style>
