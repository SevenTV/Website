<template>
	<svg id="Badge" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="1em">
		<defs v-if="Array.isArray(gradient) && gradient.length">
			<linearGradient :id="`BadgeGradient-${instID}`" :gradientTransform="'rotate(' + angle + ')'">
				<stop
					v-for="(stop, index) in gradient"
					:key="index"
					:offset="(stop.offset * 100).toString(10) + '%'"
					:stop-color="stop.color"
				/>
			</linearGradient>
		</defs>

		<g id="Background">
			<rect :fill="gradient ? `url(#BadgeGradient-${instID})` : background" width="300" height="300" rx="33.22" />
		</g>
		<g id="Border">
			<path
				:fill="border"
				d="M266.78,17A16.24,16.24,0,0,1,283,33.22V266.78A16.24,16.24,0,0,1,266.78,283H33.22A16.24,16.24,0,0,1,17,266.78V33.22A16.24,16.24,0,0,1,33.22,17H266.78m0-17H33.22A33.22,33.22,0,0,0,0,33.22V266.78A33.22,33.22,0,0,0,33.22,300H266.78A33.22,33.22,0,0,0,300,266.78V33.22A33.22,33.22,0,0,0,266.78,0Z"
			/>
		</g>
		<g id="Logo">
			<path
				:fill="logo"
				d="M211.19,113.56l10.36-18L227.14,86,216.78,68v-.41H161.45l10.36,18,10.36,18,5.81,10h23.21"
			/>
			<path
				:fill="logo"
				d="M97,234.58l10.36-18,10.36-18,10.36-18,10.37-18,10.36-18,10.36-18,7.67-13.26-10.37-18-10.36-18-5.8-9.32H52.85l-10.36,18L36.9,95.32l10.36,18v.41h66.32l-10.37,18-10.36,18-10.36,18-10.36,18-10.36,18-7.26,12.85,10.36,18v.42H97"
			/>
			<path
				:fill="logo"
				class="cls-3"
				d="M183.62,234.58h31.71l10.36-18,10.37-18,10.36-18,10.36-18L264,150l-10.36-18v-.41H221.76l-10.37,18-10.36,18-1.45,2.69-10.36-18-10.36-18-1.45-2.69-10.37,18-10.36,18-5.8,9.94,10.36,18,10.36,18,10.37,18,1.65,2.9"
			/>
		</g>
	</svg>
</template>

<script setup lang="ts">
const instID = Math.random().toString(36).substring(7);

const props = defineProps<{
	logo: string;
	border: string;
	background?: string;
	gradientAngle?: number;
	gradient?: {
		color: string;
		offset: number;
	}[];
}>();

const angle = props.gradientAngle ?? 0;
</script>
