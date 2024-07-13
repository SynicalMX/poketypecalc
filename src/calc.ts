import Type, { DualType, MULTI_EFFECTIVE, MULTI_IMMUNE, MULTI_INEFFECTIVE, MULTI_SUPER_EFFECTIVE } from "./types.js";

export default class SingleTypeCalc {
	public typePoints: Map<Type, number> = new Map();

	constructor() {
		// Type.init()
	}

	public calc() {
		console.log("Now searching for the best single type.");

		Type.types.forEach((type) => {
			const score = this.calcType(type);
			this.typePoints.set(type, score);
		});

		let filtered: Array<Type> = [];
		let bestScore = -Infinity;
		let worstScore = Infinity;
		let bestType: Type | undefined = undefined;
		let worstType: Type | undefined = undefined;
		this.typePoints.forEach((score, type) => {
			if (score >= bestScore) {
				bestScore = score;
				bestType = type;
			}
			if (score <= worstScore) {
				worstScore = score;
				worstType = type;
			}
		});

		console.log(`\tFound best: ${(<Type><unknown>bestType).name}: ${bestScore.toString()}pts.`);
		console.log(`\tFound worst: ${(<Type><unknown>worstType).name}: ${worstScore.toString()}pts.`);
	}

	private calcType(type: Type): number {
		let score = 0;
		type.effectives.forEach((multi) => {
			switch (multi) {
				case MULTI_IMMUNE:
					score -= 2
				case MULTI_INEFFECTIVE:
					score -= 1;
				case MULTI_EFFECTIVE:
					score += 1;
				case MULTI_SUPER_EFFECTIVE:
					score += 2;
			}
		});
		return score;
	}
}

export class DualTypeCalc {
	public typePoints: Map<DualType, number> = new Map();

	constructor() {
		// Type.init()
	}

	public calc() {
		console.log("Now searching for the best dual type.");

		Type.types.forEach((primary) => {
			Type.types.forEach((secondary) => {
				if (primary.name === secondary.name) return;
				const type = new DualType(primary, secondary);
				const score = this.calcType(type);
				this.typePoints.set(type, score);
			});
		});
		let bestScore = -Infinity;
		let worstScore = Infinity;
		let bestType: DualType | undefined = undefined;
		let worstType: DualType | undefined = undefined;
		this.typePoints.forEach((score, type) => {
			if (score >= bestScore) {
				bestScore = score;
				bestType = type;
			}
			if (score <= worstScore) {
				worstScore = score;
				worstType = type;
			}
		});

		console.log(`\tFound best: ${(<DualType><unknown>bestType).primary.name}, ${(<DualType><unknown>bestType).secondary.name}: ${bestScore.toString()}pts.`);
		console.log(`\tFound worst: ${(<DualType><unknown>worstType).primary.name}, ${(<DualType><unknown>worstType).secondary.name}: ${worstScore.toString()}pts.`);
	}

	private calcType(type: DualType): number {
		let score = 0;
		type.effectives.forEach((multi) => {
			switch (multi) {
				case MULTI_IMMUNE:
					score -= 2
				case MULTI_INEFFECTIVE:
					score -= 1;
				case MULTI_EFFECTIVE:
					score += 1;
				case MULTI_SUPER_EFFECTIVE:
					score += 2;
			}
		});
		return score;
	}
}
