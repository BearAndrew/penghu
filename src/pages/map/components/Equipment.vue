<template>
  <div class="flex items-center justify-between gap-2 w-full bg-[#c7c7c7] rounded-md px-2 py-1" v-if="typeInfo">
    <div class="flex items-center gap-2">
      <!-- icon -->
      <img :src="typeInfo.iconImg" class="w-6 h-6" />

      <!-- 內容 -->
      <span>{{ typeInfo.label }}</span>
      <span>({{ detail }})</span>
    </div>

    <img src="/assets/img/map/ui/hamburger.png" class="h-6" />
  </div>
</template>

<script>
export default {
  name: 'EquipmentComponent',
  props: {
    type: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      equipmentTypes: [
        { type: '1', iconImg: '/assets/img/map/ui/icon-1.png', label: 'AI槍型攝影機' },
        { type: '2', iconImg: '/assets/img/map/ui/icon-2.png', label: '快速球攝影機' },
        { type: '3', iconImg: '/assets/img/map/ui/icon-3.png', label: '半球型攝影機' },
        { type: '4', iconImg: '/assets/img/map/ui/icon-4.png', label: '魚眼式攝影機' },
        { type: 'a', iconImg: '/assets/img/map/ui/icon-a.png', label: '門禁刷卡機' },
        { type: 'b', iconImg: '/assets/img/map/ui/icon-b.png', label: '門禁及差勤監視攝影機' },
        { type: 'c', iconImg: '/assets/img/map/ui/icon-c.png', label: '差勤刷卡機' },
        { type: 'd', iconImg: '/assets/img/map/ui/icon-d.png', label: '顯示型刷卡機' },
        { type: 'e', iconImg: '/assets/img/map/ui/icon-e.png', label: '門禁按鈕開關(含電磁鎖)' },
      ],
    };
  },
  computed: {
    typeInfo() {
      return this.equipmentTypes.find((item) => item.type === this.type);
    },
  },
};
</script>
