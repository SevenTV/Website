<template>
	<div class="footer-christmas">
		<span class="tiling">
			<!-- <SnowFloor /> -->
		</span>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-christmas {
	position: fixed;
	pointer-events: none;
	bottom: 0;
	width: 100%;
	height: 4vh;
	z-index: 1;

	background-image: url("@/assets/img/snow.svg");
	background-repeat: repeat-x;
	background-size: 9vw;
}
</style>
