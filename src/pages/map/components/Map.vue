<template>
  <div ref="container"
    class="relative w-full h-0 overflow-hidden rounded-lg select-none bg-gradient-to-b from-[#313d5d] to-[#131f34]"
    @mousedown="startDrag" @wheel.prevent="onWheelZoom">
    <!-- 可拖曳 + 縮放的容器 -->
    <div ref="drag-content" class="absolute top-0 left-0" :style="contentStyle">
      <!-- 疊加所有圖片 -->
      <img v-for="(src, index) in imageSources" :key="index" :src="src" :class="[
        index === 0 ? '' : 'absolute top-0 left-0',
        'w-full pointer-events-none select-none'
      ]" draggable="false" />
    </div>

    <!-- 控制按鈕 -->
    <div class="absolute bottom-4 right-4 flex z-10">
      <button @click="zoomOut" class="">
        <img src="/assets/img/map/ui/zoom-out.png" class="w-8 h-8 translate-x-4" />
      </button>

      <img src="/assets/img/map/ui/zoom-bg.png" class="w-14 h-8" />

      <button @click="zoomIn" class="">
        <img src="/assets/img/map/ui/zoom-in.png" class="w-8 h-8 -translate-x-4" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapComponent',
  data() {
    return {
      // 所有圖片來源陣列（重疊）
      imageSources: [
        '/assets/img/map/頂樓/分區地圖-頂樓-bg.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-frame.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-icon.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-point.png',
      ],
      scale: 1,
      minScale: 1,
      maxScale: 3,
      scaleStep: 0.1,
      translate: { x: 0, y: 0 },
      isDragging: false,
      lastMousePos: { x: 0, y: 0 },
      initialTranslate: { x: 0, y: 0 },
    }
  },
  computed: {
    contentStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`,
        transformOrigin: 'center center',
        transition: this.isDragging ? 'none' : 'transform 0.1s ease-out'
      }
    }
  },
  mounted() {
    this.centerContent()
  },
  methods: {
    zoomIn() {
      this.scale = Math.min(this.scale + this.scaleStep, this.maxScale)
    },
    zoomOut() {
      this.scale = Math.max(this.scale - this.scaleStep, this.minScale)
    },
    resetView() {
      this.scale = 1
      this.translate = { x: 0, y: 0 }
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

      const containerRect = container.getBoundingClientRect();
      const contentRect = dragContent.getBoundingClientRect();

      // content 原始大小（未放大前）
      const contentWidth = contentRect.width / this.scale;
      const contentHeight = contentRect.height / this.scale;

      // 拖曳限制範圍(實際放大後 - container 尺寸) / 4，最小為0
      const maxOffsetX = Math.max(0, (contentWidth * this.scale - containerRect.width / 2)) / 2;
      const maxOffsetY = Math.max(0, (contentHeight * this.scale - containerRect.height)) / 4;

      let newX = this.translate.x + dx;
      let newY = this.translate.y + dy;

      // 以 initialTranslate 中心，加減 maxOffset 限制拖曳範圍
      const minX = this.initialTranslate.x - maxOffsetX;
      const maxX = this.initialTranslate.x + maxOffsetX;
      const minY = this.initialTranslate.y - maxOffsetY;
      const maxY = this.initialTranslate.y + maxOffsetY;

      newX = Math.min(maxX, Math.max(minX, newX));
      newY = Math.min(maxY, Math.max(minY, newY));

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
      this.$nextTick(() => {
        this.scale = 1;
        const container = this.$refs.container;
        const dragContent = this.$refs['drag-content'];
        if (!container || !dragContent) return;

        const containerRect = container.getBoundingClientRect();
        const contentRect = dragContent.getBoundingClientRect();

        // content 原始大小（未縮放）
        const contentHeight = contentRect.height;

        // 以 scale=1 置中時，translate y
        this.initialTranslate = {
          x: 0,
          y: (contentHeight - containerRect.height) / 4
        };

        // 同時把 translate 初始設為 initialTranslate
        this.translate = { ...this.initialTranslate };
      });
    }
  }
}
</script>
