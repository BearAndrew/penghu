<template>
  <div ref="container"
    class="relative w-full h-0 overflow-hidden rounded-sm select-none bg-gradient-to-b from-[#313d5d] to-[#131f34]"
    @mousedown="startDrag" @wheel.prevent="onWheelZoom">
    <!-- 可拖曳 + 縮放的容器 -->
    <div ref="drag-content" class="absolute top-0 left-0 h-full" :style="contentStyle">
      <!-- 疊加所有圖片 -->
      <img v-for="(src, index) in imageSources" :key="index" :src="src" :class="[
        index === 0 ? '' : 'absolute top-0 left-0',
        'h-full object-contain pointer-events-none select-none',
        imagesReady ? '' : 'invisible'
      ]" draggable="false" @load="onImageLoad(index)" />
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
  data() {
    return {
      // 所有圖片來源陣列（重疊）
      imageSources: [
        '/assets/img/map/頂樓/分區地圖-頂樓-bg.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-frame.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-icon.png',
        '/assets/img/map/頂樓/分區地圖-頂樓-point.png',
      ],
      // imageSources: [
      //   '/assets/img/map/二樓/南側/分區地圖-二樓(南側)-bg.png',
      //   '/assets/img/map/二樓/南側/分區地圖-二樓(南側)-frame.png',
      //   '/assets/img/map/二樓/南側/分區地圖-二樓(南側)-icon.png',
      //   '/assets/img/map/二樓/南側/分區地圖-二樓(南側)-point.png',
      // ],
      // imageSources: [
      //   '/assets/img/map/二樓/國際線北側/分區地圖-二樓(國際線北側)-bg.png',
      //   '/assets/img/map/二樓/國際線北側/分區地圖-二樓(國際線北側)-frame.png',
      //   '/assets/img/map/二樓/國際線北側/分區地圖-二樓(國際線北側)-icon.png',
      //   '/assets/img/map/二樓/國際線北側/分區地圖-二樓(國際線北側)-point.png',
      // ],
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
  computed: {
    contentStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`,
        transformOrigin: 'center center',
        transition: this.isDragging ? 'none' : 'transform 0.1s ease-out'
      }
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
      this.$nextTick(() => {
        this.scale = 1;
        const container = this.$refs.container;
        const dragContent = this.$refs['drag-content'];
        if (!container || !dragContent) return;

        const containerRect = container.getBoundingClientRect();
        const contentRect = dragContent.getBoundingClientRect();

        // content 原始大小（未縮放）
        const containerWidth = containerRect.width;
        const contentWidth = contentRect.width;

        // 以 scale=1 置中時，translate y
        this.initialTranslate = {
          x: containerWidth / 2 - contentWidth / 2,
          y: 0
        };

        // 同時把 translate 初始設為 initialTranslate
        this.translate = { ...this.initialTranslate };

        setTimeout(() => {
          this.imagesReady = true;
        }, 100);
      });
    }
  }
}
</script>
