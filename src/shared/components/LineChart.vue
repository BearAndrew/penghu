<template>
  <div :id="chartId" :style="{ backgroundColor: bgColor }" class="w-full h-full bg-gray-50"></div>
</template>

<script>
import { LineChart } from 'cci-ng-chart-tool';

export default {
  name: "LineChartComponent",
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
    },
    tickInterval: {
      type: Number,
      default: 1
    },
    stepCount: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {
      chart: null,
      chartId: 'line-chart-' + Math.random().toString(36).substr(2, 9),
    };
  },
  mounted() {
    this.chart = new LineChart(`#${this.chartId}`);
    this.chart.setDataSets(this.dataSet);
    this.chart.getGridFactory()
      .setGridGap({ left: 4, bottom: 4 })
      .setXLabelFont(this.fontSetting)
      .setYLabelFont(this.fontSetting)
      .setDirection(this.direction)
      .setStepsCount(this.stepCount);

    const gridline = this.chart.getGridlineFactory();
    if (this.direction == 'vertical') {
      gridline
        .setGridRow({ stroke: '#ddd' })
        .setGridCol({ stroke: '#65749d', 'stroke-width': 6 })
    } else {
      gridline
        .setGridRow({ 'stroke-width': '0' })
        .setGridCol({ stroke: '#ddd' });
    }
    gridline.setXAxis({ stroke: '#fff', 'stroke-width': 0 })
      .setYAxis({ stroke: '#fff', 'stroke-width': 0 })
      .setConfig({ showBorder: false, tickInterval: this.tickInterval });

    this.chart.getLineFactory();

    this.chart.getDotFactory().setRadius(3);

    this.chart.drawChart();
  },
  watch: {
    dataSet: {
      handler(newVal, oldVal) {
        if (this.hasDataChanged(newVal, oldVal)) {
          this.chart.setDataSets(this.dataSet);
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
