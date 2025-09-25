<template>
  <div class="flex items-center justify-between gap-2 w-full bg-[#c7c7c7] rounded-md px-2 py-1" v-if="typeInfo">
    <div class="flex items-center">
      <!-- icon -->
      <div class="flex items-center gap-1 mr-1">
        <img :src="typeInfo.iconImg" class="w-6 h-6" />
        <div v-if="typeInfo.type === 'g'" class="flex items-center justify-center w-6 h-6 rounded-full text-white bg-red-500">G</div>
      </div>


      <!-- 內容 -->
      <span>{{ typeInfo.label }}</span>
      <span>({{ text }})</span>
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
    text: {
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
        { type: 'r', iconImg: '/assets/img/map/ui/icon-r.png', label: '門禁刷卡機' },
        { type: 'g', iconImg: '/assets/img/map/ui/icon-g.png', label: '門禁及差勤監視攝影機' },
        { type: 'a', iconImg: '/assets/img/map/ui/icon-a.png', label: '差勤刷卡機' },
        { type: 'vr', iconImg: '/assets/img/map/ui/icon-vr.png', label: '顯示型刷卡機' },
        { type: 'p', iconImg: '/assets/img/map/ui/icon-p.png', label: '門禁按鈕開關(含電磁鎖)' },
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
