<template>
  <div class="inline-flex items-center cursor-pointer select-none" @click="toggle">
    <!-- 外框 -->
    <div
      class="w-8 h-8 rounded flex items-center justify-center bg-transparent overflow-hidden"
      :class="modelValue ? 'border-0' : 'border border-white'"
    >
      <img
        v-if="modelValue"
        src="@/assets/img/common/check.png"
        alt="checked"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  methods: {
    toggle() {
      this.$emit("update:modelValue", !this.modelValue);
    }
  }
};
</script>
