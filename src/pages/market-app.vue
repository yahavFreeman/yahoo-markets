<template>
  <div class="main-layout" v-if="markets">
    <market-filter @filter="setFilter" />
    <market-list :markets="markets" />
  </div>
</template>

<script>
import marketList from "@/cmps/market-list";
import marketFilter from "@/cmps/market-filter";
export default {
  data() {
    return {
      refresh: null,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadMarkets" });
    // this.refresh = setInterval(async () => {
    //   await this.$store.dispatch({ type: "loadMarkets" });
    // }, 1000 * 90);
    //refreshing the markets every one and a half minutes. since this is app is dealing with stocks, it is crucial to keep the viewer updated constantly.
  },
  destroyed() {
    clearInterval(this.refresh);
  },
  methods: {
    async setFilter(filterBy) {
      await this.$store.dispatch({ type: "setFilter", filterBy });
    },
  },
  computed: {
    markets() {
      return this.$store.getters.marketsToShow;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  components: {
    marketList,
    marketFilter,
  },
};
</script>
