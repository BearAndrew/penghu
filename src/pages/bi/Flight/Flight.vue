<template>
  <component v-if="currentComponent" :is="currentComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'BiFlight',
  computed: {
    subId() {
      return Number(this.$route.params.subId);
    },
    currentComponent() {
      switch (this.subId) {
        case 1:
          return defineAsyncComponent(() => import('./Flight1.vue'));
        case 2:
          return defineAsyncComponent(() => import('./Flight2.vue'));
        case 3:
          return defineAsyncComponent(() => import('./Flight3.vue'));
        default:
          return {
            template: '<div class="text-red-500">無效的 subId</div>',
          };
      }
    },
  },
};
</script>
