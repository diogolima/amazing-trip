<template>
	<div id="flight">
		<table>
			<thead>
				<th>City from</th>
				<th>City to</th>
				<th>Price</th>
				<th>Days on destination</th>
				<th>Date From</th>
				<th>Date to</th>
				<th>Link</th>
			</thead>
			<tbody>
				<app-flight-info v-for="info in infoFlights" :key="info.id" :infoFlight="info"></app-flight-info>
			</tbody>
		</table>
		<ul></ul>
	</div>
</template>

<script>
import axios from "axios";
import FlightInfo from './FlightInfo.vue';

export default {
	components: {
		'app-flight-info': FlightInfo,
	},
	
	data: () => {
		return {
			infoFlights: []
		}
	},

	methods: {
		secToDate(second) {
			var t = new Date(1970, 0, 1); // Epoch
			t.setSeconds(second);
			return t.toString("hh:mm tt DD MM YYYY");
		}
	},

	mounted() {
		axios
			.get(
				// "https://api.skypicker.com/flights?flyFrom=TXL&to=AMS&dateFrom=18/03/2020&dateTo=12/12/2020&partner=picky&v=3&onlyWeekends=1"
				// "https://api.skypicker.com/flights?flyFrom=TXL&to=AMS&dateFrom=18/03/2020&dateTo=12/12/2020&partner=picky&v=3&daysInDestinationFrom=2&daysInDestinationTo=3&flyDays=4,5&flyDaysType=departure&returnFlyDays=0,1&returnFlyDaysType=arrival"
				"https://api.skypicker.com/flights?flyFrom=TXL&dateFrom=18/04/2020&dateTo=18/06/2020&partner=picky&v=3&daysInDestinationFrom=2&daysInDestinationTo=3&flyDays=5&flyDaysType=departure&returnFlyDays=0&returnFlyDaysType=arrival&price_to=100"
			)
			.then(response => {
				this.infoFlights = response.data.data
			});
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
