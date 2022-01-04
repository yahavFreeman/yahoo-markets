import { marketService } from "../services/market.service.js";
export const marketStore = {
  state: {
    markets: [],
    filterBy: {
      name: "",
      price: null,
      change: null,
    },
    isLoading: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },

    marketsToShow(state) {
      var markets = state.markets;
      var filterBy = state.filterBy;
      if (filterBy.name) {
        filterBy.name = filterBy.name.toLowerCase();
        markets = markets.filter((market) => {
          if (market.shortName) {
            return market.shortName.toLowerCase().includes(filterBy.name);
          } else {
            return market.market.toLowerCase().includes(filterBy.name);
          }
        });
      }
      if (filterBy.price) {
        markets = markets.filter((market) => {
          return market.regularMarketPrice.raw < Number(filterBy.price);
        });
      }
      if (filterBy.change) {
        markets = markets.filter((market) => {
          return market.regularMarketChange.raw < Number(filterBy.change);
        });
      }
      return markets;
    },
  },
  mutations: {
    setMarkets(state, { markets }) {
      state.markets = markets;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setLoading(state, { loading }) {
      state.isLoading = loading;
    },
  },
  actions: {
    async loadMarkets({ commit, state }) {
      const filterBy = state.filterBy;
      const loading = true;
      commit({ type: "setLoading", loading });
      const markets = await marketService.query(filterBy); //await for the axios.get promise response sending the filterBy for pre-backend use
      try {
        commit({ type: "setMarkets", markets });
        const loading = false;
        commit({ type: "setLoading", loading });
      } catch (err) {
        console.log(err);
      }
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: "setFilter", filterBy });
      dispatch({ type: "loadMarkets" });
    },
  },
};
