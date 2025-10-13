<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">到站航班狀況</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4">
          <div class="w-full h-full">
            <PieChartComponent :dataSet="block1.dataSet">
            </PieChartComponent>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">到站每小時航班架次統計</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <LineChartComponent :dataSet="block2.dataSet" :stepCount="5" :tickInterval="5"></LineChartComponent>
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
          <h3 class="text-xl text-white font-bold">離站每小時航班架次統計</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4 relative">
          <div class="pl-4 pb-4 w-full h-full">
            <LineChartComponent :dataSet="block3.dataSet" :stepCount="5" :tickInterval="5"></LineChartComponent>
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
          <h3 class="text-xl text-white font-bold">離站航班狀況</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0 mt-4">
          <div class="w-full h-full">
            <PieChartComponent :dataSet="block4.dataSet">
            </PieChartComponent>
          </div>
        </div>
      </div>
      <div class="col-span-2 flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示航班進離港狀態</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>

        <div class="flex flex-1 justify-between gap-4 h-0 mt-4">
          <!-- 進港表格 -->
          <div class="w-full h-full overflow-y-auto hover:overflow-y-scroll scrollbar-hide">
            <table class="min-w-full text-white table-fixed border-separate border-spacing-0">
              <thead class="sticky top-0 z-10 bg-[#703eff]">
                <tr>
                  <th class="px-4 py-1 text-center">進港</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in block5.arrivals" :key="'arrival-' + index"
                  :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                  <td class="p-0">
                    <div class="grid grid-cols-3 text-center">
                      <div class="py-1">{{ item.flight }}</div>
                      <div class="py-1">{{ item.city }}</div>
                      <div class="py-1">{{ item.time }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 離港表格 -->
          <div class="w-full h-full overflow-y-auto hover:overflow-y-scroll scrollbar-hide">
            <table class="min-w-full text-white table-fixed border-separate border-spacing-0">
              <thead class="sticky top-0 z-10 bg-[#2096fa]">
                <tr>
                  <th class="px-4 py-1 text-center">離港</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in block5.departures" :key="'departure-' + index"
                  :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                  <td class="p-0">
                    <div class="grid grid-cols-3 text-center">
                      <div class="py-1">{{ item.flight }}</div>
                      <div class="py-1">{{ item.city }}</div>
                      <div class="py-1">{{ item.time }}</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
import LineChartComponent from '@/shared/components/LineChart.vue';
import PieChartComponent from '@/shared/components/PieChart.vue';

export default {
  name: 'BiFlight1',
  components: {
    LineChartComponent,
    PieChartComponent
  },
  data() {
    return {
      block1: {
        dataSet: [
          {
            label: '延誤',
            colors: ['#d9b3ff'],
            data: { value: 9 },
          },
          {
            label: '取消',
            colors: ['#c145ff'],
            data: { value: 12 },
          },
          {
            label: '正常',
            colors: ['#a799e6'],
            data: { value: 40 },
          },
        ]
      },
      block2: {
        xLabel: '時',
        yLabel: '架次',
        dataSet: [
          {
            label: 'Line 1',
            colors: ['#c531f9'],
            data: [
              { key: '1', value: 5 },
              { key: '2', value: 14 },
              { key: '3', value: 0 },
              { key: '4', value: 19 },
              { key: '5', value: 7 },
              { key: '6', value: 3 },
              { key: '7', value: 18 },
              { key: '8', value: 9 },
              { key: '9', value: 12 },
              { key: '10', value: 1 },
              { key: '11', value: 6 },
              { key: '12', value: 17 },
              { key: '13', value: 10 },
              { key: '14', value: 0 },
              { key: '15', value: 4 },
              { key: '16', value: 20 },
              { key: '17', value: 2 },
              { key: '18', value: 15 },
              { key: '19', value: 11 },
              { key: '20', value: 8 },
              { key: '21', value: 13 },
              { key: '22', value: 16 },
              { key: '23', value: 20 },
              { key: '24', value: 7 }
            ]
          },
        ]
      },
      block3: {
        xLabel: '時',
        yLabel: '架次',
        dataSet: [
          {
            label: 'Line 1',
            colors: ['#07b7f3'],
            data: [
              { key: '1', value: 5 },
              { key: '2', value: 14 },
              { key: '3', value: 0 },
              { key: '4', value: 19 },
              { key: '5', value: 7 },
              { key: '6', value: 3 },
              { key: '7', value: 18 },
              { key: '8', value: 9 },
              { key: '9', value: 12 },
              { key: '10', value: 1 },
              { key: '11', value: 6 },
              { key: '12', value: 17 },
              { key: '13', value: 10 },
              { key: '14', value: 0 },
              { key: '15', value: 4 },
              { key: '16', value: 20 },
              { key: '17', value: 2 },
              { key: '18', value: 15 },
              { key: '19', value: 11 },
              { key: '20', value: 8 },
              { key: '21', value: 13 },
              { key: '22', value: 16 },
              { key: '23', value: 20 },
              { key: '24', value: 7 }
            ]
          }
        ]
      },
      block4: {
        dataSet: [
          {
            label: '延誤',
            colors: ['#97e1fe'],
            data: { value: 9 },
          },
          {
            label: '取消',
            colors: ['#1856ff'],
            data: { value: 12 },
          },
          {
            label: '正常',
            colors: ['#5cbeff'],
            data: { value: 40 },
          },
        ]
      },
      block5: {
        arrivals: [
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
        ],
        departures: [
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-111", city: "桃園", time: "16:00" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
          { flight: "KE-109", city: "台北", time: "14:05" },
          { flight: "KE-110", city: "高雄", time: "15:20" },
        ],
      }
    }
  }

}
</script>
