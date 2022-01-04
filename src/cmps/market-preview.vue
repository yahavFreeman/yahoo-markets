<template>
  <div>
    <div @click="toggleInfo">
      <div v-for="preview in marketPreviews" :key="preview.title">
        <p>
          <span>{{ preview.title }}</span> {{ preview.text }}
        </p>
      </div>
      <p>
        <span>Change:</span>
        <span
          class="change"
          :style="[
            isMinus ? { color: 'rgb(255, 56, 92)' } : { color: 'rgb(2 193 2)' },
          ]"
        >
          {{ market.regularMarketChange.fmt }} ({{
            market.regularMarketChangePercent.fmt
          }}) <span v-if="!isMinus">▲</span> <span v-if="isMinus">▼</span>
        </span>
      </p>
    </div>

    <div
      @click.stop="toggleInfo"
      class="modal-container"
      :class="{ open: isInfoOpen }"
    >
      <div @click="toggleInfo" class="modal" :class="{ open: isInfoOpen }">
        <div v-for="detail in marketDetails" :key="detail.title">
          <p>
            <span>{{ detail.title }}</span> {{ detail.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    market: Object,
  },
  data() {
    return {
      isInfoOpen: false,
      offset: "",
    };
  },
  created() {
    this.getOffset();
  },
  methods: {
    toggleInfo() {
      this.isInfoOpen = !this.isInfoOpen;
    },
    getOffset() {
      //creating a string for the GMT offset
      if (this.market.gmtOffSetMilliseconds) {
        var hours = Math.floor(
          this.market.gmtOffSetMilliseconds / 1000 / 60 / 60
        );
        const minutes = Math.floor(
          (this.market.gmtOffSetMilliseconds - hours * 1000 * 60 * 60) /
            1000 /
            60
        );
        const seconds = Math.floor(
          (this.market.gmtOffSetMilliseconds -
            hours * 1000 * 60 * 60 -
            minutes * 1000 * 60) /
            1000
        );
        if (hours < 10) {
          if (hours < 0) {
            hours = "-0" + Math.abs(hours);
          } else {
            hours = "+0" + Math.abs(hours);
          }
        }
        this.offset = `${hours}:${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
      } else {
        this.offset = 0;
      }
    },
  },
  computed: {
    isMinus() {
      return this.market.regularMarketChange.fmt.includes("-") ? true : false;
    },
    marketPreviews() {
      //creating an array of objects to render as v-for in the preview section
      return [
        {
          title: "Market Name:",
          text: this.market.shortName || this.market.market,
        },
        {
          title: "Market Time:",
          text: this.market.regularMarketTime.fmt,
        },
        {
          title: "Market Price:",
          text: this.market.regularMarketPrice.fmt,
        },
        {
          title: "Previous Close:",
          text: this.market.regularMarketPreviousClose.fmt,
        },
      ];
    },
    marketDetails() {
      //creating an array of objects to render as v-for in the details section
      return [
        {
          title: "Market Name:",
          text: this.market.shortName + ", " + this.market.market,
        },
        {
          title: "Market Time:",
          text: this.market.regularMarketTime.fmt,
        },
        {
          title: "Full Exchange Name:",
          text: this.market.fullExchangeName,
        },
        {
          title: "Exchange:",
          text: this.market.exchange,
        },
        {
          title: "Market Price:",
          text: this.market.regularMarketPrice.fmt,
        },
        {
          title: "Previous Close:",
          text: this.market.regularMarketPreviousClose.fmt,
        },
        {
          title: "Market Change:",
          text: this.market.regularMarketChange.fmt,
        },
        {
          title: "Market Change Percent:",
          text: this.market.regularMarketChangePercent.fmt,
        },
        {
          title: "First Trade Date:",
          text: new Date(this.market.firstTradeDateMilliseconds).toDateString(),
        },
        {
          title: "Exchange Timezone:",
          text:
            this.market.exchangeTimezoneName +
            ", " +
            this.market.exchangeTimezoneShortName,
        },
        {
          title: "GMT offset:",
          text: this.offset,
        },
        {
          title: "Market region:",
          text: this.market.region,
        },
        {
          title: "Market Language:",
          text: this.market.language,
        },
        {
          title: "Market Quote Type:",
          text: this.market.quoteType,
        },
        {
          title: "Market State:",
          text: this.market.marketState,
        },
        {
          title: "Market Tradeable:",
          text: this.market.tradeable ? "yes" : "no",
        },
        {
          title: "Market Triggreable:",
          text: this.market.triggerable ? "yes" : "no",
        },
      ];
    },
  },
};
</script>
