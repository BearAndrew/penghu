<template>
  <div ref="container"
    class="relative overflow-hidden rounded-sm select-none bg-gradient-to-b from-[#313d5d] to-[#131f34]"
    @mousedown="startDrag" @wheel.prevent="onWheelZoom">
    <!-- 可拖曳 + 縮放的容器 -->
    <div ref="drag-content" class="absolute top-0 left-0 h-full" :class="imagesReady ? '' : 'invisible'
      " :style="contentStyle">
      <!-- 疊加所有圖片 -->
      <img v-for="(src, index) in imageSources" :key="index" :src="src" :class="[
        index === 0 ? '' : 'absolute top-0 left-0',
        'h-full object-contain pointer-events-none select-none',
      ]" draggable="false" @load="onImageLoad(index)" />

      <div id="points-layer">
        <div v-for="(point, index) in activePoints" :key="index"
          class="absolute flex items-center justify-center text-white text-[8px] font-bold"
          :style="{ top: point.y + '%', left: point.x + '%' }">
          <div
            class="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-red-500 z-10">
            {{ point.label }}
          </div>
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-red-300 animate-pulse-radiate">
          </div>
        </div>
      </div>
    </div>


    <!-- ui -->
    <div class="absolute bottom-4 right-4 flex gap-2 z-10">
      <!-- 警示等級 -->
      <div class="flex items-center justify-center gap-3 bg-white rounded-md px-4">
        <span class="text-xl text-[#7d7d7d] font-bold">警示等級</span>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-[#cb0077]"></div>
          <span>等級一</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-[#ce2b90]"></div>
          <span>等級二</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-[#d76bb4]"></div>
          <span>等級三</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-[#d582c3]"></div>
          <span>等級四</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="w-4 h-4 rounded-full bg-[#d8addc]"></div>
          <span>等級五</span>
        </div>
      </div>

      <!-- 控制按鈕 -->
      <div class="flex">
        <button @click="zoomOut" class="">
          <img src="/assets/img/map/ui/zoom-out.png" class="w-9 h-9 translate-x-4" />
        </button>

        <img src="/assets/img/map/ui/zoom-bg.png" class="w-12.5 h-9" />

        <button @click="zoomIn" class="">
          <img src="/assets/img/map/ui/zoom-in.png" class="w-9 h-9 -translate-x-4" />
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'MapComponent',
  props: {
    imageSources: {
      type: Array,
      required: true,
      default: () => []
    },
    dataPoints: {
      type: Array,
      required: false,
      default: () => []
    },
    activePointsIndex: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data() {
    return {
      imagesReady: false,
      scale: 1,
      minScale: 0.5,
      maxScale: 3,
      scaleStep: 0.1,
      translate: { x: 0, y: 0 },
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
      initialTranslate: { x: 0, y: 0 },
    }
  },
  watch: {
    imageSources: {
      handler() {
        this.imagesReady = false;
        this.imagesLoaded = 0;
      },
      immediate: true,
    }
  },
  computed: {
    contentStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`,
        transformOrigin: 'top left',
        transition: this.isDragging ? 'none' : 'transform 0.1s ease-out'
      }
    },
    activePoints() {
      return this.activePointsIndex
        .map(i => this.dataPoints[i])
        .filter(p => p);
    }
  },
  methods: {
    onImageLoad(index) {
      if (index === 0) {
        this.centerContent();
      }
    },
    zoomIn() {
      this.scale = Math.min(this.scale + this.scaleStep, this.maxScale)
    },
    zoomOut() {
      this.scale = Math.max(this.scale - this.scaleStep, this.minScale)
    },
    startDrag(e) {
      this.isDragging = true
      this.lastMousePos = { x: e.clientX, y: e.clientY }

      // 在 window 上綁定拖曳事件
      window.addEventListener('mousemove', this.onDrag)
      window.addEventListener('mouseup', this.endDrag)
    },
    onDrag(e) {
      if (!this.isDragging) return;

      const dx = (e.clientX - this.lastMousePos.x) / this.scale;
      const dy = (e.clientY - this.lastMousePos.y) / this.scale;

      const container = this.$refs.container;
      const dragContent = this.$refs['drag-content'];
      if (!container || !dragContent) return;

      let newX = this.translate.x + dx;
      let newY = this.translate.y + dy;

      this.translate.x = newX;
      this.translate.y = newY;

      this.lastMousePos = { x: e.clientX, y: e.clientY };
    },
    endDrag() {
      this.isDragging = false

      // 移除事件監聽
      window.removeEventListener('mousemove', this.onDrag)
      window.removeEventListener('mouseup', this.endDrag)
    },
    onWheelZoom(e) {
      const delta = -e.deltaY
      const direction = delta > 0 ? 1 : -1
      const newScale = this.scale + direction * this.scaleStep

      if (newScale < this.minScale || newScale > this.maxScale) return

      this.scale = newScale
    },
    centerContent() {
      const container = this.$refs.container;
      const dragContent = this.$refs['drag-content'];
      if (!container || !dragContent) return;

      const containerRect = container.getBoundingClientRect();
      const contentRect = dragContent.getBoundingClientRect();

      const containerWidth = containerRect.width;
      const containerHeight = containerRect.height;
      const contentWidth = contentRect.width / this.scale;
      const contentHeight = contentRect.height / this.scale;

      // 以 scale=1 置中時，translate y
      this.initialTranslate = {
        x: containerWidth / 2 - contentWidth / 2,
        y: containerHeight / 2 - contentHeight / 2
      };

      // 同時把 translate 初始設為 initialTranslate
      this.translate = { ...this.initialTranslate };

      console.log('containerWidth', containerWidth);
      console.log('contentWidth', contentWidth / this.scale);
      console.log('centerContent', this.translate);
      this.scale = 1;
      setTimeout(() => {
        this.imagesReady = true;
      }, 100);
    },
    activePointsIndexChange(newVal) {
      this.activePoints = newVal.map(i => this.dataPoints[i]).filter(p => p);
    }
  }
}
</script>

<style>
@keyframes pulse-radiate {
  0% {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(0.2);
    opacity: 0.9;
  }

  100% {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) scale(2);
    opacity: 0;
  }
}

.animate-pulse-radiate {
  animation: pulse-radiate 2s infinite;
}
</style>