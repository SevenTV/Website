export interface Paint {
	id: string;
	name: string;
	users: string[];
	function: string;
	color: number | null;
	stops: Paint.Stop[];
	repeat: boolean;
	angle: number;
	shape?: string;
	image_url?: string;
	drop_shadows: Paint.Shadow[];
}
export namespace Paint {
	export interface Stop {
		at: number;
		color: number;
	}

	export interface Shadow {
		x_offset: number;
		y_offset: number;
		radius: number;
		color: number;
	}
}
