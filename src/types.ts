// Some constants for damage effectiveness.
export const MULTI_SUPER_EFFECTIVE = 2;
export const MULTI_EFFECTIVE = 1;
export const MULTI_INEFFECTIVE = 0.5;
export const MULTI_IMMUNE = 0;


// This abstract class handles all Type related stuff, every type class inherits it.
export default abstract class Type {
	public name: string;
	public effectives: Map<Type, number> = new Map();
	public static types: Map<string, Type> = new Map();

	constructor(name: string) {
		this.name = name;
		Type.types.set(this.name, this);
	}

	// The 4 following methods control type effectiveness.

	public superEffective(type: string) {
		const t = Type.getType(type);
		this.setEffectiveness(t, MULTI_SUPER_EFFECTIVE);
	}

	public effective(type: string) {
		const t = Type.getType(type);
		this.setEffectiveness(t, MULTI_EFFECTIVE);
	}

	public ineffective(type: string) {
		const t = Type.getType(type);
		this.setEffectiveness(t, MULTI_INEFFECTIVE);
	}

	public immune(type: string) {
		const t = Type.getType(type);
		this.setEffectiveness(t, MULTI_IMMUNE);
	}

	// This method allows type classes to set their type effectiveness, it is called in the static init function
	public abstract setEffectives(): void;

	/**
	 * This has to be called so we can prevent errors like this;
	 * TypeFire is declared after TypeWater but they both need their type info.
	 * So instead, we initialize all the types here.
	 */
	public static init() {
		// Create all the type classes
		new TypeBug();
		new TypeDark();
		new TypeDragon();
		new TypeElectric();
		new TypeFighting();
		new TypeFire();
		new TypeFlying();
		new TypeGhost();
		new TypeGrass();
		new TypeGround();
		new TypeIce();
		new TypeNormal();
		new TypePoison();
		new TypePsychic();
		new TypeRock();
		new TypeSteel();
		new TypeWater();

		// Set all their effectives
		Type.types.forEach((type) => {
			type.setEffectives();
		});
	}

	// Helper method for all effectiveness setters (immune, ineffective, effective, superEffective).
	private setEffectiveness(type: Type, multi: number) {
		this.effectives.set(type, multi)
	}

	// Simple debug as of right now, will most likely be removed.
	public printCoverage() {
		console.log(`Coverage of type '${this.name}':`);
		this.effectives.forEach((multi, type) => {
			console.log(`\t${type.name}: ${multi.toString()}`);
		});
	}

	// Returns a Type from its name.
	public static getType(name: string): Type {
		return <Type>Type.types.get(name);
	}
}

// FIXME: This class outputs partially correct data. More research might suffice.
export class DualType {
	public primary: Type;
	public secondary: Type;
	public types: Map<string, Type> = new Map();
	public effectives: Map<Type, number> = new Map();

	constructor(primary: Type, secondary: Type) {
		this.primary = primary;
		this.secondary = secondary;
		this.addType(primary);
		this.addType(secondary);
	}

	public printCoverage() {
		console.log(`Coverage of types '${this.primary.name}' and '${this.secondary.name}':`);
		this.effectives.forEach((multi, type) => {
			console.log(`\t${type.name}: ${multi.toString()}`);
		});
	}

	private addType(type: Type) {
		this.types.set(type.name, type);

		type.effectives.forEach((multi, t) => {
			if (this.effectives.has(t)) {
				const curMulti: number = <number>this.effectives.get(t);
				const newMulti = curMulti * multi;

				this.effectives.set(t, newMulti);
				return;
			};

			this.effectives.set(t, multi);
		});
	}
}

// From here on out, the file contains all the type information.
// The schema for all the Type classes is 'TypeName'

// TODO: Probably infer that a type is effective unless specified.

