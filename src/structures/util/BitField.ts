export const HasBits = (sum: number, bit: number): boolean => {
	return (sum & bit) == bit;
};

export const AddBits = (sum: number, add: number): number => {
	return sum | add;
};

export const RemoveBits = (sum: number, remove: number): number => {
	return sum & ~remove;
};

export const HasBits64 = (sum: bigint, bit: bigint): boolean => {
	return (sum & bit) == bit;
};

export const AddBits64 = (sum: bigint, add: bigint): bigint => {
	return sum | add;
};

export const RemoveBits64 = (sum: bigint, remove: bigint): bigint => {
	return sum & ~remove;
};
