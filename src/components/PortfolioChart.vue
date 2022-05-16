<template>
  <Bar
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: 'BarChart',
  components: { Bar },

  props: {
    btcPercentAmount: {
      type: Number,
      default: 0,
    },
    ethPercentAmount: {
      type: Number,
      default: 0,
    },
    chartId: {
      type: String,
      default: 'bar-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    cssClasses: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 200,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      chartOptions: {
        responsive: true,
        layout: {
          padding: 10,
        },
      },
    };
  },

  computed: {
    chartData() {
      return {
        labels: ['Percentage (%)'],
        datasets: [
          {
            label: 'BTC',
            backgroundColor: '#fab005',
            data: [this.btcPercentAmount, 100],
          },
          {
            label: 'ETH',
            backgroundColor: '#ae34eb',
            data: [this.ethPercentAmount, 100],
          },
        ],
      };
    },
  },
};
</script>
