export const BitField = {
	HasBits(sum: number, bit: number): boolean {
		return (sum & bit) == bit;
	},
	AddBits(sum: number, add: number): number {
		return sum | add;
	},
	RemoveBits(sum: number, remove: number): number {
		return sum & ~remove;
	},

	HasBits64(sum: bigint, bit: bigint): boolean {
		return (sum & bit) == bit;
	},
	AddBits64(sum: bigint, add: bigint): bigint {
		return sum | add;
	},
	RemoveBits64(sum: bigint, remove: bigint): bigint {
		return sum & ~remove;
	},
};
