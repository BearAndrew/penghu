<template>
  <div class="h-full relative flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0" :style="{
      backgroundImage: `url('/assets/img/common/gradient-dark.png')`,
      backgroundSize: '100% 100%',
    }"></div>

    <div class="flex flex-col mt-[var(--nav-height)] p-4 w-full h-[calc(100%-var(--nav-height))] z-10 gap-4">
      <div class="flex flex-col flex-1 w-full h-0 px-8 py-6 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-gradient-to-r from-[#47b69a] to-[#0287b9] rounded-full w-6 h-6"></div>
          <h3 class="text-[32px] text-white font-bold">{{ chartName }}</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>

        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="w-full h-full" :class="chartType !== 'pie' ? 'px-[100px] pb-20' : ''">
            <BarChartComponent v-if="chartType == 'bar'" :dataSet="block1.dataSet" :fontSetting="fontSetting">
            </BarChartComponent>

            <LineChartComponent v-if="chartType == 'line'" :dataSet="block2.dataSet" :fontSetting="fontSetting">
            </LineChartComponent>

            <PieChartComponent v-if="chartType == 'pie'" :dataSet="block3.dataSet" :fontSetting="fontSetting" :donutWidthRatio="0.3">
            </PieChartComponent>
          </div>


          <template v-if="chartType !== 'pie'">
            <div class="absolute top-1/2 left-16 -translate-y-1/2 text-xl text-white vertical-text">
              {{ block1.yLabel }}
            </div>
            <div class="absolute bottom-12 right-12 text-xl text-white">
              {{ block1.xLabel }}
            </div>
            <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-xl text-white flex gap-8">
              <div v-for="(item, index) in block1.dataSet" :key="index" class="flex items-center space-x-1">
                <span class="w-5 h-5 rounded-full inline-block" :style="{ backgroundColor: item.colors[0] }"></span>
                <span>{{ item.label }}</span>
              </div>
            </div>
          </template>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import BarChartComponent from '@/shared/components/BarChart.vue';
import PieChartComponent from '@/shared/components/PieChart.vue';
import LineChartComponent from '@/shared/components/LineChart.vue';

export default {
  name: 'ChartPage',
  components: {
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
  },
  data() {
    return {
      fontSetting: { 'font-size': '20px', color: '#fff' },
      chartName: '',
      mapping: {
        部門進出比例圖: { type: 'pie' },
        近一週各異常事件趨勢圖: { type: 'line' },
        長條圖: { type: 'pie' }
      },
      chartType: '',
      block1: {
        xLabel: '時間',
        yLabel: '人次數',
        dataSet: [
          {
            label: '火警',
            colors: ['#fff'],
            data: [
              { key: '5/17', value: 122 },
              { key: '5/18', value: 261 },
              { key: '5/19', value: 73 },
              { key: '5/20', value: 342 },
              { key: '5/21', value: 9 },
              { key: '5/22', value: 290 },
              { key: '5/23', value: 400 },
            ]
          },
          {
            label: '入侵',
            colors: ['#3ac2f2'],
            data: [
              { key: '5/17', value: 295 },
              { key: '5/18', value: 344 },
              { key: '5/19', value: 135 },
              { key: '5/20', value: 400 },
              { key: '5/21', value: 17 },
              { key: '5/22', value: 158 },
              { key: '5/23', value: 289 },
            ]
          },
          {
            label: '系統錯誤',
            colors: ['#ec89b5'],
            data: [
              { key: '5/17', value: 221 },
              { key: '5/18', value: 111 },
              { key: '5/19', value: 340 },
              { key: '5/20', value: 297 },
              { key: '5/21', value: 141 },
              { key: '5/22', value: 399 },
              { key: '5/23', value: 92 },
            ]
          },
          {
            label: '異常',
            colors: ['#ffef00'],
            data: [
              { key: '5/17', value: 57 },
              { key: '5/18', value: 187 },
              { key: '5/19', value: 303 },
              { key: '5/20', value: 24 },
              { key: '5/21', value: 320 },
              { key: '5/22', value: 210 },
              { key: '5/23', value: 71 },
            ]
          },
        ]
      },
      block2: {
        xLabel: '時間',
        yLabel: '人次數',
        dataSet: [
          {
            label: '火警',
            colors: ['#fff'],
            data: [
              { key: '5/17', value: 122 },
              { key: '5/18', value: 261 },
              { key: '5/19', value: 73 },
              { key: '5/20', value: 342 },
              { key: '5/21', value: 9 },
              { key: '5/22', value: 290 },
              { key: '5/23', value: 400 },
            ]
          },
          {
            label: '入侵',
            colors: ['#3ac2f2'],
            data: [
              { key: '5/17', value: 295 },
              { key: '5/18', value: 344 },
              { key: '5/19', value: 135 },
              { key: '5/20', value: 400 },
              { key: '5/21', value: 17 },
              { key: '5/22', value: 158 },
              { key: '5/23', value: 289 },
            ]
          },
          {
            label: '系統錯誤',
            colors: ['#ec89b5'],
            data: [
              { key: '5/17', value: 221 },
              { key: '5/18', value: 111 },
              { key: '5/19', value: 340 },
              { key: '5/20', value: 297 },
              { key: '5/21', value: 141 },
              { key: '5/22', value: 399 },
              { key: '5/23', value: 92 },
            ]
          },
          {
            label: '異常',
            colors: ['#ffef00'],
            data: [
              { key: '5/17', value: 57 },
              { key: '5/18', value: 187 },
              { key: '5/19', value: 303 },
              { key: '5/20', value: 24 },
              { key: '5/21', value: 320 },
              { key: '5/22', value: 210 },
              { key: '5/23', value: 71 },
            ]
          },
        ]
      },
      block3: {
        dataSet: [
          {
            label: '徘徊',
            colors: ['#97e1fe'],
            data: { value: 9 },
          },
          {
            label: '跌倒',
            colors: ['#1856ff'],
            data: { value: 12 },
          },
          {
            label: '遺留/遺失物',
            colors: ['#5cbeff'],
            data: { value: 40 },
          },
        ]
      },
    }
  },
  mounted() {
    this.chartName = this.$route.params.chartName;
  },
  watch: {
    '$route.params.chartName': {
      handler(newVal) {
        this.chartName = newVal;
        this.chartType = this.mapping[newVal] ? this.mapping[newVal].type : null;
      },
      immediate: true
    },
  }
}
</script>
