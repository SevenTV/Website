import { reactive } from "vue";

/**
 * Calculate how many rows and columns according to the container's size
 *
 * @returns the result of rows * columns
 */
export function useSizedRows(sizes: [number, number] = [128, 160]) {
	function update(el: HTMLElement) {
		if (!el) return r;

		const isSmall = window.innerWidth <= 650;

		const marginBuffer = 16; // The margin _in pixels between each card
		const cardSize = isSmall ? sizes[0] : sizes[1]; // The size of the cards in pixels
		const width = el.clientWidth; // The width of emotes container
		const height = el.clientHeight; // The height of the emotes container

		const rows = Math.floor(width / (cardSize + marginBuffer)); // The calculated amount of rows
		const columns = Math.min(Math.floor(height / (cardSize + marginBuffer)), 5); // The calculated amount of columns

		// Return the result of rows multiplied by columns
		r.rows = rows;
		r.columns = columns;
		r.sum = Math.max(1, rows * columns);

		return r;
	}

	const r = reactive({
		sum: 0,
		rows: 0,
		columns: 0,
		update,
	});

	return r;
}
