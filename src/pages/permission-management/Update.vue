<template>
  <div class="h-full relative flex items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0"
      :style="{ backgroundImage: `url(${require('@/assets/img/common/gradient-dark.png')})`, backgroundSize: '100% 100%' }">
    </div>

    <!-- 內容 -->
    <div class="flex items-center justify-center relative z-10 text-white pl-64 pt-[var(--nav-height)] w-full h-full">
      <div class="flex flex-col w-4/5 h-fit px-12 py-8 border border-white rounded-[40px] bg-no-repeat relative"
        :style="{ backgroundImage: `url(${require('@/assets/img/common/gradient-dark.png')})`, backgroundSize: '100% 100%' }">

        <button class="absolute top-6 right-8">
          <img src="@/assets/img/common/close.png" alt="close" />
        </button>

        <h1 class="text-[36px] font-bold mt-4">修改</h1>

        <GradientDropdown class="w-1/4 self-end text-[20px]" v-model="id" :options="idOptions" placeholder="請選擇 ID" />

        <div class="flex-shrink-0 my-8 h-[1px] w-full bg-white"></div>


        <form class="flex-1 grid grid-cols-2 gap-x-12 gap-y-6 text-[20px] mb-8">
          <!-- 人員 ID -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">人員 ID</label>
            <GradientInput v-model="form.staffId" placeholder="" />
          </div>

          <!-- 電話 -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">電話</label>
            <GradientInput v-model="form.phone" placeholder="" />
          </div>

          <!-- 郵件 -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">郵件</label>
            <GradientInput v-model="form.email" placeholder="" />
          </div>

          <!-- 狀態 -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">狀態</label>
            <GradientDropdown v-model="form.status" :options="statusOptions" placeholder="請選擇狀態" />
          </div>

          <!-- 性別 -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">性別</label>
            <GradientInput v-model="form.gender" placeholder="" />
          </div>

          <!-- 部門名稱 -->
          <div>
            <label class="block text-white font-medium mb-1 ml-1">部門名稱</label>
            <GradientDropdown v-model="form.department" :options="departments" placeholder="請選擇部門" />
          </div>
        </form>

        <button class="mx-auto w-64 py-1 bg-green-700 rounded-full text-[32px]">儲存</button>

      </div>
    </div>
  </div>
</template>

<script>
import GradientDropdown from '../../shared/components/GradientDropdown.vue';
import GradientInput from '../../shared/components/GradientInput.vue';

export default {
  name: 'UpdatePage',
  components: {
    GradientDropdown,
    GradientInput
  },
  data() {
    return {
      id: '',
      idOptions: [
        { id: 1, name: 'ID 1' },
        { id: 2, name: 'ID 2' },
        { id: 3, name: 'ID 3' },
      ],
      form: {
        staffId: '',
        phone: '',
        email: '',
        status: '',
        gender: '',
        department: '',
      },
      statusOptions: [
        { id: 1, name: '啟用' },
        { id: 2, name: '停用' },
      ],
      departments: [
        { id: 1, name: '管理部' },
        { id: 2, name: '行政部' },
        { id: 3, name: '財務部' },
      ],
    };
  },
}
</script>
