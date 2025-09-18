<template>
  <div class="flex justify-between px-4 py-4 relative rounded-sm bg-gradient-to-b from-[#313d5d] to-[#131f34]"
    :class="layout == 'v' ? 'pr-8' : 'flex-col'">

    <!-- 設備 -->
    <div class="flex gap-4 w-full max-w-[650px]" :class="layout == 'v' ? 'justify-between' : 'flex-col'">
      <div class="flex flex-col gap-2" :class="layout == 'v' ? 'w-[300px]' : 'w-full'">
        <EquipmentComponent v-for="value in infoLeft" :key="value.id" :type="value.type" :text="value.text" />
      </div>

      <div class="flex flex-col gap-2" :class="layout == 'v' ? 'w-[300px]' : 'w-full'">
        <EquipmentComponent v-for="value in infoRight" :key="value.id" :type="value.type" :text="value.text" />
      </div>
    </div>


    <!-- 圖片 -->
    <div class="flex items-center justify-center gap-4" :class="layout == 'v' ? 'h-full' : 'flex-col'">
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
  props: {
    layout: {
      type: String,
      required: true,
    },
    info: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
    };
  },
  computed: {
    infoLeft() {
      return this.info.filter((item) => !isNaN(Number(item.type)));
    },
    infoRight() {
      return this.info.filter((item) => isNaN(Number(item.type)));
    }
  }
}
</script>
