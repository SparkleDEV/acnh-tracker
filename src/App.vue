<template>
	<router-view />
</template>

<style lang="scss">
@use '@/assets/scss/util' as *;

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

body {
	background-image: url('@/assets/images/background.png');
	background-repeat: repeat-x;
	background-size: 100%;
	background-attachment: fixed;
}

/* -=[Global Styles]=- */
select {
	margin-left: rem-calc(8);
	padding: rem-calc(4);
	border-radius: 5px;
	border-color: $gray;
}
</style>
