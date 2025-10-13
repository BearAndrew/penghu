<template>
  <div class="h-full relative flex items-center justify-center gap-4">

    <div class="flex flex-col flex-1 items-center justify-center gap-4 w-0 h-full">

      <div class="flex flex-col flex-1 w-full h-0 px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">人流</h3>
          <GradientDropdown class="ml-auto mr-10 my-2 !w-[120px]" v-model="block1.unit" :options="unitOptions"
            placeholder="請選擇" :triggerClass="'px-2 py-1 text-sm'" :optionClass="'px-2 py-1 text-sm'" />
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>

        <div class="flex flex-1 items-center justify-between gap-4 h-0 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <LineChartComponent :dataSet="block1.dataSet" :fontSetting="fontSetting">
            </LineChartComponent>
          </div>


          <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
            {{ block1.yLabel }}
          </div>
          <div class="absolute -bottom-1 right-0 text-xs text-white">
            {{ block1.xLabel }}
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white flex gap-8">
            <div v-for="(item, index) in block1.dataSet" :key="index" class="flex items-center space-x-1">
              <span class="w-2 h-2 rounded-full inline-block" :style="{ backgroundColor: item.colors[0] }"></span>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-1 items-center justify-center gap-4 h-0 w-full">
        <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">人臉辨識</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>

          <GradientDropdown class="self-end my-2 !w-[120px]" v-model="block2.unit" :options="unitOptions"
            placeholder="請選擇" :triggerClass="'px-2 py-1 text-sm'" :optionClass="'px-2 py-1 text-sm'" />

          <div class="flex flex-1 items-center justify-between gap-4 h-0 relative">
            <div class="pl-4 pb-4 w-full h-full">
              <BarChartComponent :dataSet="block2.dataSet" :fontSetting="fontSetting">
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

        <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">遺留/遺失物</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>

          <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-10 relative">
            <div class="pl-4 pb-4 w-full h-full">
              <BarChartComponent :dataSet="block3.dataSet" :direction="'horizontal'" :fontSetting="fontSetting">
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

        <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">人員偵測</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>

          <GradientDropdown class="self-end my-2 !w-[120px]" v-model="block4.unit" :options="unitOptions"
            placeholder="請選擇" :triggerClass="'px-2 py-1 text-sm'" :optionClass="'px-2 py-1 text-sm'" />

          <div class="flex flex-1 items-center justify-between gap-4 h-0 relative">
            <div class="pl-4 pb-4 w-full h-full">
              <BarChartComponent :dataSet="block4.dataSet" :fontSetting="fontSetting">
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

      </div>

    </div>


    <div class="flex flex-row-reverse flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a] overflow-hidden">
      <div class="flex justify-end mb-4 w-8 relative">
        <img src="/assets/img/common/icon-close.png" alt="close" class="h-5" />
      </div>


      <div class="flex flex-1 flex-col justify-between gap-2 h-full">
        <div v-for="(section, index) in block5" :key="index" class="flex flex-1 items-center gap-4 h-0">
          <!-- 左側 icon 區 -->
          <div class="flex flex-col min-w-[200px]">
            <div class="flex items-center gap-4 w-full relative">
              <div class="rounded-full w-6 h-6" :style="{ backgroundColor: section.color }"></div>
              <h3 class="text-xl text-white font-bold">{{ section.title }}</h3>
            </div>
            <img :src="section.image" :alt="section.title" class="self-end h-full" />
          </div>

          <!-- 右側內容區 -->
          <div
            class="flex flex-col flex-1 rounded-xl border border-[#89919e] border-solid overflow-hidden bg-transparent text-white">
            <!-- 表頭套用 section.color -->
            <div class="p-1 font-bold grid grid-cols-4 gap-2 px-4 text-center"
              :style="{ backgroundColor: section.color }">
              <div v-for="(header, hIndex) in section.headers" :key="hIndex">
                {{ header }}
              </div>
            </div>

            <!-- 最多顯示三筆 -->
            <div v-for="i in 3" :key="i" class="p-1 grid grid-cols-4 gap-2 mx-4 border-gray-300 text-sm text-center"
              :class="i === 1 ? '' : 'border-t'">
              <div>{{ section.items[i - 1]?.area || '-' }}</div>
              <div>{{ section.items[i - 1]?.startTime || '-' }}</div>
              <div>{{ section.items[i - 1]?.endTime || '-' }}</div>
              <div>{{ section.items[i - 1]?.person || '-' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BarChartComponent from '@/shared/components/BarChart.vue';
import LineChartComponent from '@/shared/components/LineChart.vue';
import GradientDropdown from '../../../shared/components/GradientDropdown.vue';

export default {
  name: 'BiStatistics1',
  components: {
    BarChartComponent,
    LineChartComponent,
    GradientDropdown
  },
  data() {
    return {
      fontSetting: { 'font-size': '8px', color: '#fff' },
      unitOptions: [
        { value: 1, name: '單位:小時' },
        { value: 2, name: '單位:天' },
        { value: 3, name: '單位:週' },
      ],
      block1: {
        xLabel: '時間',
        yLabel: '人次數',
        unit: 1,
        dataSet: [
          {
            label: '一樓大門',
            colors: ['#fff'],
            data: [
              { key: '0100', value: 122 },
              { key: '0200', value: 261 },
              { key: '0300', value: 73 },
              { key: '0400', value: 342 },
              { key: '0500', value: 9 },
              { key: '0600', value: 290 },
              { key: '0700', value: 400 },
              { key: '0800', value: 68 },
              { key: '0900', value: 156 },
              { key: '1000', value: 320 },
              { key: '1100', value: 201 },
              { key: '1200', value: 44 },
              { key: '1300', value: 178 },
              { key: '1400', value: 400 },
              { key: '1500', value: 110 },
              { key: '1600', value: 312 },
              { key: '1700', value: 397 },
              { key: '1800', value: 14 },
              { key: '1900', value: 272 },
              { key: '2000', value: 101 },
              { key: '2100', value: 231 },
              { key: '2200', value: 92 },
              { key: '2300', value: 344 },
              { key: '2400', value: 204 }
            ]
          },
          {
            label: '一樓',
            colors: ['#ffef00'],
            data: [
              { key: '0100', value: 57 },
              { key: '0200', value: 187 },
              { key: '0300', value: 303 },
              { key: '0400', value: 24 },
              { key: '0500', value: 320 },
              { key: '0600', value: 210 },
              { key: '0700', value: 71 },
              { key: '0800', value: 396 },
              { key: '0900', value: 169 },
              { key: '1000', value: 114 },
              { key: '1100', value: 293 },
              { key: '1200', value: 340 },
              { key: '1300', value: 52 },
              { key: '1400', value: 11 },
              { key: '1500', value: 381 },
              { key: '1600', value: 83 },
              { key: '1700', value: 264 },
              { key: '1800', value: 133 },
              { key: '1900', value: 309 },
              { key: '2000', value: 141 },
              { key: '2100', value: 226 },
              { key: '2200', value: 385 },
              { key: '2300', value: 74 },
              { key: '2400', value: 25 }
            ]
          },
          {
            label: '二樓',
            colors: ['#3ac2f2'],
            data: [
              { key: '0100', value: 295 },
              { key: '0200', value: 344 },
              { key: '0300', value: 135 },
              { key: '0400', value: 400 },
              { key: '0500', value: 17 },
              { key: '0600', value: 158 },
              { key: '0700', value: 289 },
              { key: '0800', value: 105 },
              { key: '0900', value: 312 },
              { key: '1000', value: 238 },
              { key: '1100', value: 360 },
              { key: '1200', value: 199 },
              { key: '1300', value: 2 },
              { key: '1400', value: 77 },
              { key: '1500', value: 270 },
              { key: '1600', value: 61 },
              { key: '1700', value: 159 },
              { key: '1800', value: 211 },
              { key: '1900', value: 318 },
              { key: '2000', value: 190 },
              { key: '2100', value: 297 },
              { key: '2200', value: 22 },
              { key: '2300', value: 206 },
              { key: '2400', value: 90 }
            ]
          },
          {
            label: '停車場',
            colors: ['#ec89b5'],
            data: [
              { key: '0100', value: 221 },
              { key: '0200', value: 111 },
              { key: '0300', value: 340 },
              { key: '0400', value: 297 },
              { key: '0500', value: 141 },
              { key: '0600', value: 399 },
              { key: '0700', value: 92 },
              { key: '0800', value: 87 },
              { key: '0900', value: 135 },
              { key: '1000', value: 368 },
              { key: '1100', value: 310 },
              { key: '1200', value: 51 },
              { key: '1300', value: 240 },
              { key: '1400', value: 182 },
              { key: '1500', value: 65 },
              { key: '1600', value: 308 },
              { key: '1700', value: 343 },
              { key: '1800', value: 299 },
              { key: '1900', value: 11 },
              { key: '2000', value: 176 },
              { key: '2100', value: 387 },
              { key: '2200', value: 32 },
              { key: '2300', value: 368 },
              { key: '2400', value: 12 }
            ]
          }
        ]
      },
      block2: {
        xLabel: '區域',
        yLabel: '異常次數',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#01af98'],
            data: [
              { key: '一樓大廳', value: 2 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c3d990'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 1 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#bbd04f'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 3 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#fefab1'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 1 },
            ]
          },
        ]
      },
      block3: {
        xLabel: '次數',
        yLabel: '區域',
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#01af98'],
            data: [
              { key: '二樓出境', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓大廳', value: 2 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c3d990'],
            data: [
              { key: '二樓出境', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '一樓大門', value: 1 },
              { key: '一樓大廳', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#bbd04f'],
            data: [
              { key: '二樓出境', value: 0 },
              { key: '一樓入境', value: 3 },
              { key: '一樓大門', value: 0 },
              { key: '一樓大廳', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#fefab1'],
            data: [
              { key: '二樓出境', value: 1 },
              { key: '一樓入境', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓大廳', value: 0 },
            ]
          }
        ]
      },
      block4: {
        xLabel: '區域',
        yLabel: '異常次數',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#01af98'],
            data: [
              { key: '一樓大廳', value: 2 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c3d990'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 1 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#bbd04f'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 3 },
              { key: '二樓出境', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#fefab1'],
            data: [
              { key: '一樓大廳', value: 0 },
              { key: '一樓大門', value: 0 },
              { key: '一樓入境', value: 0 },
              { key: '二樓出境', value: 1 },
            ]
          },
        ]
      },
      block5: [
        {
          title: "徘徊",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/徘徊.png",
          headers: ["區域", "發生時間", "解除時間", "人員"],
          items: [
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
          ],
        },
        {
          title: "跌倒",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/跌倒.png",
          headers: ["區域", "發生時間", "解除時間", "人員"],
          items: [
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
          ],
        },
        {
          title: "闖入禁區",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/闖入禁區.png",
          headers: ["區域", "發生時間", "解除時間", "人員"],
          items: [
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
          ],
        },
        {
          title: "擁擠",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/擁擠.png",
          headers: ["區域", "發生時間", "解除時間", "人員"],
          items: [
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
            },
          ],
        },
      ]
    };
  }
}
</script>
