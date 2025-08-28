<template>
  <div>
    <div class="flex items-center justify-between cursor-pointer hover:bg-[#0a1e38] px-6 py-2"
      @click="handleClick(item)" :class="{
        '!bg-white !text-black': isActive(item.path),
        'text-white': !isActive(item.path)
      }" :style="{ paddingLeft: `${level * 24}px` }">
      <div class="flex items-center space-x-2">
        <img v-if="isActive(item.path)" :src="'/assets/img/common/black-right-arrow.png'" alt="arrow"
          class="h-4" />
        <img v-else :src="'/assets/img/common/white-right-arrow.png'" alt="arrow" class="h-4" />
        <span>{{ item.label }}</span>
      </div>
    </div>

    <!-- Submenu -->
    <ul v-if="isSubMenuOpen">
      <li v-for="sub in item.children" :key="sub.path">
        <menu-item v-if="sub.children && sub.children.length" :item="sub" :open-menus="openMenus"
          :toggle-menu="toggleMenu" :is-active="isActive" :level="level + 1" />
        <div v-else class="flex items-center space-x-2" :class="[
          'pr-2 py-2 cursor-pointer hover:bg-[#0a1e38]',
          isActive(sub.path) ? '!bg-white !text-black' : 'text-white'
        ]" :style="{ paddingLeft: `${(level + 1) * 24}px` }" @click="handleSubMenuClick(sub)">
          <img v-if="isActive(sub.path)" :src="'/assets/img/common/black-right-arrow.png'" alt="arrow"
            class="h-4" />
          <img v-else :src="'/assets/img/common/white-right-arrow.png'" alt="arrow" class="h-4" />
          <div>{{ sub.label }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: Object,
    openMenus: Array,
    toggleMenu: Function,
    isActive: Function,
    level: Number
  },
  data() {
    return {
      isSubMenuOpen: false
    };
  },
  methods: {
    handleClick(item) {
      if (item.children && item.children.length) {
        this.toggleSubMenu(item.id);
      } else {
        this.$router.push(item.path);
      }
    },
    handleSubMenuClick(sub) {
      this.$router.push(sub.path);
    },
    toggleSubMenu(id) {
      this.isSubMenuOpen = !this.isSubMenuOpen;
      this.toggleMenu(id);
    }
  }
};
</script>
