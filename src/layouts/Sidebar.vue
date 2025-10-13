<template>
  <aside
    class="fixed bottom-0 left-0 z-50 w-64 h-[calc(100vh-var(--nav-height))] bg-no-repeat transform transition-transform duration-300 ease-in-out overflow-y-auto"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'" :style="{
      backgroundImage: `url('/assets/img/common/gradient-light.png')`,
      backgroundSize: '100% 100%'
    }">
    <ul class="py-4 select-none">
      <li v-for="(item, index) in menuItems" :key="index">
        <!-- 第一層選單 -->
        <menu-item :item="item" :open-menus="openMenus" :toggle-menu="toggleMenu" :is-active="isActive" :level="1"
          :index="index" />
      </li>
    </ul>
  </aside>
</template>

<script>
import MenuItem from './MenuItem.vue';

export default {
  name: 'SidebarMenu',
  components: {
    MenuItem
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      openMenus: [],
      menuItems: [
        {
          label: "權限管理",
          children: [
            { label: "新增", path: "/permission-management/create" },
            { label: "設定", path: "/permission-management/setting" },
            { label: "修改", path: "/permission-management/update" }
          ]
        },
        {
          label: "報表",
          path: "/report",
        },
        {
          label: "地圖",
          children: [
            { label: "全區", path: "/map/1/1" },
            { label: "地下一樓", path: "/map/2/1" },
            { label: "一樓(南側)", path: "/map/3/1" },
            { label: "一樓(國際線北側)", path: "/map/3/2" },
            { label: "二樓(南側)", path: "/map/4/1" },
            { label: "二樓(國際線北側)", path: "/map/4/2" },
            { label: "三樓", path: "/map/5/1" },
            { label: "頂樓", path: "/map/6/1" },
            { label: "站外停車場", path: "/map/7/1" },
            { label: "塔台", path: "/map/8/1" },
            { label: "宿舍一樓", path: "/map/9/1" },
            { label: "宿舍二樓", path: "/map/9/2" },
            { label: "貨運站一樓", path: "/map/10/1" },
            { label: "貨運站頂樓", path: "/map/10/2" },
            { label: "貨運站屋凸", path: "/map/10/3" },
            { label: "貨運站外", path: "/map/10/4" },
            { label: "污水處理廠", path: "/map/11/1" },
            { label: "七美", path: "/map/12/1" },
            { label: "望安", path: "/map/13/1" },
          ]
        },
        {
          label: "BI",
          children: [
            {
              label: "AI當天各類事件數量", children: [
                { label: '人流偵測', path: "/bi/statistics/1" },
                { label: '車流偵測', path: "/bi/statistics/2" },
                { label: '其他偵測', path: "/bi/statistics/3" },
              ]
            },
            {
              label: "門禁事件", children: [
                { label: "異常", path: "/bi/access/1" },
                { label: "警報顯示", path: "/bi/access/2" },
              ]
            },
            {
              label: "航班資訊", children: [
                { label: "航班統計A", path: "/bi/flight/1" },
                { label: "航班統計B", path: "/bi/flight/2" },
                { label: "其他統計", path: "/bi/flight/3" }
              ]
            }
          ]
        },
        {
          label: "圖表",
          children: [
            { label: "部門進出比例圖", path: "/chart/部門進出比例圖" },
            { label: "近一週各異常事件趨勢圖", path: "/chart/近一週各異常事件趨勢圖" },
          ]
        },
        {
          label: "第一層",
          children: [
            { label: "第二層選項1", path: "/user-management/create" },
            { label: "第二層選項2", path: "/user-management/create" },
            {
              label: "第二層子選單",
              path: "/user-management/list",
              children: [
                { label: "第三層選項1", path: "/user-management/list/details" },
                { label: "第三層選項2", path: "/user-management/list/details" },
                { label: "第三層選項3", path: "/user-management/list/details" },
                {
                  label: "第三層子選單",
                  path: "/user-management/list",
                  children: [
                    { label: "第四層選項1", path: "/user-management/list/details" },
                    { label: "第四層選項2", path: "/user-management/list/details" },
                    { label: "第四層選項3", path: "/user-management/list/details" },
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleMenu(index) {
      // 切換對應 index 的子選單
      if (this.openMenus.includes(index)) {
        this.openMenus = this.openMenus.filter(openIndex => openIndex !== index);
      } else {
        this.openMenus.push(index);
      }
    },
    isActive(path) {
      return this.$route.path === path;
    }
  }
};
</script>
