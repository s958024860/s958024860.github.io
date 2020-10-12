<!--
 * @Author: fzsong3
 * @Date: 2020/10/10 9:06
 * @Description: h5显示pdf 两种方式
    1、使用pdfjs已经写好的viewer.html页面
    2、将PDF文件渲染成Canvas
    注意：带有签名信息的pdf 需要将默认的 "sig类型的隐藏代码" 注释掉
-->
<template>
  <div class="pdf-viewer">
    <h3>pdf 文件显示</h3>
    <canvas v-for="item in totalPage" :key="item" :id='"the-canvas" + item' class="pdf-content"></canvas>
  </div>
</template>

<script>
export default {
  name: 'PdfViewer',
  components: {
    pdf,
  },
  data () {
    return {
      totalPage: 1,
      pdfFile: 'https://zlwyl-dev.iflyhealth.com/swift/v1/pb/5f8124f3e4b0389cfd605efc.pdf',
    }
  },
  mounted () {
    let loadingTask = pdfjsLib.getDocument(new URL(this.pdfFile).pathname)
    loadingTask.promise.then(pdf => {
      let pageNum = pdf.numPages
      this.totalPage = pageNum
      for (let i = 1; i <= pageNum; i++) {
        pdf.getPage(i).then(page => {
          let viewport = page.getViewport({ scale: 1.5, })
          let canvas = document.getElementById('the-canvas' + i)
          let context = canvas.getContext('2d')
          canvas.height = viewport.height
          canvas.width = viewport.width
          let renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          page.render(renderContext)
        })
      }
    }, function (reason) {
      console.error(reason)
    })
  },
}
</script>

<style lang="scss" scoped>
.pdf-viewer {}
</style>
