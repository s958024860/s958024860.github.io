<!--
 * @Author: fzsong3
 * @Date: 2020/7/27 10:11
 * @Description:
-->
<template>
  <div class="test">
    <div>点击次数：{{ number }}</div>
    <button
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @click="tagClick()"
    >点击</button>
    <!--    <draggable-->
    <!--      drag-class="drag-class"-->
    <!--      v-model="myArray"-->
    <!--      :group="{ name: '', pull: 'clone', put: false }"-->
    <!--      :sort="false"-->
    <!--      @change="log"-->
    <!--      @start="onStart"-->
    <!--      @end="onEnd"-->
    <!--    >-->
    <!--      <transition-group>-->
    <!--        -->
    <!--      </transition-group>-->
    <!--    </draggable>-->
    <div
        v-for="(element, index) in myArray"
        :key="element.title"
        style="position: relative; height: 100px;"
    >
      <div
          class="box"
          :class="`box-${index + 1}`"
          @mouseover="mouseover(index)"
      >
        {{ element.title }}123123
      </div>
      <div
          v-if="dragIndex === index"
          :style="`opacity: ${showIndex === index ? 1 : 0};`"
          class="box box-cover"
          :class="`box-${index + 1}`"
          draggable="true"
          @dragstart="dragstart(index)"
          @dragend="dragend"
      >
        {{ element.title }}
      </div>
    </div>
  </div>
</template>

<script>

import draggable from 'vuedraggable'

export default {
  name: 'Test',
  components: { draggable },
  data () {
    return {
      message: '',
      number: 0,
      dragIndex: -1,
      showIndex: -1,
      myArray: [
        { title: '排班1', bgcolor: '#7EBAF3' },
        { title: '排班2', bgcolor: '#80CBD8' },
        { title: '排班3', bgcolor: '#E3C59B' },
        { title: '排班4', bgcolor: '#E9AC94' },
        { title: '排班5', bgcolor: '#E7CE83' },
      ]
    }
  },
  filters: {
  },
  mounted () { },
  beforeDestroy () { },
  methods: {
    touchstart (e) {
      console.log('touchstart', e)
    },
    touchmove (e) {
      console.log('touchmove', e)
    },
    touchend (e) {
      console.log('touchend', e)
    },
    tagClick () {
      console.log('click', e)
    },
    dragstart (index) {
      this.showIndex = index
    },
    dragend () {
      this.dragIndex = -1
      this.showIndex = -1
    },
    mouseover (index) {
      this.dragIndex = index
    },
  },
}
</script>

<style lang="scss" scoped>
  .test {
    @import "card";
    height: 100%;
    width: 100%;
    .box {
      width: 100px;
      height: 100px;
      position: absolute;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background-color: red;
        border-radius: 4px;
      }
    }
    .draggable {
      position: absolute;
      top: 0;
      height: 0;
    }
    .drag-class {
      height: 50px;
      margin-bottom: 50px;
    }
    .box-cover {
      height: 50px;
    }
  }
</style>
