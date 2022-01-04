<template>
  <div class="market-list">
    <h1>Markets</h1>
    <!-- letting the viewer know to which date the data refers to -->
    <h4>{{ new Date().toDateString() }}</h4>
    <div v-show="isLoading">Loading Markets...</div>
    <ul v-show="!isLoading" class="market-grid">
      <li v-for="market in markets" :key="market.firstExchangeDate">
        <market-preview :market="market" />
      </li>
    </ul>
  </div>
</template>

<script>
import marketPreview from "@/cmps/market-preview";
import MarketFilter from "@/cmps/market-filter";
export default {
  props: {
    markets: Array,
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  components: {
    marketPreview,
    MarketFilter,
  },
};
</script>
