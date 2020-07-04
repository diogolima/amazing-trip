<template>
<div>
  <section>
    <div class="searchInfo"> 
      <b-field class="info-space main-info-space" label="City From">
            <b-autocomplete
                v-model="flyFrom"
                size="is-small"
                :data="filteredDataFromCity"
                placeholder="e.g. Berlin (TXL)"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
        <b-field class="info-space main-info-space" label="City To">
            <b-autocomplete
                v-model="flyTo"
                size="is-small"
                :data="filteredDataToCity"
                placeholder="e.g. Berlin (TXL)"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template slot="empty">No results found</template>
            </b-autocomplete>
        </b-field>
      <b-field class="info-space main-info-space" label="Range of dates" type="is-dark">
        <b-datepicker 
          v-model="infoSearch.rangeDates"
          placeholder="Click to select..."
          icon="calendar-today"
          trap-focus
          size="is-small"
          :min-date="minDate"
          :mobile-native=false
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
        <b-numberinput min="1" type="is-dark" controls-position="compact" size="is-small" v-model="infoSearch.budget"></b-numberinput>
      </b-field>
      <b-field id="weekend" class="info-space side-info-space">
        <b-radio-button v-model="infoSearch.flyOn"
            native-value="Weekend"
            type="is-dark"
            size="is-small">
            Weekend
        </b-radio-button>
        <b-radio-button v-model="infoSearch.flyOn"
              native-value="AllDays"
              type="is-dark"
              size="is-small">
              All days
        </b-radio-button>
      </b-field>
      <b-field class="btn-position info-space"
      type="is-dark">
        <b-select v-model="infoSearch.perPage" :disabled="!infoSearch.isPaginated">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </b-select>
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

export default {
  props: {
    infoSearch: {  
      type: Object
    }
  },

  data: () => {
    const today = new Date()
    return {
      flyTo: "",
      flyFrom: "",
      dataToList: [],
      dataFromList: [],
      minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    }
  },
  
  computed: {
    filteredDataToCity() {
      return this.dataToList.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.flyTo.toLowerCase()) >= 0
      })
    },
    filteredDataFromCity() {
      return this.dataFromList.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.flyFrom.toLowerCase()) >= 0
      })
    }
  },

  methods: {
    searchFlights() {
      this.updateDataSearch();
      eventBus.$emit("updateSearch", this.infoSearch);
    },

    updateDataSearch() {
      this.infoSearch.flyFrom  = this.flyFrom.split("(").pop().split(")")[0];
      this.infoSearch.flyTo    = this.flyTo.split("(").pop().split(")")[0];
      this.infoSearch.dateFrom = this.infoSearch.rangeDates[0];
      this.infoSearch.dateTo   = this.infoSearch.rangeDates[1];
    }
  },

  mounted() {
    const iataDataComplete = require("../assets/iata.json");

    let airportsData = iataDataComplete
      .filter((airport) => airport.IATA !== "\\N" && airport.City !== "")
      .map(airport => {
        return `${airport.City} (${airport.IATA})`
      });
      

    this.dataToList = airportsData;
    this.dataFromList = airportsData;
    this.flyTo = this.infoSearch.flyTo
    this.flyFrom = this.infoSearch.flyFrom
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
#weekend {
  align-self: flex-end;
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
.select:not(.is-multiple):not(.is-loading)::after{
  background-color: red !important;
}

</style>
