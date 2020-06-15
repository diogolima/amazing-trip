<template>
<div>
  <section>
    <div class="searchInfo"> 
      <!-- <b-field class="info-space main-info-space" label="City From">
        <b-input size="is-small" v-model="infoSearch.flyFrom" type="text"></b-input>
      </b-field> -->
      <b-field class="info-space main-info-space" label="City From">
            <b-autocomplete
                v-model="infoSearch.flyFrom"
                size="is-small"
                :data="filteredDataFromCity"
                placeholder="e.g. Berlin"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
        <b-field class="info-space main-info-space" label="City To">
            <b-autocomplete
                v-model="infoSearch.flyTo"
                size="is-small"
                :data="filteredDataToCity"
                placeholder="e.g. Berlin"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
      <!-- <b-field class="info-space main-info-space" label="City To">
        <b-input size="is-small" v-model="infoSearch.flyTo" type="text" placeholder="Optional"></b-input>
      </b-field> -->
      <b-field class="info-space main-info-space" label="Range of dates">
        <b-datepicker 
          v-model="infoSearch.rangeDates"
          placeholder="Click to select..."
          icon="calendar-today"
          trap-focus
          size="is-small"
          :min-date="minDate"
          range>
        </b-datepicker>
      </b-field>
    </div>
    <div class="searchInfo"> 
      <b-field class="info-space side-info-space" label="Min days">
        <b-numberinput min="1" type="is-dark" controls-position="compact" size="is-small" v-model="infoSearch.daysDestinationFrom"></b-numberinput>
      </b-field>
      <b-field class="info-space side-info-space" label="Max days">
        <b-numberinput min="1" type="is-dark" controls-position="compact" size="is-small" v-model="infoSearch.daysDestinationTo"></b-numberinput >
      </b-field>
      <b-field class="info-space side-info-space" label="Budget">
        <b-numberinput step="50" type="is-dark" controls-position="compact" size="is-small" v-model="infoSearch.budget"></b-numberinput>
      </b-field>
      <b-field class="btn-position info-space">
        <b-button @click="searchFlights">Search</b-button>
      </b-field>
    </div>
    
  </section>
</div>
</template>

<script>
import { eventBus } from '../main.js';
// import axios from "axios";

export default {
  props: {
    infoSearch: {  
      type: Object
    }
  },

  data: () => {
    const today = new Date()
    return {
      dataTo: [],
      dataFrom: [],
      airportData: [],
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    }
  },
  
  computed: {
    filteredDataToCity() {
      return this.dataTo.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.infoSearch.flyTo.toLowerCase()) >= 0
      })
    },
    filteredDataFromCity() {
      return this.dataFrom.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.infoSearch.flyFrom.toLowerCase()) >= 0
      })
    }
  },

  methods: {
    searchFlights() {
      this.updateDataSearch();
      eventBus.$emit("updateSearch", this.infoSearch);
    },

    updateDataSearch() {
      this.infoSearch.flyFrom = this.infoSearch.flyFrom.split("(").pop().split(")")[0];
      this.infoSearch.flyTo = this.infoSearch.flyTo.split("(").pop().split(")")[0];
      this.infoSearch.dateFrom = this.infoSearch.rangeDates[0];
      this.infoSearch.dateTo = this.infoSearch.rangeDates[1];
    }
  },

  mounted() {
    const iataDataComplete = require("../assets/iata.json");

    let airportData = iataDataComplete
      .filter((el) => el.IATA !== "\\N" || el.City !== "")
      .map(iata => {
         return {
            city: iata.City,
            iata: iata.IATA
          }
      })

    const iataData = airportData
      .map(iata => {
        const iataCode = iata.iata !== "\\N" ? `(${iata.iata})` : "" 
        return `${iata.city} ${iataCode}`
      })

    // this.airportData = airportData;
    this.dataFrom = iataData;
    this.dataTo = iataData;
  }
}
</script>

<style scoped>
.searchInfo {
    width: 100%;
    display: inline-flex;
}
.info-space {
  margin-left: 15px;
}
.main-info-space {
  width: 33%; 
}
.side-info-space {
  margin-left: 15px;
  width: 15%; 
}
.btn-position {
  margin-inline-start: auto;
  align-self: center;
  padding-top: 11px;
}
.btn-position button{
  background-color: #397c4f;
  color: white;
}

</style>
