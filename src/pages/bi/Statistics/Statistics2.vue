<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full">
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示臨停超時數量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">
          <div v-for="(item, index) in block1" :key="index" class="flex flex-col items-center gap-4">
            <!-- 數字 -->
            <div class="text-[40px] text-white font-bold leading-none">
              {{ item.count }}
            </div>

            <!-- 圖片 + 底部文字 -->
            <div class="relative h-[90px]">
              <img src="/assets/img/bi/statistics/車流紅.png" alt="traffic" class="h-full" />
              <div class="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-sm text-white whitespace-nowrap">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日各區域人流量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">航廈臨時停車區車輛臨停平勳分鐘數圖</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-around gap-4 h-0">
          <div v-for="(item, index) in block3" :key="index" class="flex flex-col gap-4 items-center">
            <div class="relative h-[120px]">
              <img src="/assets/img/bi/statistics/車流分鐘.png" alt="timer" class="h-full" />
              <div
                class="absolute top-[15%] left-[20%] -translate-x-1/2 text-[50px] font-bold text-white whitespace-nowrap">
                {{ item.count }}
              </div>
            </div>
            <div class="text-xl text-white">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">顯示當日車流量</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">航廈臨時停車區時段車輛數目圖</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">
          <div v-for="(item, index) in block5" :key="index" class="flex flex-col items-center gap-4">
            <!-- 數字 -->
            <div class="text-[40px] text-white font-bold leading-none">
              {{ item.count }}
            </div>

            <!-- 圖片 + 底部文字 -->
            <div class="relative h-[90px]">
              <img src="/assets/img/bi/statistics/車流白.png" alt="traffic" class="h-full" />
              <div class="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-sm text-white whitespace-nowrap">
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">停車場時段排隊等待數</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0"></div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'BiStatistics2',
  data() {
    return {
      block1: [
        { count: 7, label: "一樓大門" },
        { count: 5, label: "貨運站" },
        { count: 6, label: "1F停車場" },
        { count: 3, label: "B1出口" },
        { count: 4, label: "B1入口" },
      ],
      block3: [
        { count: 42, label: "1F停車場" },
        { count: 36, label: "B1停車場A區" },
        { count: 27, label: "B1停車場B區" },
      ],
      block5: [
        { count: 12, label: "一樓大門" },
        { count: 8, label: "貨運站" },
        { count: 11, label: "1F停車場" },
        { count: 8, label: "B1出口" },
        { count: 5, label: "B1入口" },
      ],
    };
  },
}
</script>
