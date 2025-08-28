<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0"
      :style="{ backgroundImage: `url(/assets/img/common/gradient-dark.png)`, backgroundSize: '100% 100%' }">
    </div>

    <div class="flex flex-col items-center gap-2 p-8 w-full relative">
      <!-- 查詢列 -->
      <div class="flex flex-col items-center gap-2 px-4 py-2 w-full bg-[#344061]">
        <!-- 上排 -->
        <div class="flex items-center gap-4">
          <div>

          </div>
        </div>

        <!-- 下排 -->
        <div>

        </div>
      </div>

      <!-- 表格 -->
      <div></div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportPage'
};
</script>
