<template>
  <div class="h-full relative flex items-center justify-center">

    <div class="grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">前五到站延誤取消架次排名(航空公司/地點)</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">

          <div class="grid grid-cols-6 gap-y-2 text-center w-full text-white" style="border-collapse: separate;">
            <!-- Header -->
            <div></div> <!-- 第一欄空白 -->
            <div v-for="(title, idx) in block1.headerTitles.slice(1)" :key="'header-' + idx" :class="[
              'py-1 text-2xl font-bold',
              'bg-[#6dba38]',
              idx === 0 ? 'rounded-l-lg' : '',
              idx === block1.headerTitles.length - 2 ? 'rounded-r-lg' : ''
            ]">
              {{ title }}
            </div>

            <!-- Body -->
            <template v-for="(row, rowIdx) in block1.tableData" :key="'row-' + rowIdx">
              <!-- icon -->
              <div class="flex flex-col items-center justify-center p-2">
                <img :src="block1.icon[rowIdx].src" alt="icon" class="h-10" />
                <span class="text-sm">{{ block1.icon[rowIdx].text }}</span>
              </div>

              <!-- 資料欄位 -->
              <div v-for="(col, colIdx) in row" :key="'cell-' + rowIdx + '-' + colIdx" :class="[
                'flex items-center justify-center p-2 text-[32px] bg-transparent border-gray-200',
                'border-2',
                colIdx !== 0 ? 'border-l border-l-gray-200' : '',
                colIdx === 0 ? 'rounded-l-lg' : '',
                colIdx === row.length - 1 ? 'rounded-r-lg' : ''
              ]">
                {{ col }}
              </div>
            </template>
          </div>

        </div>
      </div>

      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">離站到站延誤取消架次排名(航空公司/地點)</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">

          <div class="grid grid-cols-6 gap-y-2 text-center w-full text-white" style="border-collapse: separate;">
            <!-- Header -->
            <div></div> <!-- 第一欄空白 -->
            <div v-for="(title, idx) in block2.headerTitles.slice(1)" :key="'header-' + idx" :class="[
              'py-1 text-2xl font-bold',
              'bg-[#6dba38]',
              idx === 0 ? 'rounded-l-lg' : '',
              idx === block2.headerTitles.length - 2 ? 'rounded-r-lg' : ''
            ]">
              {{ title }}
            </div>

            <!-- Body -->
            <template v-for="(row, rowIdx) in block2.tableData" :key="'row-' + rowIdx">
              <!-- icon -->
              <div class="flex flex-col items-center justify-center p-2">
                <img :src="block2.icon[rowIdx].src" alt="icon" class="h-10" />
                <span class="text-sm">{{ block1.icon[rowIdx].text }}</span>
              </div>

              <!-- 資料欄位 -->
              <div v-for="(col, colIdx) in row" :key="'cell-' + rowIdx + '-' + colIdx" :class="[
                'flex items-center justify-center p-2 text-[32px] bg-transparent border-gray-200',
                'border-2',
                colIdx !== 0 ? 'border-l border-l-gray-200' : '',
                colIdx === 0 ? 'rounded-l-lg' : '',
                colIdx === row.length - 1 ? 'rounded-r-lg' : ''
              ]">
                {{ col }}
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">離站到站延誤架次排名(航空公司/地點)</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">

          <div class="grid grid-cols-6 gap-y-2 text-center w-full text-white" style="border-collapse: separate;">
            <!-- Header -->
            <div></div> <!-- 第一欄空白 -->
            <div v-for="(title, idx) in block3.headerTitles.slice(1)" :key="'header-' + idx" :class="[
              'py-1 text-2xl font-bold',
              'bg-[#6dba38]',
              idx === 0 ? 'rounded-l-lg' : '',
              idx === block3.headerTitles.length - 2 ? 'rounded-r-lg' : ''
            ]">
              {{ title }}
            </div>

            <!-- Body -->
            <template v-for="(row, rowIdx) in block3.tableData" :key="'row-' + rowIdx">
              <!-- icon -->
              <div class="flex flex-col items-center justify-center p-2">
                <img :src="block3.icon[rowIdx].src" alt="icon" class="h-10" />
                <span class="text-sm">{{ block3.icon[rowIdx].text }}</span>
              </div>

              <!-- 資料欄位 -->
              <div v-for="(col, colIdx) in row" :key="'cell-' + rowIdx + '-' + colIdx" :class="[
                'flex items-center justify-center p-2 text-[32px] bg-transparent border-gray-200',
                'border-2',
                colIdx !== 0 ? 'border-l border-l-gray-200' : '',
                colIdx === 0 ? 'rounded-l-lg' : '',
                colIdx === row.length - 1 ? 'rounded-r-lg' : ''
              ]">
                {{ col }}
              </div>
            </template>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full h-full px-4 py-3 rounded-xl bg-[#2d3a5a]">
        <div class="flex items-center gap-4 w-full relative">
          <div class="bg-[#63b85b] rounded-full w-6 h-6"></div>
          <h3 class="text-xl text-white font-bold">前五到到站延誤架次排名(航空公司/地點)</h3>
          <img src="/assets/img/common/icon-close.png" alt="close" class="absolute right-0 h-5" />
        </div>
        <div class="flex flex-1 items-center justify-between gap-4 h-0">

          <div class="grid grid-cols-6 gap-y-2 text-center w-full text-white" style="border-collapse: separate;">
            <!-- Header -->
            <div></div> <!-- 第一欄空白 -->
            <div v-for="(title, idx) in block4.headerTitles.slice(1)" :key="'header-' + idx" :class="[
              'py-1 text-2xl font-bold',
              'bg-[#6dba38]',
              idx === 0 ? 'rounded-l-lg' : '',
              idx === block4.headerTitles.length - 2 ? 'rounded-r-lg' : ''
            ]">
              {{ title }}
            </div>

            <!-- Body -->
            <template v-for="(row, rowIdx) in block1.tableData" :key="'row-' + rowIdx">
              <!-- icon -->
              <div class="flex flex-col items-center justify-center p-2">
                <img :src="block4.icon[rowIdx].src" alt="icon" class="h-10" />
                <span class="text-sm">{{ block4.icon[rowIdx].text }}</span>
              </div>

              <!-- 資料欄位 -->
              <div v-for="(col, colIdx) in row" :key="'cell-' + rowIdx + '-' + colIdx" :class="[
                'flex items-center justify-center p-2 text-[32px] bg-transparent border-gray-200',
                'border-2',
                colIdx !== 0 ? 'border-l border-l-gray-200' : '',
                colIdx === 0 ? 'rounded-l-lg' : '',
                colIdx === row.length - 1 ? 'rounded-r-lg' : ''
              ]">
                {{ col }}
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

