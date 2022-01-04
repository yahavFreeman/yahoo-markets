const axios = require("axios");
export const marketService = {
  query,
};

const MARKET_KEY = "marketDB";

async function query(filterBy = {}) {
  var options = {
    method: "GET",
    url: "https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US",
    params: { modules: "defaultKeyStatistics,assetProfile" },
    headers: {
      "x-api-key": "SzZDIdN7Jhoqul8cbEq62SYuW5lybVZ5PSXodIL6",
    },
  };
  const markets = JSON.parse(sessionStorage.getItem(MARKET_KEY));
  if (markets && markets.length) {
    //   console.log('from sesh',markets);
    _refreshMarkets();
    return markets;
  }
  try {
    const markets = await axios.request(options);
    _refreshMarkets();
    sessionStorage.setItem(
      MARKET_KEY,
      JSON.stringify(markets.data.marketSummaryResponse.result)
    );
    //   console.log(markets.data.marketSummaryResponse.result);
    return markets.data.marketSummaryResponse.result;
  } catch (error) {
    console.error(error);
  }
}
var refresher = null;
function _refreshMarkets() {
  //making sure the data on display is updated constantly
  if (refresher) {
    clearTimeout(refresher);
  }
  refresher = setTimeout(() => {
    // sessionStorage.removeItem(MARKET_KEY)
    // console.log('refreshing Markets');
  }, 1000 * 85);
  //the timeout is in a comment so I wont exceed the request limit of the API calls.
}
