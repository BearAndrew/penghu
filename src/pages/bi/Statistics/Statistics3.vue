<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">歷史用電量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 justify-between gap-4 h-0 mt-4">
          <div class="w-full h-full overflow-y-auto hover:overflow-y-scroll scrollbar-hide">
            <table class="min-w-full text-center text-white table-fixed border-separate border-spacing-0">
              <thead class="sticky top-0 z-10 bg-[#703eff]">
                <tr>
                  <th class="px-4 py-1 bg-[#703eff]">日期</th>
                  <th class="px-4 py-1 bg-[#703eff]">平均用電量</th>
                  <th class="px-4 py-1 bg-[#703eff]">最大用電量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in block1" :key="index"
                  :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                  <td class="px-4 py-1">{{ item.date }}</td>
                  <td class="px-4 py-1">{{ formatNumber(item.avg) }}</td>
                  <td class="px-4 py-1">{{ formatNumber(item.max) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日各小時各異常狀況數量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <BarChartComponent :dataSet="block2.dataSet">
            </BarChartComponent>
          </div>


          <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
            {{ block2.yLabel }}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">
            {{ block2.xLabel }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日各區域異常狀況數量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <BarChartComponent :dataSet="block3.dataSet" :direction="'horizontal'">
            </BarChartComponent>
          </div>


          <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
            {{ block3.yLabel }}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">
            {{ block3.xLabel }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示異常狀況即時數量與當日累積</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <BarChartComponent :dataSet="block4.dataSet">
            </BarChartComponent>
          </div>


          <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
            {{ block4.yLabel }}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">
            {{ block4.xLabel }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日異常狀況百分比</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4">
          <div class="w-full h-full">
            <PieChartComponent :dataSet="block5.dataSet">
            </PieChartComponent>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日用電量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">
          <div class="flex flex-col gap-4 items-center justify-center w-full text-white leading-none">
            <!-- 顯示 current，使用千分位 -->
            <div>
              <span class="text-[70px] font-bold">{{ formatNumber(block6.current) }}</span>
              <span class="text-[36px]">kWh</span>
            </div>

            <!-- stats 用 v-for 呈現，不使用千分位 -->
            <div class="flex items-center gap-4">
              <div v-for="(item, index) in block6.stats" :key="index" class="flex flex-col items-center gap-2">
                <div class="text-xl">{{ item.label }}</div>
                <div class="text-[36px] font-bold">{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BarChartComponent from '@/shared/components/BarChart.vue';
import PieChartComponent from '@/shared/components/PieChart.vue';

export default {
  name: 'BiStatistics3',
  components: {
    BarChartComponent,
    PieChartComponent
  },
  data() {
    return {
      block1: [
        {
          date: "2025/07/05",
          avg: 161638,
          max: 261283,
        },
        {
          date: "2025/07/06",
          avg: 158000,
          max: 255000,
        },
        {
          date: "2025/07/07",
          avg: 152345,
          max: 248912,
        },
        {
          date: "2025/07/05",
          avg: 161638,
          max: 261283,
        },
        {
          date: "2025/07/06",
          avg: 158000,
          max: 255000,
        },
        {
          date: "2025/07/07",
          avg: 152345,
          max: 248912,
        },
        {
          date: "2025/07/05",
          avg: 161638,
          max: 261283,
        },
        {
          date: "2025/07/06",
          avg: 158000,
          max: 255000,
        },
        {
          date: "2025/07/07",
          avg: 152345,
          max: 248912,
        },
      ],
      block2: {
        xLabel: '地點',
        yLabel: '每小時統計次數',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 2 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 5 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 8 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 11 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 5',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 4 },
            ]
          },
        ]
      },
      block3: {
        xLabel: '次數',
        yLabel: '地點',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 2 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 5 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 8 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 11 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 5',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 4 },
            ]
          },
        ]
      },
      block4: {
        xLabel: '地點',
        yLabel: '每日統計次數',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 2 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 5 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 8 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#c145ff'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 11 },
              { key: '一樓停車場', value: 0 },
            ]
          },
          {
            label: 'Bar 5',
            colors: ['#5bbeff', '#279cfb'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
              { key: '一樓停車場', value: 4 },
            ]
          },
        ]
      },
      block5: {
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
      block6: {
        current: 161992,
        stats: [
          { label: 'Min.', value: 5678 },
          { label: 'Max.', value: 19123 },
          { label: 'Avg.', value: 11540 },
        ],
      }
    };
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString(); // 加上千分位
    },
  },
}
</script>
