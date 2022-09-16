<template>
	<button class="unstyled">
		<slot />
	</button>
</template>

<script lang="ts" setup></script>

<style lang="scss">
/* See https://github.com/necolas/normalize.css/blob/fc091cce1534909334c1911709a39c22d406977b/normalize.css#L155-L223 */
button.unstyled {
	/* Change the font styles in all browsers. */
	font-family: inherit;
	font-size: 100%;
	line-height: 1.15;

	/* Remove the margin in Firefox and Safari. */
	margin: 0;

	/* Show the overflow in IE. */
	overflow: visible;

	/* Remove the inheritance of text transform in Edge, Firefox, and IE. */
	text-transform: none;

	/* Correct the inability to style clickable types in iOS and Safari. */
	-webkit-appearance: button;

	/* Remove border */
	border: none;

	/* Show pointer on hover */
	cursor: pointer;

	/* Use same color and text-align as parent */
	color: inherit;
	text-align: inherit;
}

button.unstyled::-moz-focus-inner {
	/* Remove the inner border and padding in Firefox. */
	border-style: none;
	padding: 0;
}

button.unstyled:-moz-focusring {
	/* Restore the focus styles unset by the previous rule. */
	outline: 1px dotted ButtonText;
}
</style>
