<template>
  <div class="portfolio">
    <div class="portfolio__content content">
      <div class="portfolio__description">
        <h1>Here&rsquo;s your portfolio!</h1>
        <p>
          Only <span id="bitcoin">BITCOIN</span> and
          <span id="ethereum">ETHEREUM</span> are supported.
        </p>
      </div>
      <div class="portfolio__currencies">
        <div
          v-for="coin in coins"
          :key="coin.id"
          class="portfolio__currency currency-card"
        >
          <div class="flex justify-between items-center">
            <div class="currency-card__title">
              <img :src="require(`../assets/img/${coin.logo}.svg`)" />
              <h1>{{ coin.name }}</h1>
            </div>
            <div class="currency-card__amount">
              <span>{{ coin.amount }}</span> <br />
              <span class="currency-card__exchange"
                >~ {{ coin.totalPrice }} USD</span
              >
            </div>
          </div>
          <hr />
          <div class="portfolio__buttons">
            <button @click="addCustomAmount(coin)">
              <span>Add custom amount</span>
            </button>
            <div class="flex items-center gap-1">
              <button
                class="portfolio__button"
                @click="addFixedAmount(1, coin)"
              >
                <span>+1</span>
              </button>
              <button
                class="portfolio__button"
                @click="addFixedAmount(10, coin)"
              >
                <span>+10</span>
              </button>
              <button
                class="portfolio__button"
                @click="addFixedAmount(100, coin)"
              >
                <span>+100</span>
              </button>
            </div>
          </div>
          <hr />
          <div class="portfolio__buttons">
            <button @click="substractCustomAmount(coin)">
              <span>Substract custom amount</span>
            </button>
            <div class="flex items-center gap-1">
              <button
                class="portfolio__button"
                @click="substractFixedAmount(1, coin)"
              >
                <span>-1</span>
              </button>
              <button
                class="portfolio__button"
                @click="substractFixedAmount(10, coin)"
              >
                <span>-10</span>
              </button>
              <button
                class="portfolio__button"
                @click="substractFixedAmount(100, coin)"
              >
                <span>-100</span>
              </button>
            </div>
          </div>
        </div>
        <div class="portfolio__price price">
          <span class="price__title">Total portfolio price:</span>
          <span class="price__total"> ~ {{ totalPortfolioPrice }} USD</span>
        </div>
      </div>
      <portfolio-chart
        :btcPercentAmount="btcPercentAmount"
        :ethPercentAmount="ethPercentAmount"
        :styles="chartsStyles"
      />
    </div>
  </div>
</template>

<script>
import PortfolioChart from '@/components/PortfolioChart.vue';
import { getPortfolioData } from '@/modules/api';

export default {
  name: 'PortfolioView',

  components: { PortfolioChart },

  data() {
    return {
      coins: [
        {
          id: 'bitcoin',
          logo: 'bitcoin-logo',
          name: 'BTC | Bitcoin',
          amount: 0,
          totalPrice: 0,
        },
        {
          id: 'ethereum',
          logo: 'ethereum-logo',
          name: 'ETH | Ethereum',
          amount: 0,
          totalPrice: 0,
        },
      ],

      bitcoinPrice: 0,
      ethereumPrice: 0,

      btcPercentAmount: 0,
      ethPercentAmount: 0,

      totalPortfolioPrice: 0,
      totalPortfolioAmount: 0,

      clientWidth: window.innerWidth,
    };
  },

  beforeCreate: async function () {
    const portfolioPrices = await getPortfolioData();

    this.bitcoinPrice = portfolioPrices.bitcoin.usd;
    this.ethereumPrice = portfolioPrices.ethereum.usd;
  },

  created: function () {
    const coinsData = localStorage.getItem('coins-data');

    if (coinsData) {
      this.coins = JSON.parse(coinsData);

      for (let i = 0; i < this.coins.length; i++) {
        this.totalPortfolioAmount += parseFloat(this.coins[i].amount);
        this.totalPortfolioPrice += parseFloat(this.coins[i].totalPrice);
      }

      this.coins.forEach((coin) => {
        if (coin.id === 'bitcoin') {
          this.btcPercentAmount =
            (coin.amount / this.totalPortfolioAmount) * 100;
        } else if (coin.id === 'ethereum') {
          this.ethPercentAmount =
            (coin.amount / this.totalPortfolioAmount) * 100;
        } else return;
      });
    }
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

  beforeUpdate: function () {
    this.coins.forEach((coin) => {
      if (coin.id === 'bitcoin') {
        coin.totalPrice = coin.amount * this.bitcoinPrice;
      } else if (coin.id === 'ethereum') {
        coin.totalPrice = coin.amount * this.ethereumPrice;
      } else return;

      coin.totalPrice > 1
        ? (coin.totalPrice = coin.totalPrice.toFixed(4))
        : (coin.totalPrice = coin.totalPrice.toPrecision(4));
    });

    this.totalPortfolioPrice = 0;

    for (let i = 0; i < this.coins.length; i++) {
      this.totalPortfolioPrice += parseFloat(this.coins[i].totalPrice);
    }
  },

  updated: function () {
    this.totalPortfolioAmount = 0;

    for (let i = 0; i < this.coins.length; i++) {
      this.totalPortfolioAmount += parseFloat(this.coins[i].amount);
    }

    this.coins.forEach((coin) => {
      if (coin.id === 'bitcoin') {
        this.btcPercentAmount = (coin.amount / this.totalPortfolioAmount) * 100;
      } else if (coin.id === 'ethereum') {
        this.ethPercentAmount = (coin.amount / this.totalPortfolioAmount) * 100;
      } else return;
    });

    localStorage.setItem('coins-data', JSON.stringify(this.coins));
  },

  methods: {
    addFixedAmount(fixedAmount, coin) {
      coin.amount += fixedAmount;
    },

    addCustomAmount(coin) {
      const customAmount = parseFloat(prompt('Enter custom amount:'));

      if (isNaN(customAmount)) {
        return;
      }

      coin.amount += customAmount;
    },

    substractFixedAmount(fixedAmount, coin) {
      if (!(coin.amount - fixedAmount < 0)) {
        coin.amount -= fixedAmount;
      } else {
        coin.amount = 0;
      }
    },

    substractCustomAmount(coin) {
      const customAmount = parseFloat(prompt('Enter custom amount:'));

      if (isNaN(customAmount)) {
        return;
      }

      if (!(coin.amount - customAmount < 0)) {
        coin.amount -= customAmount;
      } else {
        coin.amount = 0;
      }
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
};
</script>
