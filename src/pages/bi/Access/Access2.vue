<template>
  <div class="h-full relative flex items-center justify-center gap-4">

    <div class="flex flex-col flex-1 items-center justify-center gap-4 w-0 h-full">

      <div class="flex flex-1 items-center justify-center gap-4 h-0 w-full">
        <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">一日內異常刷卡次數過多</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>

          <GradientDropdown class="self-end my-2 !w-[120px]" v-model="block1.unit" :options="unitOptions"
            placeholder="請選擇" :triggerClass="'px-2 py-1 text-sm'" :optionClass="'px-2 py-1 text-sm'" />

          <div class="flex flex-1 items-center justify-between gap-4 h-0 relative">
            <div class="pl-4 pb-4 w-full h-full">
              <LineChartComponent :dataSet="block1.dataSet"></LineChartComponent>
            </div>

            <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
              {{ block1.yLabel }}
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">
              {{ block1.xLabel }}
            </div>
          </div>
        </div>

        <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">單日故障率</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>
          <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4">
            <div class="w-full h-full">
              <PieChartComponent :dataSet="block2.dataSet">
              </PieChartComponent>
            </div>
          </div>
        </div>

      </div>

      <div class="flex flex-col flex-1 w-full h-0 px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">進出頻率統計</h3>
          <GradientDropdown class="ml-auto mr-10 my-2 !w-[120px]" v-model="block3.unit" :options="unitOptions"
            placeholder="請選擇" :triggerClass="'px-2 py-1 text-sm'" :optionClass="'px-2 py-1 text-sm'" />
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>

        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4">
          <div class="flex flex-1 w-0 h-full relative">
            <div class="pl-4 pb-4 w-full h-full">
              <BarChartComponent :dataSet="block3.dataSet"></BarChartComponent>
            </div>

            <div class="absolute top-1/2 -left-1 -translate-y-1/2 text-xs text-white vertical-text">
              {{ block3.yLabel }}
            </div>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-white">
              {{ block3.xLabel }}
            </div>
          </div>

          <div class="flex flex-1 w-0 h-full">
            <div class="w-full h-full overflow-y-auto hover:overflow-y-scroll scrollbar-hide">
              <table class="min-w-full text-center text-white table-fixed border-separate border-spacing-0">
                <thead class="sticky top-0 z-10 bg-[#6dba38]">
                  <tr>
                    <th v-for="(header, index) in block3.headers" :key="index" :style="{ width: header.width }" :class="[
                      'px-1 py-1 bg-[#6dba38] text-sm font-bold',
                      index === 0 ? 'rounded-l-lg' : '',
                      index === block3.headers.length - 1 ? 'rounded-r-lg' : ''
                    ]">
                      {{ header.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in block3.rows" :key="index"
                    :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                    <td v-for="(header, hIndex) in block3.headers" :key="hIndex" :style="{ width: header.width }"
                      class="px-1 py-0.5 text-xs">
                      {{ row[header.value] || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <div v-for="(section, index) in block4" :key="index" class="flex flex-1 items-center gap-4 h-0">
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
              :class="i === 1 ? '' : 'border-t'" :style="{ color: section.items[i - 1]?.contentColor || '' }">
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
import PieChartComponent from '@/shared/components/PieChart.vue';
import GradientDropdown from '../../../shared/components/GradientDropdown.vue';

export default {
  name: 'BiAccess2',
  components: {
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    GradientDropdown
  },
  data() {
    return {
      unitOptions: [
        { value: 1, name: '單位:小時' },
        { value: 2, name: '單位:天' },
        { value: 3, name: '單位:週' },
      ],
      block1: {
        xLabel: '區域',
        yLabel: '異常次數',
        unit: 1,
        dataSet: [
          {
            label: '一樓大門',
            colors: ['#41bbea'],
            data: [
              { key: '地下室', value: 89 },
              { key: '一樓', value: 7 },
              { key: '二樓', value: 73 },
              { key: '三樓', value: 342 },
              { key: '頂樓', value: 9 },
              { key: '停車場', value: 290 },
              { key: '貨運站', value: 400 },
            ]
          },
        ]
      },
      block2: {
        dataSet: [
          {
            label: '故障',
            colors: ['#1856ff'],
            data: { value: 4 },
            unitText: '%'
          },
          {
            label: '正常',
            colors: ['#5cbeff'],
            data: { value: 96 },
            unitText: '%'
          },
        ]
      },
      block3: {
        xLabel: '區域',
        yLabel: '進出頻率統計',
        unit: 1,
        dataSet: [
          {
            label: 'Bar 1',
            colors: ['#01af98'],
            data: [
              { key: '地下室', value: 2 },
              { key: '一樓', value: 0 },
              { key: '二樓', value: 0 },
              { key: '三樓', value: 0 },
              { key: '頂樓', value: 0 },
            ]
          },
          {
            label: 'Bar 2',
            colors: ['#c3d990'],
            data: [
              { key: '地下室', value: 0 },
              { key: '一樓', value: 5 },
              { key: '二樓', value: 0 },
              { key: '三樓', value: 0 },
              { key: '頂樓', value: 0 },
            ]
          },
          {
            label: 'Bar 3',
            colors: ['#01af98'],
            data: [
              { key: '地下室', value: 0 },
              { key: '一樓', value: 0 },
              { key: '二樓', value: 8 },
              { key: '三樓', value: 0 },
              { key: '頂樓', value: 0 },
            ]
          },
          {
            label: 'Bar 4',
            colors: ['#c3d990'],
            data: [
              { key: '地下室', value: 0 },
              { key: '一樓', value: 0 },
              { key: '二樓', value: 0 },
              { key: '三樓', value: 11 },
              { key: '頂樓', value: 0 },
            ]
          },
          {
            label: 'Bar 5',
            colors: ['#01af98'],
            data: [
              { key: '地下室', value: 0 },
              { key: '一樓', value: 0 },
              { key: '二樓', value: 0 },
              { key: '三樓', value: 0 },
              { key: '頂樓', value: 4 },
            ]
          },
        ],
        headers: [
          { label: "異常卡號", value: "cardNumber", width: "20%" },
          { label: "時間", value: "timestamp", width: "40%" },
          { label: "地點", value: "location", width: "15%" },
          { label: "刷卡機編號", value: "deviceId", width: "25%" }
        ],
        rows: [
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
          {
            cardNumber: "K0302",
            timestamp: "2025/07/03 14:54",
            location: "二樓東門",
            deviceId: "Z2020"
          },
        ],
      },
      block4: [
        {
          title: "電源中斷",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/電源中斷.png",
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
          title: "資料同步失敗",
          color: "#e45825",
          image: "/assets/img/bi/statistics/資料同步失敗橘.png",
          // color: "#6dba38",
          // image: "/assets/img/bi/statistics/資料同步失敗綠.png",
          headers: ["編號", "發生時間", "解除時間", "地點"],
          items: [
            {
              area: "二樓(南側)",
              startTime: "2025/07/03 14:54",
              endTime: "2025/07/03 14:54",
              person: "王小明",
              contentColor: "#e45825", // 文字顏色
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
          title: "火災連動",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/火災連動.png",
          headers: ["區域", "發生時間", "解除時間", "備註"],
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
          title: "防拆警報",
          color: "#6dba38",
          image: "/assets/img/bi/statistics/防拆警報.png",
          headers: ["編號", "發生時間", "解除時間", "地點"],
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
      ],
    };
  },
}
</script>
