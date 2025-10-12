<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="p-4 w-full h-full rounded-xl bg-[#303d5d]">
      <div class="w-full h-full overflow-y-auto hover:overflow-y-scroll scrollbar-hide">
        <table class="min-w-full text-center text-white table-fixed border-separate border-spacing-0">
          <thead class="sticky top-0 z-10 bg-[#6dba38]">
            <tr>
              <th v-for="(header, index) in headers" :key="index" :style="{ width: header.width }" :class="[
                'px-4 py-2 bg-[#6dba38] text-2xl font-bold',
                index === 0 ? 'rounded-l-lg' : '',
                index === headers.length - 1 ? 'rounded-r-lg' : ''
              ]">
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows" :key="index" :class="index % 2 === 1 ? 'bg-[#5b6580]' : 'bg-transparent'">
              <td v-for="(header, hIndex) in headers" :key="hIndex" :style="{ width: header.width }" class="px-4 py-2 text-xl">
                <!-- 詳細內容欄位用 icon -->
                <template v-if="header.value === 'details'">
                  <img :src="detailIconSrc" alt="詳細內容" class="mx-auto w-6 h-6" />
                </template>
                <template v-else>
                  {{ row[header.value] || '-' }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'BiAccess1',
  data() {
    return {
      headers: [
        { label: "項目", value: "item", width: "20%" },
        { label: "發報時間", value: "alertTime", width: "15%" },
        { label: "處置方式", value: "action", width: "15%" },
        { label: "處置結果", value: "result", width: "15%" },
        { label: "結案時間", value: "closeTime", width: "15%" },
        { label: "詳細內容", value: "details", width: "10%" }
      ],
      rows: [
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
        {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },{
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
         {
          item: "過期卡片",
          alertTime: "09:16",
          action: "派員制止",
          result: "收回卡片",
          closeTime: "09:16",
        },
      ],
      detailIconSrc: "/assets/img/bi/access/詳細內容.png"
    }
  }
}
</script>
