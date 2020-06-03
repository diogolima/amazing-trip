<template>
	<div> 
		<!-- bla -->
	</div>
	<!-- <b-table-column :field="Flight">
		{{ infoFlight.cityFrom }}
		{{ infoFlight.cityTo }}
		{{ infoFlight.price }}
		{{ infoFlight.nightsInDest }}
		{{ findDate(infoFlight.cityCodeFrom, "From", infoFlight.route) }}
		{{ findDate(infoFlight.cityCodeTo, "To", infoFlight.route) }}
		<a v-bind:href="infoFlight.deep_link" target="_blank">Price</a>
	</b-table-column> -->
<!-- <tr>
	<td>{{ infoFlight.cityFrom }}</td>
	<td>{{ infoFlight.cityTo }}</td>
	<td>{{ infoFlight.price }}</td>
	<td>{{ infoFlight.nightsInDest }}</td>
	<td> {{ findDate(infoFlight.cityCodeFrom, "From", infoFlight.route) }} </td>
	<td> {{ findDate(infoFlight.cityCodeTo, "To", infoFlight.route) }} </td>
	<td><a v-bind:href="infoFlight.deep_link" target="_blank">Price</a></td>
</tr> -->
</template>

<script>
export default {
  props: {
    infoFlight: [Object]
  },

	components: {},
	
	methods: {
		findDate(cityCode, destination, route) {
			const legFlight = route.filter(function(route)	{ return route[`cityCode${destination}`] === cityCode } )[0];
			return (legFlight !== undefined) ? this.secToDate(legFlight.dTime) : "";
		},
		secToDate(second) {
			var t = new Date(1970, 0, 1); // Epoch
			t.setSeconds(second);
			return t.toString("hh:mm tt DD MM YYYY");
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#info {
  border-color: blue;
}
td{
  color: black;
}
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
