<template>
	<div class="gachilights">
		<div />
	</div>
</template>

<style lang="scss" scoped>
.gachilights {
	left: 0;
	pointer-events: none;
	z-index: 1;
	height: 0;

	position: fixed;
	top: 1.5em;
	width: 100vw;

	> div {
		height: 16em;
		background-image: url("@img/lights.webp");
		background-repeat: repeat-x;
	}
}
</style>
