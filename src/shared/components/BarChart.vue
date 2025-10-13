<template>
  <div :id="chartId" :style="{ backgroundColor: bgColor }" class="w-full h-full bg-gray-50"></div>
</template>

<script>
import { BarChart } from 'cci-ng-chart-tool';

export default {
  name: "BarChartComponent",
  props: {
    bgColor: {
      type: String,
      default: '#2d3a5a'
    },
    dataSet: {
      type: Array,
    },
    direction: {
      type: String,
      default: 'vertical'
    },
    fontSetting: {
      type: Object,
      default: () => ({ 'font-size': '12px', color: '#fff' })
    }
  },
  data() {
    return {
      chart: null,
      chartId: 'bar-chart-' + Math.random().toString(36).substr(2, 9),
    };
  },
  mounted() {
    this.chart = new BarChart(`#${this.chartId}`);
    this.chart.setDataSets(this.dataSet, true);
    this.chart.getGridFactory()
      .setGridGap({ left: 4, bottom: 4 })
      .setXLabelFont(this.fontSetting)
      .setYLabelFont(this.fontSetting)
      .setDirection(this.direction);

    if (this.direction == 'vertical') {
      this.chart.getGridlineFactory()
        .setGridRow({ stroke: '#ddd' })
        .setGridCol({ 'stroke-width': '0' })
        .setXAxis({ stroke: '#fff', 'stroke-width': 2 })
        .setYAxis({ stroke: '#fff', 'stroke-width': 2 })
        .setConfig({ showBorder: false });
    } else {
      this.chart.getGridlineFactory()
        .setGridRow({ 'stroke-width': '0' })
        .setGridCol({ stroke: '#ddd' })
        .setXAxis({ stroke: '#fff', 'stroke-width': 2 })
        .setYAxis({ stroke: '#fff', 'stroke-width': 2 })
        .setConfig({ showBorder: false });
    }

    this.chart.getBarFactory()
      .setShowValueLabel(true)
      .setValueLabelFont(this.fontSetting)
      .setConfig({ borderRadius: 2, showTooltip: false, showValueLabel: true, valueLabelFontSetting: this.fontSetting });

    this.chart.drawChart();
  },
  watch: {
    dataSet: {
      handler(newVal, oldVal) {
        if (this.hasDataChanged(newVal, oldVal)) {
          this.chart.setDataSets(this.dataSet, true);
          this.chart.drawChart();
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
