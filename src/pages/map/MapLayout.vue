<template>
  <div class="h-full relative flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0"
      :style="{ backgroundImage: `url('/assets/img/common/gradient-dark.png')`, backgroundSize: '100% 100%' }">
    </div>

    <div
      class="flex items-center justify-center mt-[var(--nav-height)] p-4 w-full h-[calc(100%-var(--nav-height))] z-10 gap-4"
      :class="currentMap?.layout">

      <div class="flex relative"
        :class="currentMap?.layout == 'flex-col' ? 'flex-grow-[2] w-full h-0' : 'flex-grow w-0 h-full'">
        <MapComponent class="w-full h-full" :image-sources="currentContent.imageSources"
          :data-points="currentContent.dataPoints" :active-points-index="activePointsIndex"
          :is-overall="routeId === 1" />

        <div v-if="currentMap.contents.length > 1"
          class="absolute top-4 left-4 flex items-center justify-center gap-2 w-fit h-fit">
          <router-link v-for="(value, index) in currentMap.contents" :key="value.subtitle"
            :to="getNewSubIdRoute(index + 1)" class="block px-4 py-1 rounded-md text-white cursor-pointer" :class="isActiveSubId(index + 1)
              ? 'bg-gradient-to-r from-[#9976fd] to-[#6f3eff]'
              : 'bg-gray-400'">
            {{ value.subtitle }}
          </router-link>
        </div>

        <div
          class="absolute bottom-4 left-4 flex items-center justify-center gap-20 w-fit h-fit bg-gradient-to-r from-[#9976fd] to-[#6f3eff] pl-4 pr-2 py-1 rounded-md text-white cursor-pointer">
          <span>故障列表</span>
          <img src="/assets/img/map/ui/hamburger.png" class="h-6" />
        </div>
      </div>
      <MapInfoComponent :class="currentMap?.layout == 'flex-col' ? 'flex-grow w-full h-0' : 'w-[400px] h-full'"
        :layout="currentMap?.layout == 'flex-col' ? 'v' : 'h'" :info="currentContent.info" />

    </div>


    <ToastContainer ref="toastRef" />
  </div>
</template>

<script>
import MapComponent from './components/Map.vue';
import MapInfoComponent from './components/Info.vue';
import MapDataService from '@/shared/services/MapDataService';
import ToastContainer from './components/ToastContainer.vue';

export default {
  name: 'MapPage',
  components: {
    MapComponent,
    MapInfoComponent,
    ToastContainer
  },
  data() {
    return {
      mapDataList: [],
      activePointsIndex: [], // 呼叫API動態更新這個數值，標出地圖上發生警戒的位置
      isOverall: false,
      toast: {
        level: 1,
        visible: false,
        message: '',
        duration: 3000000
      }
    };
  },
  watch: {
    '$route.params': {
      handler() {
        this.updateActivePointsIndex();
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    routeId() {
      return parseInt(this.$route.params.id) || 1;
    },
    routeSubId() {
      return parseInt(this.$route.params.subId) || 1;
    },
    currentMap() {
      return this.mapDataList[this.routeId - 1] || null;
    },
    currentContent() {
      if (!this.currentMap || !Array.isArray(this.currentMap.contents)) return null;
      return this.currentMap.contents[this.routeSubId - 1] || null;
    }
  },
  created() {
    this.mapDataList = MapDataService.getAllMaps();

    // =========== 測試用，之後改成呼叫API ===========
    this.updateActivePointsIndex();
    // ============================================
  },
  mounted() {
    // 加入錯誤訊息測試
    this.addToast(2, '二樓(南側)');
    setTimeout(() => {
      this.addToast(1, '一樓(南側)');
    }, 1000);
  },
  methods: {
    // 更新 activePointsIndex
    updateActivePointsIndex() {
      const points = this.currentContent?.dataPoints || [];
      this.activePointsIndex = points.map((_, index) => index);
    },
    isActiveSubId(index) {
      return this.routeSubId === index;
    },
    getNewSubIdRoute(newSubId) {
      const { id } = this.$route.params;
      return `/map/${id}/${newSubId}`;
    },
    // 加入錯誤訊息，message: 訊息內容, type: icon類型, level: 等級1~5, duration: 顯示時間(毫秒)
    addToast(level, message) {
      this.$refs.toastRef.show({
        message: message,
        type: '1',
        level: level,
        duration: 3000
      });
    }
  }
}
</script>
