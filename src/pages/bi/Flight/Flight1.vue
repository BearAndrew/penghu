<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">到站航班狀況</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">到站每小時航班架次統計</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">離站每小時航班架次統計</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">離站航班狀況</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
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
                  <th class="px-4 py-2 text-center">進港</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in block5.arrivals" :key="'arrival-' + index"
                  :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                  <td class="p-0">
                    <div class="grid grid-cols-3 text-center">
                      <div class="py-2">{{ item.flight }}</div>
                      <div class="py-2">{{ item.city }}</div>
                      <div class="py-2">{{ item.time }}</div>
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
                  <th class="px-4 py-2 text-center">離港</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in block5.departures" :key="'departure-' + index"
                  :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
                  <td class="p-0">
                    <div class="grid grid-cols-3 text-center">
                      <div class="py-2">{{ item.flight }}</div>
                      <div class="py-2">{{ item.city }}</div>
                      <div class="py-2">{{ item.time }}</div>
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

export default {
  name: 'BiFlight1',
  data() {
    return {
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
