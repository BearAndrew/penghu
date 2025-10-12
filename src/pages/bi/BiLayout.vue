<template>
  <div class="h-full relative flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0" :style="{
      backgroundImage: `url('/assets/img/common/gradient-dark.png')`,
      backgroundSize: '100% 100%',
    }"></div>

    <div class="flex flex-col mt-[var(--nav-height)] p-4 w-full h-[calc(100%-var(--nav-height))] z-10 gap-4">
      <!-- 照片區 -->
      <div class="flex items-center gap-2 p-2 w-full bg-black">
        <div class="relative" v-for="(item, index) in photoList" :key="index">
          <!-- 主圖片 -->
          <img :src="item.imageUrl" class="h-[100px] w-auto object-contain" />

          <!-- 左上標籤 -->
          <label class="absolute top-0 left-0 px-1 py-0.5 bg-black text-[#1ca22f] text-xs">{{ item.label }}</label>

          <!-- icon和數字 -->
          <div class="absolute bottom-1 left-1 flex items-center gap-2">
            <img src="/assets/img/common/icon-camera.png" class="h-3 w-auto object-contain" />
            <div class="rounded-full p-1 w-5 h-5 text-black text-xs flex items-center justify-center"
              :class="getCircleBgClass(item.color)">
              {{ item.count }}
            </div>
          </div>
        </div>
      </div>

      <!-- 動態按鈕導航區 -->
      <div v-if="currentMap && currentMap.contents.length > 1"
        class="flex items-center justify-center gap-2 w-fit h-fit">
        <router-link v-for="(value, index) in currentMap.contents" :key="value.subtitle"
          :to="getNewSubIdRoute(index + 1)" class="block px-4 py-1 rounded-md text-white cursor-pointer" :class="isActiveSubId(index + 1)
            ? 'bg-gradient-to-r from-[#9976fd] to-[#6f3eff]'
            : 'bg-gray-400'">
          {{ value.subtitle }}
        </router-link>
      </div>

      <!-- 子路由顯示區 -->
      <div class="flex-1 w-full bg-transparent h-full overflow-hidden">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BiPage',
  data() {
    return {
      config: [
        {
          path: 'statistics',
          contents: [
            { subtitle: '人流偵測' },
            { subtitle: '車流偵測' },
            { subtitle: '其他偵測' }
          ]
        },
        {
          path: 'access',
          contents: [
            { subtitle: '異常' },
            { subtitle: '警報顯示' }
          ]
        },
        {
          path: 'flight',
          contents: [
            { subtitle: '航班統計A' },
            { subtitle: '航班統計B' },
            { subtitle: '其他統計' }
          ]
        }
      ],
      photoList: [
        {
          imageUrl: '/assets/img/common/fake-img.png',
          color: 'yellow',
          count: 12,
          label: '二樓(南側)'
        },
        {
          imageUrl: '/assets/img/common/fake-img.png',
          color: 'blue',
          count: 8,
          label: '二樓(南側)'
        },
        {
          imageUrl: '/assets/img/common/fake-img.png',
          color: 'green',
          count: 20,
          label: '二樓(南側)'
        },
      ],
    }
  },
  computed: {
    currentMap() {
      const routePath = this.$route.path.split('/')[2] || '';
      return this.config.find(item => item.path === routePath) || { contents: [] }
    }
  },
  methods: {
    getNewSubIdRoute(subId) {
      const [, base, category] = this.$route.path.split('/');
      return `/${base}/${category}/${subId}`;
    },
    isActiveSubId(subId) {
      return Number(this.$route.params.subId) === subId;
    },
    // 回傳背景顏色 class
    getCircleBgClass(color) {
      const colorMap = {
        yellow: 'bg-[#fcf55e]',
        blue: 'bg-[#8bd4fd]',
        green: 'bg-[#05ff8e]',
      }
      return colorMap[color] || 'bg-gray-500'
    },

  }
}
</script>
