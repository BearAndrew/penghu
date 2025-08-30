<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <!-- 背景 -->
    <div class="absolute inset-0 bg-no-repeat scale-x-[-1] z-0"
      :style="{ backgroundImage: `url(/assets/img/common/gradient-dark.png)`, backgroundSize: '100% 100%' }">
    </div>

    <div
      class="flex flex-col flex-1 items-center gap-2 mx-auto mt-[calc(var(--nav-height)+1rem)] mb-4 w-[calc(100vw-2rem)] max-h-[calc(100vh-7rem)] *:bg-[#344061] *:p-4 *:w-full text-white z-10">

      <div class="flex flex-col flex-shrink-0 gap-6 overflow-hidden">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 px-2 py-1.5 bg-[#868687] text-xl">
            <span>日期(起)</span>
            <input class="px-1 text-black outline-none">
            <img class="h-4" src="/assets/img/report/calendar.png" alt="Calendar">
          </div>

          <div class="flex items-center gap-1 px-2 py-1.5 bg-[#868687] text-xl">
            <span>日期(迄)</span>
            <input class="px-1 text-black outline-none">
            <img class="h-4" src="/assets/img/report/calendar.png" alt="Calendar">
          </div>

          <GradientDropdown class="!w-[200px] self-end text-[20px] z-20" v-model="dropDown1" :options="dropDownOptions1"
            placeholder="" trigger-class="pl-2 pr-4 py-1" optionClass="px-2 py-1 text-xl" />

          <GradientDropdown class="!w-[200px] self-end text-[20px] z-20" v-model="dropDown2" :options="dropDownOptions2"
            placeholder="" trigger-class="pl-2 pr-4 py-1" optionClass="px-2 py-1 text-xl" />

        </div>


        <div class="flex items-center justify-end gap-4">
          <button
            class="flex items-center gap-3 px-4 py-0.5 text-xl bg-gradient-to-r from-[#47b69a] to-[#0287b9] text-white rounded-full">
            <img src="/assets/img/report/search.png" alt="search" class="h-5" />
            <span>查詢</span>
          </button>

          <button
            class="flex items-center gap-3 px-4 py-0.5 text-xl bg-gradient-to-r from-[#47b69a] to-[#0287b9] text-white rounded-full">
            <!-- <img src="/assets/img/report/plus.png" alt="plus" class="h-5" /> -->
             <span class="text-2xl leading-none">+</span>
            <span>新增</span>
          </button>

          <button
            class="flex items-center gap-3 px-4 py-0.5 text-xl bg-gradient-to-r from-[#47b69a] to-[#0287b9] text-white rounded-full">
            <img src="/assets/img/report/excel.png" alt="excel" class="h-5" />
            <span>產出Excel</span>
          </button>

          <button
            class="flex items-center gap-3 px-4 py-0.5 text-xl bg-gradient-to-r from-[#47b69a] to-[#0287b9] text-white rounded-full">
            <img src="/assets/img/report/pdf.png" alt="pdf" class="h-5" />
            <span>產出PDF</span>
          </button>

          <button
            class="flex items-center gap-3 px-4 py-0.5 text-xl bg-gradient-to-r from-[#47b69a] to-[#0287b9] text-white rounded-full">
            <img src="/assets/img/report/printer.png" alt="printer" class="h-5" />
            <span>列印</span>
          </button>
        </div>
      </div>

      <div class="flex flex-col flex-1 items-center gap-2 overflow-hidden">
        <div class="flex items-center justify-between gap-2 w-full">
          <h2 class="text-3xl font-bold">各種AI警告列表統計</h2>

          <div class="flex items-center gap-2">
            <label class="text-xl">每頁顯示</label>
            <GradientDropdown class="!w-[100px] self-end text-[20px] z-20" v-model="pageCount"
              :options="pageCountOptions" placeholder="請選擇頁數" trigger-class="pl-2 pr-4 py-1"
              optionClass="px-2 py-1 text-xl" :iconPositionLeft=true @change="changePageCount" />
          </div>
        </div>

        <!-- table with scrollable body -->
        <div class="flex-1 w-full overflow-auto">
          <table class="min-w-full table-auto text-white text-center border-collapse relative">
            <colgroup>
              <col style="width: 7%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 10%" />
              <col style="width: 5%" />
              <col style="width: 5%" />
            </colgroup>
            <thead class="bg-[#445075] sticky top-0 z-10">
              <tr>
                <th v-for="(header) in headerData" :key="header"
                  class="p-2 border border-gray-400 text-[#58595b] bg-[#bde4f9]">
                  <div class="flex items-center justify-center gap-1">
                    {{ header.value }}
                    <button @click="sortColumn(header.key)" class="relative">
                      <img src="/assets/img/common/black-right-arrow.png" alt="Sort Asc" class="h-4"
                        :class="sortKey === header.key && sortOrder === 1 ? '-rotate-90' : 'rotate-90'" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(row, index) in presentRowData" :key="row.id" class="hover:bg-[#556080]">
                <td class="p-2 border border-gray-400">{{ row.date }}</td>
                <td class="p-2 border border-gray-400">{{ row.location }}</td>
                <td class="p-2 border border-gray-400">{{ row.event }}</td>
                <td class="p-2 border border-gray-400">{{ row.anomaly }}</td>
                <td class="p-2 border border-gray-400">{{ row.category }}</td>
                <td class="p-2 border border-gray-400">{{ row.status }}</td>
                <td class="p-2 border border-gray-400">{{ row.handler }}</td>
                <td class="p-2 border border-gray-400">{{ row.completedTime }}</td>
                <td class="p-2 border border-gray-400">{{ row.isConfirmed ? '是' : '否' }}</td>
                <td class="p-2 border border-gray-400">
                  <button @click="editRow(index)">
                    <img src="/assets/img/report/edit.png" alt="Edit" class="h-6" />
                  </button>
                </td>
                <td class="p-2 border border-gray-400">
                  <button @click="deleteRow(index)">
                    <img src="/assets/img/report/delete.png" alt="Delete" class="h-6" />
                  </button>
                </td>
              </tr>
              <tr v-if="presentRowData.length === 0">
                <td :colspan="headerData.length" class="text-center py-4">沒有資料</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分頁按鈕 -->
        <div class="flex justify-center items-center mt-4">
          <!-- 上一頁按鈕 -->
          <button @click="prevPage" :disabled="page === 1" class="cursor-pointer">
            <img src="/assets/img/common/left-arrow.png" alt="Previous" class="w-6 pointer-events-none" />
          </button>

          <!-- 頁碼按鈕 -->
          <div class="flex items-center mx-4 gap-2">
            <!-- 判斷顯示頁碼的區域 -->
            <button v-for="pageNumber in pageNumbers" :key="pageNumber" @click="goToPage(pageNumber)"
              :class="{ '!bg-[#8d8d8e] text-white': pageNumber === page, 'pointer-events-none': pageNumber === '...' }"
              class="w-6 h-6 rounded-full hover:bg-[#667090] hover:text-white">
              {{ pageNumber }}
            </button>
          </div>

          <!-- 下一頁按鈕 -->
          <button @click="nextPage" :disabled="page === totalPages" class="cursor-pointer">
            <img src="/assets/img/common/right-arrow.png" alt="Next" class="w-6 pointer-events-none" />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GradientDropdown from '../shared/components/GradientDropdown.vue';

export default {
  name: 'ReportPage',
  components: {
    GradientDropdown
  },
  data() {
    return {
      // 表頭標題資料
      headerData: [
        { key: 'date', value: '日期' },
        { key: 'location', value: '地點' },
        { key: 'event', value: '發生事件' },
        { key: 'anomaly', value: '異常事件' },
        { key: 'category', value: '類別' },
        { key: 'status', value: '處理狀況' },
        { key: 'handler', value: '處理人員' },
        { key: 'completedTime', value: '處理完成時間' },
        { key: 'isConfirmed', value: '是否完成確認' },
        { key: 'edit', value: '修改' },
        { key: 'delete', value: '刪除' }
      ],
      pageCount: 15, // 預設顯示15筆
      pageCountOptions: [
        { name: '5筆', value: 5 },
        { name: '10筆', value: 10 },
        { name: '15筆', value: 15 },
      ],
      dropDown1: 1,
      dropDownOptions1: [
        { name: '功能報表', value: 1 },
        { name: '第二報表', value: 2 },
        { name: '第三報表', value: 3 }
      ],
      dropDown2: 1,
      dropDownOptions2: [
        { name: '功能報表', value: 1 },
        { name: '第二報表', value: 2 },
        { name: '第三報表', value: 3 }
      ],
      page: 1,
      rawData: [
        { id: 1, date: '2024/9/10', location: '中控室', event: '系統當機', anomaly: '影像模糊', category: '資料錯誤', status: '已處理', handler: '彭小東', completedTime: '2024/9/10 12:45:23', isConfirmed: true },
        { id: 2, date: '2024/9/11', location: '伺服器室', event: '網路故障', anomaly: '頻寬不足', category: '網路問題', status: '未處理', handler: '李大華', completedTime: '2024/9/11 15:00:00', isConfirmed: false },
        { id: 3, date: '2024/9/12', location: '前端伺服器', event: '磁碟空間不足', anomaly: '磁碟過滿', category: '硬體問題', status: '已處理', handler: '陳大明', completedTime: '2024/9/12 10:30:45', isConfirmed: true },
        { id: 4, date: '2024/9/13', location: '備援機房', event: '網路攻擊', anomaly: '流量異常', category: '安全事件', status: '處理中', handler: '王小華', completedTime: '2024/9/13 08:15:12', isConfirmed: false },
        { id: 5, date: '2024/9/14', location: '數據中心', event: '資料損毀', anomaly: '無法讀取', category: '資料庫問題', status: '已處理', handler: '李曉明', completedTime: '2024/9/14 14:10:30', isConfirmed: true },
        { id: 6, date: '2024/9/15', location: '中控室', event: '電力中斷', anomaly: 'UPS設備異常', category: '硬體問題', status: '未處理', handler: '張建國', completedTime: '2024/9/15 09:00:20', isConfirmed: false },
        { id: 7, date: '2024/9/16', location: '伺服器室', event: '操作失誤', anomaly: '錯誤配置', category: '人為錯誤', status: '已處理', handler: '王志強', completedTime: '2024/9/16 13:55:40', isConfirmed: true },
        { id: 8, date: '2024/9/17', location: '應用伺服器', event: '系統崩潰', anomaly: '內存溢出', category: '軟體問題', status: '處理中', handler: '張明華', completedTime: '2024/9/17 16:30:10', isConfirmed: false },
        { id: 9, date: '2024/9/18', location: '數據中心', event: '伺服器重啟', anomaly: '電源波動', category: '硬體問題', status: '未處理', handler: '劉美麗', completedTime: '2024/9/18 11:20:45', isConfirmed: false },
        { id: 10, date: '2024/9/19', location: '監控平台', event: '資料丟失', anomaly: '備份未啟動', category: '資料錯誤', status: '已處理', handler: '陳浩然', completedTime: '2024/9/19 12:45:50', isConfirmed: true },
        { id: 11, date: '2024/9/20', location: '中控室', event: '防火牆故障', anomaly: '無法訪問外網', category: '安全事件', status: '處理中', handler: '李晶晶', completedTime: '2024/9/20 14:30:25', isConfirmed: false },
        { id: 12, date: '2024/9/21', location: '伺服器室', event: '記憶體損壞', anomaly: '無法加載系統', category: '硬體問題', status: '未處理', handler: '吳永強', completedTime: '2024/9/21 08:40:10', isConfirmed: false },
        { id: 13, date: '2024/9/22', location: '數據庫伺服器', event: '查詢超時', anomaly: '資料庫延遲', category: '軟體問題', status: '已處理', handler: '李大明', completedTime: '2024/9/22 17:00:50', isConfirmed: true },
        { id: 14, date: '2024/9/23', location: '數據中心', event: '資料庫崩潰', anomaly: '磁碟錯誤', category: '硬體問題', status: '處理中', handler: '張安安', completedTime: '2024/9/23 16:20:10', isConfirmed: false },
        { id: 15, date: '2024/9/24', location: '前端伺服器', event: '網路速度過慢', anomaly: '頻寬不足', category: '網路問題', status: '已處理', handler: '黃國輝', completedTime: '2024/9/24 12:00:10', isConfirmed: true },
        { id: 16, date: '2024/9/25', location: '伺服器室', event: '網路流量過載', anomaly: '流量上限達到', category: '網路問題', status: '未處理', handler: '趙倩倩', completedTime: '2024/9/25 10:05:30', isConfirmed: false },
        { id: 17, date: '2024/9/26', location: '應用伺服器', event: 'API異常', anomaly: '錯誤返回碼', category: '軟體問題', status: '已處理', handler: '劉曉瑩', completedTime: '2024/9/26 18:15:00', isConfirmed: true },
        { id: 18, date: '2024/9/27', location: '數據中心', event: '服務器連接中斷', anomaly: 'TCP/IP錯誤', category: '網路問題', status: '處理中', handler: '何健', completedTime: '2024/9/27 14:30:00', isConfirmed: false },
        { id: 19, date: '2024/9/28', location: '中控室', event: '資料庫連接異常', anomaly: '連接超時', category: '資料庫問題', status: '已處理', handler: '陳俊男', completedTime: '2024/9/28 09:30:45', isConfirmed: true },
        { id: 20, date: '2024/9/29', location: '備援機房', event: '系統異常', anomaly: '硬體故障', category: '硬體問題', status: '未處理', handler: '王建豪', completedTime: '2024/9/29 13:25:40', isConfirmed: false },
        { id: 21, date: '2024/9/30', location: '數據庫伺服器', event: '寫入錯誤', anomaly: '磁碟損壞', category: '硬體問題', status: '已處理', handler: '鄭健', completedTime: '2024/9/30 16:40:50', isConfirmed: true },
        { id: 22, date: '2024/10/1', location: '應用伺服器', event: '內存錯誤', anomaly: '內存溢出', category: '軟體問題', status: '處理中', handler: '葉建國', completedTime: '2024/10/1 11:55:00', isConfirmed: false },
        { id: 23, date: '2024/10/2', location: '數據中心', event: '磁碟故障', anomaly: '磁碟報錯', category: '硬體問題', status: '未處理', handler: '林忠', completedTime: '2024/10/2 09:05:40', isConfirmed: false },
        { id: 24, date: '2024/10/3', location: '前端伺服器', event: '資料丟失', anomaly: '備份未啟動', category: '資料錯誤', status: '已處理', handler: '黃鈺文', completedTime: '2024/10/3 12:15:20', isConfirmed: true },
        { id: 25, date: '2024/10/4', location: '監控平台', event: '資料異常', anomaly: '數據無法讀取', category: '軟體問題', status: '處理中', handler: '張大成', completedTime: '2024/10/4 08:30:00', isConfirmed: false },
        { id: 26, date: '2024/10/5', location: '伺服器室', event: '硬碟損壞', anomaly: '無法啟動系統', category: '硬體問題', status: '未處理', handler: '李剛', completedTime: '2024/10/5 10:15:30', isConfirmed: false },
        { id: 27, date: '2024/10/6', location: '數據庫伺服器', event: '數據查詢錯誤', anomaly: '查詢超時', category: '軟體問題', status: '已處理', handler: '王月', completedTime: '2024/10/6 12:30:10', isConfirmed: true },
        { id: 28, date: '2024/10/7', location: '備援機房', event: '網路斷線', anomaly: '無法連接外部網路', category: '網路問題', status: '處理中', handler: '林宇', completedTime: '2024/10/7 15:40:00', isConfirmed: false },
        { id: 29, date: '2024/10/8', location: '中控室', event: '系統更新錯誤', anomaly: '升級失敗', category: '軟體問題', status: '未處理', handler: '方志偉', completedTime: '2024/10/8 09:50:00', isConfirmed: false },
        { id: 30, date: '2024/10/9', location: '伺服器室', event: '數據庫崩潰', anomaly: '系統錯誤', category: '資料庫問題', status: '已處理', handler: '李建明', completedTime: '2024/10/9 14:00:00', isConfirmed: true }
      ],
      presentRowData: [], // 用來存儲當前頁面顯示的資料
      sortKey: null,
      sortOrder: 1,   // 1為升冪，-1為降冪
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.rawData.length / this.pageCount);
    },
    pageNumbers() {
      const total = this.totalPages;
      const maxVisible = 5; // 最大顯示的頁碼數量
      let pageNumbers = [];

      if (total <= maxVisible) {
        pageNumbers = Array.from({ length: total }, (_, i) => i + 1);
      } else {
        const start = Math.max(1, this.page - 2); // 起始頁數，最多前兩頁
        const end = Math.min(total, this.page + 2); // 結束頁數，最多後兩頁

        if (start > 1) pageNumbers.push(1);
        if (start > 2) pageNumbers.push('...');
        pageNumbers.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i));
        if (end < total - 1) pageNumbers.push('...');
        if (end < total) pageNumbers.push(total);
      }

      return pageNumbers;
    },
  },
  watch: {
    // 監控頁碼或頁面顯示筆數改變時，重新計算並更新當前顯示的資料
    pageCount() {
      this.page = 1; // 更改 pageCount 時重置頁碼
      this.updatePresentRowData();
    },
    page() {
      this.updatePresentRowData();
    },
  },
  methods: {
    prevPage() {
      if (this.page > 1) this.page--;
    },
    nextPage() {
      if (this.page < this.totalPages) this.page++;
    },
    goToPage(pageNumber) {
      if (pageNumber !== '...') {
        this.page = pageNumber;
      }
    },
    updatePresentRowData() {
      let sortedData = [...this.rawData];
      if (this.sortKey !== null) {
        const key = this.headerData.find(header => header.key === this.sortKey).key;
        sortedData.sort((a, b) => {
          if (a[key] <= b[key]) return -this.sortOrder;
          if (a[key] > b[key]) return this.sortOrder;
          return 0;
        });
      }
      const start = (this.page - 1) * this.pageCount;
      const end = start + this.pageCount;
      this.presentRowData = sortedData.slice(start, end);  // 更新當前顯示的資料
    },
    changePageCount(value) {
      this.pageCount = value;
      this.page = 1; // 更改 pageCount 時重置頁碼
      this.updatePresentRowData();
    },
    editRow(index) {
      const row = this.presentRowData[index];
      alert(`編輯資料 ID: ${row.id}`);
    },
    deleteRow(index) {
      const row = this.presentRowData[index];
      if (confirm(`確定要刪除資料 ID: ${row.id} 嗎？`)) {
        this.rawData = this.rawData.filter((_, i) => i !== index);
        this.updatePresentRowData(); // 更新顯示的資料
      }
    },
    // 排序方法
    sortColumn(index) {
      if (this.sortKey === index) {
        // 如果點擊的是同一列，切換排序方向
        this.sortOrder = -this.sortOrder;
      } else {
        // 如果點擊的是不同列，重置為升序
        this.sortKey = index;
        this.sortOrder = 1;
      }
      this.updatePresentRowData();  // 更新表格資料
    }
  },
  created() {
    // 初始化時更新當前顯示的資料
    this.updatePresentRowData();
  }

};
</script>
