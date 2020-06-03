<template>
	<div id="app">
		<app-header></app-header>
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
	width: 800px;
	height: 700px;
	padding: 0 20% 0 20%;
}
</style>
