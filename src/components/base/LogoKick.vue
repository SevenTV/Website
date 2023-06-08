<template>
	<svg v-if="full" width="3.11em" height="1em" viewBox="0 0 933 300" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
		<g clip-path="url(#clip0_3397_160576)">
			<g clip-path="url(#clip1_3397_160576)">
				<path
					fill-rule="evenodd" clip-rule="evenodd"
					d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z"
					 />
			</g>
		</g>
		<defs>
			<clipPath id="clip0_3397_160576">
				<rect width="933" height="300" fill="white" />
			</clipPath>
			<clipPath id="clip1_3397_160576">
				<rect width="933.333" height="300" fill="white" />
			</clipPath>
		</defs>
	</svg>

	<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1539.02 1539.02" width="1em" height="1em">
		<rect width="1539.02" height="1539.02" />
		<polygon
			fill="#53fc19" fill-rule="evenodd"
			points="278.26 216.86 646.7 216.86 646.7 462.48 769.51 462.48 769.51 339.67 892.32 339.67 892.32 216.86 1260.75 216.86 1260.75 585.29 1137.94 585.29 1137.94 708.1 1015.13 708.1 1015.13 830.91 1137.94 830.91 1137.94 953.72 1260.75 953.72 1260.75 1322.16 892.32 1322.16 892.32 1199.35 769.51 1199.35 769.51 1076.54 646.7 1076.54 646.7 1322.16 278.26 1322.16 278.26 216.86" />
	</svg>
</template>

<script setup lang="ts">
defineProps<{
	full?: boolean;
}>();
</script>
