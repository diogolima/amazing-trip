<template>
	<div>
		<div id="flight-search">
			<app-flight-search :infoSearch="infoSearch" @updateSearch="infoSearch = $event"></app-flight-search>
		</div>
		<b-select v-model="perPage" :disabled="!isPaginated">
			<option value="5">5 per page</option>
			<option value="10">10 per page</option>
			<option value="20">20 per page</option>
			<option value="50">50 per page</option>
		</b-select>
		<b-table :data="data"
		:loading="isLoading"
		:hoverable="isHoverable"
		:paginated="isPaginated"
		:per-page="perPage"
		:pagination-simple="isPaginationSimple"
		:sort-icon="sortIcon"
		@sort="onSort"
		:total="total">
			<template slot-scope="props">
				<b-table-column :sortable="true" field="cityFrom" label="City From">
					{{ props.row.cityFrom }}
				</b-table-column>
				<b-table-column :sortable="true" field="cityTo" label="City To">
					{{ props.row.cityTo }}
				</b-table-column>
				<b-table-column :sortable="true" field="price" label="Price">
					{{ props.row.price }}
				</b-table-column>
				<b-table-column :sortable="true" field="dateFrom" label="Date From">
					{{ findDate(props.row.cityCodeFrom, props.row.route) }}
				</b-table-column>
				<b-table-column :sortable="true" field="dateTo" label="Date to">
					{{ findDate(props.row.cityCodeTo, props.row.route) }}
				</b-table-column>
				<b-table-column field="priceLink" label="Link">
					<a v-bind:href="props.row.deep_link" target="_blank">Price</a>
				</b-table-column>
			</template>
		</b-table>	
	</div>
</template>

<script>
import axios from "axios";
import FlightSearch from "./FlightSearch.vue";
import errorHandler from '../mixins/errorHandler'
import { eventBus } from "../main.js";

const prefixUrlPath = "https://api.skypicker.com/flights?flyFrom=";
const flyOnWeekend = "flyDays=5&flyDaysType=departure&returnFlyDays=0&returnFlyDaysType=arrival";
const dateFromPathHelper = "&dateFrom=";
const dateToPathHelper = "&dateTo=";

export default {
	mixins: [errorHandler],
	components: {
		'app-flight-search': FlightSearch
	},
	
	data: () => {
		return {
			data: [],
			isHoverable: true,
			isLoading: false,
			isPaginated: true,
			isPaginationSimple: false,
			total: 0,
      currentPage: 1,
			perPage: 10,
			sortOrder: 'desc',
			sortIcon: 'chevron-up',	
			infoSearch: {
				flyFrom: "BER",
				flyTo: "",
				flyOn: "Weekend",
				daysDestinationFrom: 2,
				daysDestinationTo: 3,
				dateFrom: new Date(),
				dateTo: new Date(),
				rangeDates: [new Date(), new Date()],
				budget: 100
			},
			apiUrl: ""
		}
	},

	methods: {
		buildRequestUrl(infoSearch){
			const dateFromString = this.dateToString(infoSearch.dateFrom);
			const dateToString = this.dateToString(infoSearch.dateTo);
			const dateFromPath = this.buildDatePath(dateFromString, dateFromPathHelper)
			const dateToPath = this.buildDatePath(dateToString, dateToPathHelper)
			const flyOnPath = infoSearch.flyOn === "Weekend" ? flyOnWeekend : ""
			const destinationDays = `daysInDestinationFrom=${infoSearch.daysDestinationFrom}&daysInDestinationTo=${infoSearch.daysDestinationTo}`;
			const flyTo = infoSearch.flyTo === "" ? "" : `&to=${infoSearch.flyTo}`;

			return `${prefixUrlPath}${infoSearch.flyFrom}${flyTo}${dateFromPath}${dateToPath}&partner=picky&v=3&${destinationDays}&${flyOnPath}&price_to=${infoSearch.budget}`;
		},
		dateToString(date){
			if (date === "") return ""

			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return (day + '/' + month + '/' + year)		
		},
		buildDatePath(date, pathHelper){
			return date === "" ? "" : pathHelper + date
		},
		findDate(cityCode, route) {
			const legFlight = route.filter(function(route)	{ return route[`cityCodeFrom`] === cityCode } )[0];
			return (legFlight !== undefined) ? this.secToDate(legFlight.dTime) : "";
		},
		secToDate(second) {
			var t = new Date(1970, 0, 1); // Epoch
			t.setSeconds(second);
			return t.toString("hh:mm tt DD MM YYYY");
		},
		onSort(field, order) {
      this.sortBy = field
      this.sortOrder = order
    },
	},

	mounted() {
		eventBus.$on('updateSearch', infoSearch => {
			try {
				this.data = []
				this.isLoading = true
				this.apiUrl = this.buildRequestUrl(infoSearch);
				axios.get(this.apiUrl)
					.then(response => {
						this.data = response.data.data.filter(flight => this.findDate(flight.cityCodeTo, flight.route) !== "");
						this.isLoading = false
					}
				);
			} catch (error) {
        this.data = []
        this.handleError(error)
			} 
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#flight-lists{
	padding-top: 15px;
}s
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
th {
	width: 15%;
}
thead {
	width: 100%;
}
</style>
