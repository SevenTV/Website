<template>
	<div id="fog" class="fog">
		<div class="fog-image"></div>
	</div>
</template>

<style scoped lang="scss">
.fogwrapper {
	transform: translateZ(0);
	height: 100%;
	position: absolute;
	top: 0;
	width: 100%;
	-webkit-filter: blur(1px) grayscale(0.2) saturate(1.2) sepia(0.2);
	filter: blur(1px) grayscale(0.2) saturate(1.2) sepia(0.2);
}

#fog .fog-image {
	transform: translateZ(0);
	float: left;
	height: 100%;
	width: 100%;
}
#fog {
	transform: translateZ(0);
	height: 100%;
	position: absolute;
	width: 200%;
	animation: fogOpacity 10s linear infinite, fogMove 45s linear infinite;
}

.fog > div {
	background: url("https://cdn.7tv.app/misc/fog-256.webp") center center/cover no-repeat transparent;
}

@keyframes fogOpacity {
	0% {
		opacity: 0.75;
	}
	22% {
		opacity: 0.6;
	}
	40% {
		opacity: 0.5;
	}
	58% {
		opacity: 0.68;
	}
	80% {
		opacity: 0.57;
	}
	100% {
		opacity: 0.73;
	}
}

@keyframes fogMove {
	0% {
		left: 0;
	}
	100% {
		left: -100%;
	}
}
</style>
