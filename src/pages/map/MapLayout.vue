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
          :data-points="currentContent.dataPoints" :active-points-index="activePointsIndex" />

        <div v-if="currentMap.contents.length > 1"
          class="absolute top-4 left-4 flex items-center justify-center gap-2 w-fit h-fit">
          <router-link v-for="(value, index) in currentMap.contents" :key="value.subtitle"
            :to="getNewSubIdRoute(index + 1)" class="block px-4 py-1 rounded-md text-white cursor-pointer" :class="isActiveSubId(index + 1)
              ? 'bg-gradient-to-r from-[#9976fd] to-[#6f3eff]'
              : 'bg-gray-400'">
            {{ value.subtitle }}
          </router-link>
        </div>
      </div>
      <MapInfoComponent :class="currentMap?.layout == 'flex-col' ? 'flex-grow w-full h-0' : 'w-[400px] h-full'"
        :layout="currentMap?.layout == 'flex-col' ? 'v' : 'h'" :info="currentContent.info" />

    </div>

  </div>
</template>

<script>
import MapComponent from './components/Map.vue';
import MapInfoComponent from './components/Info.vue';
import MapDataService from '@/shared/services/MapDataService';

export default {
  name: 'MapPage',
  components: {
    MapComponent,
    MapInfoComponent
  },
  data() {
    return {
      mapDataList: [],
      activePointsIndex: [] // 呼叫API動態更新這個數值，標出地圖上發生警戒的位置
    };
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
    // console.log('Map data list:', JSON.stringify(this.mapDataList));
    this.updateActivePointsIndex();
  },
  methods: {
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
    }
  }
}
</script>
