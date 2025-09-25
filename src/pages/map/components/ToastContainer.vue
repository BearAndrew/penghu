<!-- components/toast/ToastContainer.vue -->
<template>
  <div class="fixed top-5 right-5 z-[1000] pointer-events-none">
    <transition-group name="toast" tag="div" class="flex flex-col gap-3">
      <ToastItem
        v-for="toast in toasts"
        :key="toast.id"
        v-bind="toast"
        @close="removeToast"
      />
    </transition-group>
  </div>
</template>

<script>
import ToastItem from './ToastItem.vue'

let nextId = 1;

export default {
  name: "ToastContainer",
  components: { ToastItem },
  data() {
    return {
      toasts: []
    };
  },
  methods: {
    show({ message, level = 1, type = '1', title = "異常警示", duration = 3000 }) {
      const id = nextId++;
      this.toasts.push({ id, message, level, type, title, duration });
    },
    removeToast(id) {
      const index = this.toasts.findIndex(t => t.id === id);
      if (index !== -1) {
        this.toasts.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(100px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
</style>
