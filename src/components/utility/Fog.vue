<template>
	<div id="fog1" class="fog">
		<div class="image01"></div>
		<div class="image02"></div>
	</div>
	<div id="fog2" class="fog">
		<div class="image01"></div>
		<div class="image02"></div>
	</div>
	<div id="fog3" class="fog">
		<div class="image01"></div>
		<div class="image02"></div>
	</div>
</template>

<style scoped lang="scss">
/* ---------- Fog ---------- */
.fogwrapper {
	height: 100%;
	position: absolute;
	top: 0;
	width: 100%;
	-webkit-filter: blur(1px) grayscale(0.2) saturate(1.2) sepia(0.2);
	filter: blur(1px) grayscale(0.2) saturate(1.2) sepia(0.2);
}
#fog1,
#fog2,
#fog3 {
	height: 100%;
	position: absolute;
	width: 200%;
}
#fog1 .image01,
#fog1 .image02,
#fog2 .image01,
#fog2 .image02,
#fog3 .image01,
#fog3 .image02 {
	float: left;
	height: 100%;
	width: 50%;
}
#fog1 {
	transform: translateZ(0);
	animation: fog1opacity 10s linear infinite, fogMove 45s linear infinite;
}
#fog2,
#fog3 {
	transform: translateZ(0);
	animation: fog2opacity 21s linear infinite, fogMove 30s linear infinite;
}

.fog > div {
	background: url("https://cdn.7tv.app/misc/fog.webp") center center/cover no-repeat transparent;
}

@keyframes fog1opacity {
	0% {
		opacity: 0.1;
	}
	22% {
		opacity: 0.5;
	}
	40% {
		opacity: 0.28;
	}
	58% {
		opacity: 0.4;
	}
	80% {
		opacity: 0.16;
	}
	100% {
		opacity: 0.1;
	}
}

@keyframes fog2opacity {
	0% {
		opacity: 0.5;
	}
	25% {
		opacity: 0.2;
	}
	50% {
		opacity: 0.1;
	}
	80% {
		opacity: 0.3;
	}
	100% {
		opacity: 0.5;
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

@media only screen and (min-width: 280px) and (max-width: 767px) {
	#fog1 .image01,
	#fog1 .image02,
	#fog2 .image01,
	#fog2 .image02,
	#fog3 .image01,
	#fog3 .image02 {
		width: 100%;
	}
}
</style>
