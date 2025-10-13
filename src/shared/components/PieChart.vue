<template>
  <div :id="chartId" :style="{ backgroundColor: bgColor }" class="w-full h-full bg-gray-50"></div>
</template>

<script>
import { RootSvg, RadialFactory, PieFactory } from 'cci-ng-chart-tool';

export default {
  name: "PieChart",
  props: {
    bgColor: {
      type: String,
      default: '#2d3a5a'
    },
    dataSet: {
      type: Array,
    },
    fontSetting: {
      type: Object,
      default: () => ({ 'font-size': '12px', color: '#fff' })
    },
  },
  data() {
    return {
      chart: null,
      chartId: 'pie-chart-' + Math.random().toString(36).substr(2, 9),
      radial: null,
      pie: null,
      tmp: [
        {
          label: '第一',
          colors: ['#fff'],
          data: { value: 20 },
        },
        {
          label: '22222',
          colors: [],
          data: { value: 30 },
        },
      ]
    };
  },
  mounted() {
    this.chart = new RootSvg(`#${this.chartId}`);
    this.radial = new RadialFactory(this.chart);
    this.pie = new PieFactory(this.radial);

    this.radial.setConfig({
      labelFontConfig: {
        'font-size': '20px',
        'font-family': '',
        'font-weight': '400',
        color: '#fff',
      },
      labelOffset: 8,
    });

    this.radial.setData(this.dataSet);
    this.pie.setData(this.dataSet);
    this.radial.draw();
    this.pie.draw();
  },
  watch: {
    dataSet: {
      handler(newVal, oldVal) {
        if (this.hasDataChanged(newVal, oldVal)) {
          this.radial.setData(this.dataSet);
          this.pie.setData(this.dataSet);
          this.radial.draw();
          this.pie.draw();
        }
      },
      deep: true,
      immediate: false
    },
  },
  methods: {
    // 比較兩個數組中的數據是否有實際變化
    hasDataChanged(newData, oldData) {
      if (newData.length !== oldData.length) {
        return true;
      }

      for (let i = 0; i < newData.length; i++) {
        if (JSON.stringify(newData[i].data) !== JSON.stringify(oldData[i].data)) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>