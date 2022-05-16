<template>
  <div class="converter__history-graph history-graph">
    <label>
      <span :style="{ color: chartColor }">{{ this.currencyLabel }}</span>
      to
      <select v-model="vsCurrencyChart" class="history-graph__selector">
        <option value="USD">USD</option>
        <option value="ETH">ETH</option>
        <option value="BTC">BTC</option>
      </select>
      (last 14 days)
    </label>
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { getGraphData } from '../modules/api.js';
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
    currencyLabel: {
      type: String,
      default: null,
    },
    currency: {
      type: String,
      default: null,
    },
    chartColor: {
      type: String,
      default: null,
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

      vsCurrencyChart: 'USD',
      currencyHistoryPrices: [],
      currencyHistoryDates: [],
    };
  },

  created: async function () {
    const bitcoinHistoryData = await getGraphData(
      this.currency,
      this.vsCurrencyChart.toLowerCase()
    );

    this.updateChartData(bitcoinHistoryData);
  },

  computed: {
    chartData() {
      return {
        labels: [...this.currencyHistoryDates],
        datasets: [
          {
            label: `${this.currencyLabel} - ${this.vsCurrencyChart}`,
            data: [...this.currencyHistoryPrices],
            backgroundColor: this.chartColor,
          },
        ],
      };
    },
  },

  methods: {
    updateChartData(historyData) {
      historyData.forEach((item, index) => {
        if (index < historyData.length - 1) {
          let date = new Date(item[0]);
          let normalizedDate = date.getDate() + '.' + `${date.getMonth() + 1}`;
          let price = item[1];

          this.currencyHistoryPrices.push(price);
          this.currencyHistoryDates.push(normalizedDate);
        }
      });
    },
  },

  watch: {
    async vsCurrencyChart() {
      const currencyHistoryData = await getGraphData(
        this.currency,
        this.vsCurrencyChart.toLowerCase()
      );

      this.currencyHistoryPrices = [];
      this.currencyHistoryDates = [];

      this.updateChartData(currencyHistoryData);
    },
  },
};
</script>
