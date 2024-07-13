import Type, { DualType } from "./types.js";

Type.init();

const type = new DualType(Type.getType("fire"), Type.getType("fairy"));
type.printCoverage();
