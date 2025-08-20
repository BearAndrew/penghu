<template>
  <div class="relative w-full select-none" ref="dropdownWrapper">
    <!-- Dropdown Trigger -->
    <div class="p-[1px] rounded-sm bg-gradient-to-r from-green-400 to-blue-400">
      <div
        class="w-full px-4 py-2 flex items-center justify-between cursor-pointer bg-no-repeat rounded-sm"
        :style="{ backgroundImage: `url(${require('@/assets/img/common/gradient-light.png')})`, backgroundSize: '100% 100%' }"
        @click="toggleDropdown"
      >
        <span class="text-white">
          {{ modelValue || placeholder }}
        </span>
        <img src="@/assets/img/common/white-down-arrow.png" class="h-3" alt="open" />
      </div>
    </div>

    <!-- Dropdown Options -->
    <div
      v-if="isDropdownOpen"
      class="absolute z-10 mt-1 w-full py-2 rounded shadow-lg bg-no-repeat overflow-hidden select-none"
      :style="{ backgroundImage: `url(${require('@/assets/img/common/gradient-light.png')})`, backgroundSize: '100% 100%' }"
    >
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        class="flex items-center px-4 py-2 cursor-pointer hover:bg-[#0a1e38] transition"
        :class="modelValue === option.name ? '!bg-white' : ''"
      >
        <span :class="modelValue === option.name ? '!text-black' : 'text-white'">
          {{ option.name }}
        </span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'GradientDropdown',
  props: {
    label: String,
    options: {
      type: Array,
      required: true,
    },
    modelValue: String,
    placeholder: {
      type: String,
      default: '請選擇',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.name);
      this.isDropdownOpen = false;
    },
    handleClickOutside(event) {
      // 檢查是否點擊在 dropdown 元素之外
      if (this.$refs.dropdownWrapper && !this.$refs.dropdownWrapper.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

