<template>
	<div class="gachilights">
		<div />
	</div>
</template>

<style lang="scss" scoped>
.gachilights {
	position: absolute;
	top: 1em;
	pointer-events: none;
	z-index: 1;
	width: 100%;
	height: 0;

	> div {
		height: 16em;
		background-image: url("@img/lights.webp");
		background-repeat: repeat-x;
	}
}
</style>
