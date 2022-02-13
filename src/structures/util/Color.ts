export const ConvertIntColorToHex = (color: number, alpha?: number) => {
	return `#${color.toString(16)}` + (alpha ? SetHexAlpha(alpha) : "");
};

export const SetHexAlpha = (alpha: number): string => {
	if (alpha > 1 || alpha < 0 || isNaN(alpha)) {
		throw Error("alpha must be between 0 and 1");
	}

	return Math.ceil(255 * alpha)
		.toString(16)
		.toUpperCase();
};

export const ConvertIntToHSVColor = (color: number) => {
	const r = color >> 16;
	const g = (color >> 8) & ((1 << 8) - 1);
	const b = color & ((1 << 8) - 1);
	return ConvertRGBToHSVColor(r, g, b);
};

export const ConvertRGBToHSVColor = (r: number, g: number, b: number) => {
	const rabs = r / 255;
	const gabs = g / 255;
	const babs = b / 255;
	const v = Math.max(rabs, gabs, babs);
	const diff = v - Math.min(rabs, gabs, babs);
	const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
	const percentRoundFn = (num: number) => Math.round(num * 100) / 100;
	let h = 0;
	let s = 0;
	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		const rr = diffc(rabs);
		const gg = diffc(gabs);
		const bb = diffc(babs);

		if (rabs === v) {
			h = bb - gg;
		} else if (gabs === v) {
			h = 1 / 3 + rr - bb;
		} else if (babs === v) {
			h = 2 / 3 + gg - rr;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}
	return {
		h: Math.round(h * 360),
		s: percentRoundFn(s * 100),
		v: percentRoundFn(v * 100),
	};
};

export const hsv2hsl = (h: number, s: number, v: number, l = v - (v * s) / 2, m = Math.min(l, 1 - l)) => [
	h,
	m ? (v - l) / m : 0,
	l,
];

export const hsl2hsv = (h: number, s: number, l: number, v = s * Math.min(l, 1 - l) + l) => [
	h,
	v ? 2 - (2 * l) / v : 0,
	v,
];

export const NormalizeColor = (color: number, loweLight: number, upperLight: number) => {
	const r = color >> 16;
	const g = (color >> 8) & ((1 << 8) - 1);
	const b = color & ((1 << 8) - 1);
	const hsv = ConvertRGBToHSVColor(r, g, b);
	const hsl = hsv2hsl(hsv.h / 360, hsv.s / 100, hsv.v / 100).map((v) => v * 100);
	return `hsl(${hsl[0] * 3.6}deg, ${hsl[1]}%, ${
		hsl[2] < loweLight ? loweLight : hsl[2] > upperLight ? upperLight : hsl[2]
	}%)`;
};
