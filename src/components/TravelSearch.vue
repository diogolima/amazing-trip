<template>
<div>
  <div id="searchCities">
    <div class="searchInfo"> 
      <div class="date-leg">From</div>
      <input v-model="infoSearch.flyFrom" type="text">
      <div class="date-leg">To</div>
      <input v-model="infoSearch.flyTo" type="text" placeholder="Optional">
      <div class="date-leg">Min</div>
      <input v-model="infoSearch.daysDestinationFrom" type="number"> 
      <div class="date-leg">Max</div>
      <input v-model="infoSearch.daysDestinationTo" type="number">
    </div>
  </div>
  <div id="search">
    <div class="searchInfo"> 
      <div class="date-leg">
        <Datepicker v-model="infoSearch.dateFrom" :value="date" :disabled-dates="disabledDates" format="dd/MM/yyyy"></Datepicker>
      </div>
      <div class="date-leg">
        <Datepicker v-model="infoSearch.dateTo" :value="date" :disabled-dates="disabledDates" format="dd/MM/yyyy"> </Datepicker>
      </div>  
      <div class="date-leg">Budget</div>  
      <input v-model="infoSearch.budget" type="number">
    </div>
    <div class="btn"> 
      <button @click="searchFlights">Search</button>
    </div>
  </div>
</div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { eventBus } from '../main.js';

export default {
  props: {
    infoSearch: {  
      type: Object
    }
  },

  data: () => {
    return {
      date: new Date(),
      disabledDates:  {
        to: new Date()// Disable all dates up to specific date
      }  
    }
  },

  components: {
    Datepicker
  },
  
  methods: {
    searchFlights() {
      eventBus.$emit("updateSearch", this.infoSearch);
    }
  }
}
</script>

<style scoped>
.btn {
  width: 10%;
  display: inline-flex; 
}
  .searchInfo {
    /* width: 45%; */
    display: inline-flex;
  }
/* .searchCities {
  display: flex;
} */

/* .date-leg {
  width: 25%  ;
} */
.vdp-datepicker{
  text-align-last: center;
}

.vdp-datepicker > input {
  width: 30px;
}
</style>