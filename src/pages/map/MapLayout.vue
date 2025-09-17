<template>
  <div class="h-full relative flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0"
      :style="{ backgroundImage: `url('/assets/img/common/gradient-dark.png')`, backgroundSize: '100% 100%' }">
    </div>

    <div class="flex flex-col items-center justify-center mt-[var(--nav-height)] p-4 w-full h-[calc(100%-var(--nav-height))] z-10 gap-4">

      <MapComponent class="flex-grow-[2]" />
      <MapInfoComponent class="flex-grow" />

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
      mapDataList: []
    };
  },
  created() {
    this.mapDataList = MapDataService.getAllMaps();
    console.log('Map data list:', JSON.stringify(this.mapDataList));
    // console.log('Map data list:', this.mapDataList);
  }
}
</script>
