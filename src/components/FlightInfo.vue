<template>
<tr>
    <!-- <td id='info'>Info: {{ infoFlight }}</td> -->
    <td>{{ infoFlight.cityFrom }}</td>
    <td>{{ infoFlight.cityTo }}</td>
    <td>{{ infoFlight.price }}</td>
    <td>{{ infoFlight.nightsInDest }}</td>
    <td>{{ secToDate(infoFlight.route[0].dTime) }}</td>
    <td>{{ secToDate(infoFlight.route[1].dTime) }}</td>
    <td><a v-bind:href="infoFlight.deep_link" target="_blank">Price</a></td>
</tr>
</template>

<script>
export default {
  props: {
    infoFlight: [Object]
  },

	components: {},
	
	methods: {
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
