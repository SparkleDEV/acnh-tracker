<template>
	<SidelinkList />
	<router-view />
</template>

<script>
import SidelinkList from './components/Sidelinks/SidelinkList.vue'
export default {
	components: { SidelinkList }
}
</script>

<style lang="scss">
@use '@/assets/scss/util' as *;
@import '@/assets/scss/globals';

#app {
	font-family: $font-family__roboto, Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: $black;
}
</style>
