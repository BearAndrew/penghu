<template>
  <div class="relative w-full select-none" ref="dropdownWrapper">
    <!-- Dropdown Trigger -->
    <div class="p-[1px] rounded-sm bg-gradient-to-r from-green-400 to-blue-400">
      <div
        class="w-full flex items-center justify-between cursor-pointer bg-no-repeat rounded-sm"
        :class="{[triggerClass]: true, 'flex-row-reverse': iconPositionLeft,}"
        :style="{ backgroundImage: `url('/assets/img/common/gradient-light.png')`, backgroundSize: '100% 100%' }"
        @click="toggleDropdown"
      >
        <span class="text-white">
          <!-- 顯示modelValue的name -->
          {{ selectedOptionName || placeholder }}
        </span>
        <img src="/assets/img/common/white-down-arrow.png" class="h-3" alt="open" />
      </div>
    </div>

    <!-- Dropdown Options -->
    <div
      v-if="isDropdownOpen"
      class="absolute z-10 mt-1 w-full py-2 rounded shadow-lg bg-no-repeat overflow-hidden select-none"
      :style="{ backgroundImage: `url('/assets/img/common/gradient-light.png')`, backgroundSize: '100% 100%' }"
    >
      <div
        v-for="option in options"
        :key="option.id"
        @click="selectOption(option)"
        class="flex items-center cursor-pointer hover:bg-[#0a1e38] transition"
        :class="{ '!bg-white': modelValue === option.value, [optionClass]: true }"
      >
        <span :class="modelValue === option.value ? '!text-black' : 'text-white'">
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
    modelValue: {
      type: [String, Number],
      required: false,
    },
    placeholder: {
      type: String,
      default: '請選擇',
    },
    triggerClass: {
      type: String,
      default: 'px-4 py-2',
    },
    optionClass: {
      type: String,
      default: 'px-4 py-2',
    },
    iconPositionLeft: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    // 計算顯示的選項名稱
    selectedOptionName() {
      // 根據 modelValue 來找對應的 name
      const selectedOption = this.options.find(option => option.value === this.modelValue);
      return selectedOption ? selectedOption.name : null;
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.$emit('update:modelValue', option.value); // 傳遞 value
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