class TypeBug extends Type {
	constructor() {
		super("bug");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.superEffective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.ineffective("fighting");
		this.ineffective("fire");
		this.ineffective("flying");
		this.ineffective("ghost");
		this.superEffective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.ineffective("poison");
		this.superEffective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeDark extends Type {
	constructor() {
		super("dark");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.ineffective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.ineffective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.superEffective("ghost");
		this.effective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.superEffective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeDragon extends Type {
	constructor() {
		super("dragon");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.superEffective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.effective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeElectric extends Type {
	constructor() {
		super("electric");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.ineffective("dragon");
		this.ineffective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.superEffective("flying");
		this.effective("ghost");
		this.ineffective("grass");
		this.immune("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.effective("rock");
		this.effective("steel");
		this.superEffective("water");
	}
}

class TypeFighting extends Type {
	constructor() {
		super("fighting");
	}

	public setEffectives(): void {
		this.ineffective("bug");
		this.superEffective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.ineffective("flying");
		this.immune("ghost");
		this.effective("grass");
		this.effective("ground");
		this.superEffective("ice");
		this.superEffective("normal");
		this.ineffective("poison");
		this.ineffective("psychic");
		this.superEffective("rock");
		this.superEffective("steel");
		this.effective("water");
	}
}

class TypeFire extends Type {
	constructor() {
		super("fire");
	}

	public setEffectives(): void {
		this.superEffective("bug");
		this.effective("dark");
		this.ineffective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.ineffective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.superEffective("grass");
		this.effective("ground");
		this.superEffective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.ineffective("rock");
		this.superEffective("steel");
		this.ineffective("water");
	}
}

class TypeFlying extends Type {
	constructor() {
		super("flying");
	}

	public setEffectives(): void {
		this.superEffective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.ineffective("electric");
		this.superEffective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.superEffective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.ineffective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeGhost extends Type {
	constructor() {
		super("ghost");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.ineffective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.superEffective("ghost");
		this.effective("grass");
		this.effective("ground");
		this.effective("ice");
		this.immune("normal");
		this.effective("poison");
		this.superEffective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeGrass extends Type {
	constructor() {
		super("grass");
	}

	public setEffectives(): void {
		this.ineffective("bug");
		this.effective("dark");
		this.ineffective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.ineffective("fire");
		this.ineffective("flying");
		this.effective("ghost");
		this.ineffective("grass");
		this.superEffective("ground");
		this.effective("ice");
		this.effective("normal");
		this.ineffective("poison");
		this.effective("psychic");
		this.superEffective("rock");
		this.ineffective("steel");
		this.superEffective("water");
	}
}

class TypeGround extends Type {
	constructor() {
		super("ground");
	}

	public setEffectives(): void {
		this.ineffective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.superEffective("electric");
		this.effective("fighting");
		this.superEffective("fire");
		this.immune("flying");
		this.effective("ghost");
		this.ineffective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.superEffective("poison");
		this.effective("psychic");
		this.superEffective("rock");
		this.superEffective("steel");
		this.effective("water");
	}
}

class TypeIce extends Type {
	constructor() {
		super("ice");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.superEffective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.ineffective("fire");
		this.superEffective("flying");
		this.effective("ghost");
		this.superEffective("grass");
		this.superEffective("ground");
		this.ineffective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.ineffective("water");
	}
}

class TypeNormal extends Type {
	constructor() {
		super("normal");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.immune("ghost");
		this.effective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.ineffective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypePoison extends Type {
	constructor() {
		super("poison");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.ineffective("ghost");
		this.superEffective("grass");
		this.ineffective("ground");
		this.effective("ice");
		this.effective("normal");
		this.ineffective("poison");
		this.effective("psychic");
		this.ineffective("rock");
		this.immune("steel");
		this.effective("water");
	}
}

class TypePsychic extends Type {
	constructor() {
		super("psychic");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.immune("dark");
		this.effective("dragon");
		this.effective("electric");
		this.superEffective("fighting");
		this.effective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.effective("grass");
		this.effective("ground");
		this.effective("ice");
		this.effective("normal");
		this.superEffective("poison");
		this.ineffective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeRock extends Type {
	constructor() {
		super("rock");
	}

	public setEffectives(): void {
		this.superEffective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.effective("electric");
		this.ineffective("fighting");
		this.superEffective("fire");
		this.superEffective("flying");
		this.effective("ghost");
		this.effective("grass");
		this.ineffective("ground");
		this.superEffective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.effective("rock");
		this.ineffective("steel");
		this.effective("water");
	}
}

class TypeSteel extends Type {
	constructor() {
		super("steel");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.effective("dragon");
		this.ineffective("electric");
		this.effective("fighting");
		this.ineffective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.effective("grass");
		this.effective("ground");
		this.superEffective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.superEffective("rock");
		this.ineffective("steel");
		this.ineffective("water");
	}
}

class TypeWater extends Type {
	constructor() {
		super("water");
	}

	public setEffectives(): void {
		this.effective("bug");
		this.effective("dark");
		this.ineffective("dragon");
		this.effective("electric");
		this.effective("fighting");
		this.superEffective("fire");
		this.effective("flying");
		this.effective("ghost");
		this.ineffective("grass");
		this.superEffective("ground");
		this.effective("ice");
		this.effective("normal");
		this.effective("poison");
		this.effective("psychic");
		this.superEffective("rock");
		this.effective("steel");
		this.ineffective("water");
	}
}
