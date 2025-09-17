<template>
  <div
    class="flex justify-between w-full h-0 pl-4 pr-8 py-4 relative rounded-sm bg-gradient-to-b from-[#313d5d] to-[#131f34]">

    <!-- 設備 -->
    <div class="flex justify-between gap-4 w-full max-w-[650px]">
      <div class="w-[300px]">
        <EquipmentComponent type="1" />
      </div>

      <div class="w-[300px]">
        <EquipmentComponent type="a" />
      </div>
    </div>


    <!-- 圖片 -->
    <div class="flex items-center justify-center gap-4 h-full">
      <img src="/assets/img/common/fake-img.png" class="h-full" />

      <div class="grid grid-cols-2 grid-rows-2 gap-x-4 gap-y-2 h-full">
        <div class="flex items-center justify-center overflow-hidden">
          <img src="/assets/img/common/fake-img.png" class="h-full w-auto object-contain" />
        </div>
        <div class="flex items-center justify-center overflow-hidden">
          <img src="/assets/img/common/fake-img.png" class="h-full w-auto object-contain" />
        </div>
        <div class="flex items-center justify-center overflow-hidden">
          <img src="/assets/img/common/fake-img.png" class="h-full w-auto object-contain" />
        </div>
        <div class="flex items-center justify-center overflow-hidden">
          <img src="/assets/img/common/fake-img.png" class="h-full w-auto object-contain" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import EquipmentComponent from './Equipment.vue';

export default {
  name: 'MapInfoComponent',
  components: {
    EquipmentComponent
  },
  data() {
    return {
    };
  },
}
</script>
