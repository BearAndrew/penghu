<template>
  <div class="flex flex-col items-center relative w-[400px] p-2 rounded-lg text-white shadow-lg bg-[#7f0049] opacity-90"
    role="alert">
    <button @click="close"
      class="absolute flex items-center justify-center top-2 left-2 h-5 w-5 text-white bg-[#b26692] rounded-full">
      <span class="-translate-y-[1px]">&times;</span>
    </button>

    <div class="flex items-center gap-2 mb-2">
      <img :src="equipmentTypes.find(item => item.type === type).iconImg" class="h-12" />
      <h2 class="text-[32px] font-bold tracking-[12px]">{{ title }}</h2>
    </div>

    <div class="flex items-center gap-2 p-2 w-full bg-white text-[24px] text-black">
      <div class="flex-shrink-0 w-6 h-6 rounded-full" :style="{ backgroundColor: levelColors[level - 1] }"></div>
      <div class="font-bold whitespace-nowrap">等級{{ levelToChinese[level] }}</div>
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToastItem",
  props: {
    id: Number,
    type: { type: String, default: "1" },
    level: { type: Number, default: 1 },
    title: { type: String, default: "異常警示" },
    message: { type: String, required: true },
    duration: { type: Number, default: 3000 }
  },
  emits: ["close"],
  data() {
    return {
      levelColors: ['#cb0077', '#ce2b90', '#d76bb4', '#d582c3', '#d8addc'],
      levelToChinese: {
        1: '一', 2: '二', 3: '三', 4: '四', 5: '五'
      },
      equipmentTypes: [
        { type: '1', iconImg: '/assets/img/map/ui/警告-icon-1.png', label: 'AI槍型攝影機' },
        { type: '2', iconImg: '/assets/img/map/ui/警告-icon-2.png', label: '快速球攝影機' },
        { type: '3', iconImg: '/assets/img/map/ui/警告-icon-3.png', label: '半球型攝影機' },
        { type: '4', iconImg: '/assets/img/map/ui/警告-icon-4.png', label: '魚眼式攝影機' },
        { type: 'r', iconImg: '/assets/img/map/ui/警告-icon-r.png', label: '門禁刷卡機' },
        { type: 'g', iconImg: '/assets/img/map/ui/警告-icon-g.png', label: '門禁及差勤監視攝影機' },
        { type: 'a', iconImg: '/assets/img/map/ui/警告-icon-a.png', label: '差勤刷卡機' },
        { type: 'vr', iconImg: '/assets/img/map/ui/警告-icon-vr.png', label: '顯示型刷卡機' },
        { type: 'p', iconImg: '/assets/img/map/ui/警告-icon-p.png', label: '門禁按鈕開關(含電磁鎖)' },
      ],
    };
  },
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => this.$emit("close", this.id), this.duration);
    }
  },
  methods: {
    close() {
      this.$emit("close", this.id);
    }
  }
};
</script>
