<!--
 * @Author: fzsong3
 * @Date: 2020/9/7 11:48
 * @Description:
-->
<template>
  <div class="an-hui-map">
    <div id="map"></div>
  </div>
</template>

<script>

import AHGeoData from '../../public/mapData/AH.json'

export default {
  name: 'AnHuiMap',
  created () {
  },
  mounted () {
    this.createChart()
  },
  methods: {
    createChart () {
      const myChart = this.$echarts.init(document.getElementById('map'))
      this.$echarts.registerMap('AH', AHGeoData)
      let option
      myChart.setOption(option = {
        title: {
          text: '安徽地图',
          subtext: '安徽地图数据来自Wikipedia',
          sublink: 'https://www.baidu.com'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          // feature: {
          //   dataView: {readOnly: false},
          //   restore: {},
          //   saveAsImage: {}
          // }
        },
        visualMap: {
          // min: 800,
          // max: 50000,
          // text: ['High', 'Low'],
          // realtime: false,
          // calculable: true,
          // inRange: {
          //   color: ['lightskyblue', 'yellow', 'orangered']
          // }
        },
        series: [
          {
            name: '香港18区人口密度',
            type: 'map',
            mapType: 'AH', // 自定义扩展图表类型
            label: {
              show: true
            },
            // data: [
            //   {name: '宿州市', value: 20057.34},
            //   {name: '淮北市', value: 15477.48},
            //   {name: '亳州市', value: 31686.1},
            //   {name: '蚌埠市', value: 6992.6},
            //   {name: '阜阳市', value: 44045.49},
            //   {name: '滁州市', value: 40689.64},
            //   {name: '淮南市', value: 37659.78},
            //   {name: '六安市', value: 45180.97},
            //   {name: '合肥市', value: 55204.26},
            //   {name: '马鞍山市', value: 21900.9},
            //   {name: '芜湖市', value: 4918.26},
            //   {name: '铜陵市', value: 5881.84},
            //   {name: '安庆市', value: 4178.01},
            //   {name: '池州市', value: 2227.92},
            //   {name: '黄山市', value: 2180.98},
            //   {name: '宣城市', value: 9172.94},
            // ],
            // // 自定义名称映射
            // nameMap: {
            //   'Central and Western': '中西区',
            //   'Eastern': '东区',
            //   'Islands': '离岛',
            //   'Kowloon City': '九龙城',
            //   'Kwai Tsing': '葵青',
            //   'Kwun Tong': '观塘',
            //   'North': '北区',
            //   'Sai Kung': '西贡',
            //   'Sha Tin': '沙田',
            //   'Sham Shui Po': '深水埗',
            //   'Southern': '南区',
            //   'Tai Po': '大埔',
            //   'Tsuen Wan': '荃湾',
            //   'Tuen Mun': '屯门',
            //   'Wan Chai': '湾仔',
            //   'Wong Tai Sin': '黄大仙',
            //   'Yau Tsim Mong': '油尖旺',
            //   'Yuen Long': '元朗'
            // }
          }
        ]
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.an-hui-map {
  #map {
    width: 800px;
    height: 800px;
  }
}
</style>
