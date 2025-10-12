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

        <div class="flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">遺留/遺失物</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>
        </div>

        <div class="flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
          <div class="flex items-center gap-4 w-full relative">
            <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
            <h3 class="text-xl text-white font-bold">人員偵測</h3>
            <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
          </div>
        </div>

      </div>

    </div>


    <div class="flex flex-row-reverse flex-1 w-0 h-full px-4 py-3 rounded-xl bg-[#2d3a5a] overflow-hidden">
      <div class="flex justify-end mb-4 w-8 relative">
        <img src="/assets/img/common/icon-close.png" alt="close" class="h-5" />
      </div>


      <div class="flex flex-1 flex-col justify-between gap-2 h-full">
        <div v-for="(section, index) in sections" :key="index" class="flex flex-1 items-center gap-4 h-0">
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

export default {
  name: 'BiStatistics1',
  data() {
    return {
      sections: [
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
      ],
    };
  },
}
</script>
