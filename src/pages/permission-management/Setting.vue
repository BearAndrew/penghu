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

        <h1 class="text-[36px] font-bold mt-4">設定</h1>

        <GradientDropdown class="w-1/4 self-end text-[20px]" v-model="id" :options="idOptions" placeholder="請選擇 ID" />

        <div class="flex-shrink-0 my-8 h-[1px] w-full bg-white"></div>


        <form class="mb-5">
          <table class="w-full text-[24px] table-fixed">
            <thead>
              <tr class="*:w-[16.6%] *:pb-3">
                <th class="text-left"></th>
                <th class="text-center">有</th>
                <th class="text-center">沒有</th>
                <th class="text-center">可刪除</th>
                <th class="text-center">不可刪除</th>
                <th class="text-center">可修改</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in formData" :key="rowIndex">
                <td class="py-3 text-left">{{ row.label }}</td>
                <td class="text-center">
                  <CheckBox v-model="row.has" />
                </td>
                <td class="text-center">
                  <CheckBox v-model="row.not" />
                </td>
                <td class="text-center">
                  <CheckBox v-model="row.deletable" />
                </td>
                <td class="text-center">
                  <CheckBox v-model="row.nonDeletable" />
                </td>
                <td class="text-center">
                  <CheckBox v-model="row.editable" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>


        <button class="mx-auto w-64 py-1 bg-green-700 rounded-full text-[32px]">儲存</button>

      </div>
    </div>
  </div>
</template>

<script>
import GradientDropdown from './components/GradientDropdown.vue';
import CheckBox from './components/CheckBox.vue';

export default {
  name: 'SettingPage',
  components: {
    GradientDropdown,
    CheckBox
  },
  data() {
    return {
      id: '',
      idOptions: [
        { id: 1, name: 'ID 1' },
        { id: 2, name: 'ID 2' },
        { id: 3, name: 'ID 3' },
      ],
      formData: [
        {
          label: '管理員',
          has: false,
          not: false,
          deletable: false,
          nonDeletable: false,
          editable: false
        },
        {
          label: '操作人員',
          has: false,
          not: false,
          deletable: false,
          nonDeletable: false,
          editable: false
        },
        {
          label: '操作人員',
          has: false,
          not: false,
          deletable: false,
          nonDeletable: false,
          editable: false
        },
        {
          label: '操作人員',
          has: false,
          not: false,
          deletable: false,
          nonDeletable: false,
          editable: false
        },
        {
          label: '操作人員',
          has: false,
          not: false,
          deletable: false,
          nonDeletable: false,
          editable: false
        }
      ],
    };
  },
}
</script>