export default {
  name: 'BiFlight2',
  data() {
    return {
      block1: {
        tableData: [
          ['立榮', '立榮', '立榮', '立榮', '立榮'],
          ['高雄', '高雄', '高雄', '高雄', '高雄'],
        ],
        icon: [{
          src: "/assets/img/bi/flight/航空公司.png",
          text: "航空公司"
        }, {
          src: "/assets/img/bi/flight/地點.png",
          text: "地點"
        }],
        headerTitles: ["", "1", "2", "3", "4", "5"], // 第一欄空白
      },
      block2: {
        tableData: [
          ['立榮', '立榮', '立榮', '立榮', '立榮'],
          ['高雄', '高雄', '高雄', '高雄', '高雄'],
        ],
        icon: [{
          src: "/assets/img/bi/flight/航空公司.png",
          text: "航空公司"
        }, {
          src: "/assets/img/bi/flight/地點.png",
          text: "地點"
        }],
        headerTitles: ["", "1", "2", "3", "4", "5"], // 第一欄空白
      },
      block3: {
        tableData: [
          ['立榮', '立榮', '立榮', '立榮', '立榮'],
          ['高雄', '高雄', '高雄', '高雄', '高雄'],
        ],
        icon: [{
          src: "/assets/img/bi/flight/航空公司.png",
          text: "航空公司"
        }, {
          src: "/assets/img/bi/flight/地點.png",
          text: "地點"
        }],
        headerTitles: ["", "1", "2", "3", "4", "5"], // 第一欄空白
      },
      block4: {
        tableData: [
          ['立榮', '立榮', '立榮', '立榮', '立榮'],
          ['高雄', '高雄', '高雄', '高雄', '高雄'],
        ],
        icon: [{
          src: "/assets/img/bi/flight/航空公司.png",
          text: "航空公司"
        }, {
          src: "/assets/img/bi/flight/地點.png",
          text: "地點"
        }],
        headerTitles: ["", "1", "2", "3", "4", "5"], // 第一欄空白
      },
    }
  }
}
</script>
