<template>
  <div class="h-full relative flex items-center justify-center gap-4">

    <div class="flex flex-col flex-1 items-center justify-center gap-4 w-0 h-full">

      <div class="flex-1 w-full h-0 px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">人流</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
      </div>

      <div class="flex flex-1 items-center justify-center gap-4 h-0 w-full">
        <div class="flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">人臉辨識</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>
        </div>
      </div>

    </div>


    <div class="flex flex-col flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
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
                <th class="px-4 py-1 bg-[#703eff]">航班編號</th>
                <th class="px-4 py-1 bg-[#703eff]">航空公司</th>
                <th class="px-4 py-1 bg-[#703eff]">航班路線</th>
                <th class="px-4 py-1 bg-[#703eff]">目前狀態</th>
                <th class="px-4 py-1 bg-[#703eff]">狀態進度</th>
                <th class="px-4 py-1 bg-[#703eff]">最後更新時間</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in block3" :key="index"
                :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                <td class="px-4 py-1">{{ item.flightNo }}</td>
                <td class="px-4 py-1">{{ item.airline }}</td>
                <td class="px-4 py-1">
                  {{ item.route.join(' → ') }}
                </td>
                <td class="px-4 py-1">
                  <span class="px-1 py-0.5 rounded-sm font-medium" :style="{
                    backgroundColor: item.status.color || 'transparent',
                  }">
                    {{ item.status.text }}
                  </span>
                </td>
                <td class="px-4 py-1">
                  <div class="flex justify-center items-center gap-1 flex-wrap">
                    <template v-for="(step, i) in item.progress" :key="i">
                      <span class="px-1 rounded-sm font-medium" :style="{
                        backgroundColor: step.color || 'transparent',
                      }">
                        {{ step.text }}
                      </span>
                      <span v-if="i !== item.progress.length - 1" class="text-gray-300">→</span>
                    </template>
                  </div>
                </td>
                <td class="px-4 py-1">{{ item.updatedAt }}</td>
              </tr>
            </tbody>
          </table>


        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'BiFlight3',
  data() {
    return {
      block3: [
        {
          flightNo: 'KE-109',
          airline: '中華航空',
          route: ['TPE', 'KIX'],
          status: { color: '', text: '抵達' },
          progress: [
            { text: '登機', color: '' },
            { text: '出發', color: '' },
            { text: '起飛', color: '' },
            { text: '到達', color: '#6dba38' }
          ],
          updatedAt: '14:35'
        },
        {
          flightNo: 'KE-109',
          airline: '中華航空',
          route: ['TPE', 'KIX'],
          status: { color: '#fea93f', text: '延遲' },
          progress: [
            { text: '登機', color: '' },
            { text: '出發', color: '' },
            { text: '起飛', color: '#fea93f' },
            { text: '到達', color: '' }
          ],
          updatedAt: '14:35'
        },
      ],
    }
  }
}
</script>
