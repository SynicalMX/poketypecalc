import SingleTypeCalc, { DualTypeCalc } from "./calc.js";
import Type from "./types.js";

Type.init();
const single = new SingleTypeCalc();
const dual = new DualTypeCalc();

single.calc();
console.log();
dual.calc();
