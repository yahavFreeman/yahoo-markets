<template>
  <div class="main-filter flex">
    <p>Filter by:</p>
    <div class="mobile-container flex">
      <input
        @input="filter"
        type="text"
        placeholder="Name"
        v-model="filterBy.name"
      />
      <input
        class="price-input"
        @input="filter"
        type="number"
        placeholder="Up To Price"
        v-model="filterBy.price"
      />
    </div>
    <div class="mobile-container flex">
      <input
        @input="filter"
        type="number"
        placeholder="Max Change"
        v-model="filterBy.change"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        name: "",
        price: null,
        // maxPrice:null
        change: null,
      },
      debouncer: null,
    };
  },
  methods: {
    async filter() {
      //debouncing for smooth typing and filtering
      clearTimeout(this.debouncer);
      this.debouncer = setTimeout(() => {
        this.$emit("filter", { ...this.filterBy });
      }, 700);
    },
  },
};
</script>
