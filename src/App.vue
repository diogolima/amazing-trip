<template>
	<div id="app">
		<div id="head-container"><app-header></app-header></div>
		<app-flight-list></app-flight-list>
	</div>
</template>

<script>
import FlightList from './components/FlightList.vue';
import Header from "./components/Header.vue";

export default {
	components: {
		'app-header': Header,
		'app-flight-list': FlightList
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	width: 100%;
	height: 700px;
	padding: 0 20% 0 20%;
}

#head-container {
	width:	100%
}
</style>
