export interface Role {
	id: string;
	name: string;
	color: number;
	allowed: bigint;
	denied: bigint;
	position: number;
}
