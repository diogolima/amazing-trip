<template>
	<div>
		<div id="flight-search">
			<app-flight-search :infoSearch="infoSearch" @updateSearch="infoSearch = $event"></app-flight-search>
		</div>
		<b-table :data="data">
			<template slot-scope="props">
				<b-table-column field="cityFrom" label="City From">
					{{ props.row.cityFrom }}
				</b-table-column>
				<b-table-column field="cityTo" label="City To">
					{{ props.row.cityTo }}
				</b-table-column>
				<b-table-column field="price" label="Price">
					{{ props.row.price }}
				</b-table-column>
				<b-table-column field="dateFrom" label="Date From">
					{{ findDate(props.row.cityCodeFrom, "From", props.row.route) }}
				</b-table-column>
				<b-table-column field="dateTo" label="Date to">
					{{findDate(props.row.cityCodeTo, "To", props.row.route) }}
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
// const stayInDestinationUrlHelper = "daysInDestinationFrom=2&daysInDestinationTo=3";
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
			infoSearch: {
				flyFrom: "BER",
				flyTo: "",
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

			const destinationDays = `daysInDestinationFrom=${infoSearch.daysDestinationFrom}&daysInDestinationTo=${infoSearch.daysDestinationTo}`;
			const flyTo = infoSearch.flyTo === "" ? "" : `&to=${infoSearch.flyTo}`;

			return `${prefixUrlPath}${infoSearch.flyFrom}${flyTo}${dateFromPath}${dateToPath}&partner=picky&v=3&${destinationDays}&${flyOnWeekend}&price_to=${infoSearch.budget}`;
		},
		dateToString(date){
			if (date === "") return ""

			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			return (day + '/' + month + '/' + year)		
		},
		buildDatePath(date, pathHelper){
			if (date === "") return ""

			return pathHelper + date
		},
		findDate(cityCode, destination, route) {
			const legFlight = route.filter(function(route)	{ return route[`cityCodeFrom`] === cityCode } )[0];
			return (legFlight !== undefined) ? this.secToDate(legFlight.dTime) : "";
		},
		secToDate(second) {
			var t = new Date(1970, 0, 1); // Epoch
			t.setSeconds(second);
			return t.toString("hh:mm tt DD MM YYYY");
		}
	},

	created() {
		eventBus.$on('updateSearch', infoSearch => {
			this.isLoading = true
			try {
				console.log('here')
				console.log(infoSearch)
			this.apiUrl = this.buildRequestUrl(infoSearch);
			axios.get(this.apiUrl)
				.then(response => {
					this.data = response.data.data
				});
			} catch (error) {
        this.data = []
        this.handleError(error)
      } finally {
        this.isLoading = false
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
