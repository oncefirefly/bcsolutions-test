<template>
  <div class="converter">
    <div class="converter__content content">
      <form>
        <div class="converter__selectors selectors">
          <select v-model="currencySelect">
            <option
              v-for="currency in supportedCurrencies"
              :key="currency.name"
              :value="currency.id"
            >
              {{ currency.name }}
            </option>
          </select>
          <select v-model="vsCurrencySelect">
            <option
              v-for="currency in supportedCurrencies"
              :key="currency.name"
              :value="currency.name"
            >
              {{ currency.name }}
            </option>
          </select>
        </div>
        <div class="converter__inputs inputs">
          <input
            v-model="currencyValue"
            @input="updateConvertation"
            type="input"
          />
          <input v-model="vsCurrencyValue" type="input" disabled />
        </div>
      </form>
      <hr />
      <coins-history-chart
        :currencyLabel="bitcoinChartLabel"
        :currency="bitcoinChartCurrency"
        :chartColor="bitcoinChartColor"
        :styles="chartsStyles"
      />
      <hr />
      <coins-history-chart
        :currencyLabel="ethereumChartLabel"
        :currency="ethereumChartCurrency"
        :chartColor="ethereumChartColor"
        :styles="chartsStyles"
      />
    </div>
  </div>
</template>

<script>
import CoinsHistoryChart from '../components/CoinsHistoryChart.vue';
import { getConvertData } from '../modules/api.js';

export default {
  name: 'ConverterView',
  components: { CoinsHistoryChart },

  data() {
    return {
      supportedCurrencies: [
        {
          id: 'bitcoin',
          name: 'BTC',
        },
        {
          id: 'ethereum',
          name: 'ETH',
        },
        {
          id: 'usd-balance',
          name: 'USD',
        },
      ],

      clientWidth: window.innerWidth,

      convertPrice: '',

      currencySelect: 'bitcoin',
      vsCurrencySelect: 'USD',

      currencyValue: 0,
      vsCurrencyValue: 0,

      bitcoinChartLabel: 'BTC',
      ethereumChartLabel: 'ETH',

      bitcoinChartColor: '#fab005',
      ethereumChartColor: '#ae34eb',

      bitcoinChartCurrency: 'bitcoin',
      ethereumChartCurrency: 'ethereum',
    };
  },

  created: async function () {
    this.convertPrice = await getConvertData(
      this.currencySelect,
      this.vsCurrencySelect.toLocaleLowerCase()
    );
  },

  mounted: function () {
    window.addEventListener(
      'resize',
      () => (this.clientWidth = window.innerWidth)
    );
  },

  beforeUnmount: function () {
    window.removeEventListener(
      'resize',
      () => (this.clientWidth = window.innerWidth)
    );
  },

  methods: {
    updateConvertation() {
      this.vsCurrencyValue = this.currencyValue * this.convertPrice;

      return (this.vsCurrencyValue =
        this.vsCurrencyValue > 1
          ? this.vsCurrencyValue.toFixed(2)
          : this.vsCurrencyValue.toPrecision(2));
    },
  },

  computed: {
    chartsStyles() {
      if (this.clientWidth > 480) {
        return {
          margin: '0 auto',
          width: `${420}px`,
          position: 'relative',
        };
      } else {
        return {
          margin: '0 auto',
          width: `${this.clientWidth - 10}px`,
          position: 'relative',
        };
      }
    },
  },

  watch: {
    async currencySelect() {
      this.convertPrice = await getConvertData(
        this.currencySelect,
        this.vsCurrencySelect.toLowerCase()
      );

      this.updateConvertation();
    },

    async vsCurrencySelect() {
      this.convertPrice = await getConvertData(
        this.currencySelect,
        this.vsCurrencySelect.toLowerCase()
      );

      this.updateConvertation();
    },
  },
};
</script>
