const button = document.getElementById("EnterBtn");
const totalBEElem = document.getElementById("totalBE");
const waterLvlElem = document.getElementById("waterLvl");
const fireLvlElem = document.getElementById("fireLvl");

const resultsElem = document.getElementById("results");
let maxLevelELem = document.getElementById("maxLevelResult");

class EasterDistribution {
  constructor(base, power, discount) {
    this.base = base;
    this.power = power;
    this.discount = discount;
    this.mainQuant = 5;
    this.turtleQuant = 4;
  }

  misc() {
    const perMisc = (this.base * (0.1 / 13)) / this.discount;
    return Math.floor((this.power + Math.log10(perMisc)) / Math.log10(2) - 1);
  }

  main() {
    const perMain = (this.base * (0.5 / 7)) / this.discount;
    const preE = Math.sqrt(perMain / this.mainQuant);
    const postE = (this.power + 1) / 2;

    return this.formatExponential(preE, postE);
  }

  turtle() {
    const perTurtle = (this.base * 0.2) / this.discount;
    const preE = (perTurtle / this.turtleQuant) ** 0.4;
    const postE = (this.power + 1) / 2.5;

    return this.formatExponential(preE, postE);
  }

  gk() {
    const perGK = (this.base * 0.2) / this.discount;
    return `${perGK}e${this.power}`;
  }

  formatExponential(preE, postE) {
    if (String(postE).includes(".")) {
      const numList = String(postE).split(".");
      return `${preE * 10 ** (Number(numList[1]) / 10)}e${numList[0]}`;
    } else {
      return `${preE.toFixed(2)}e${postE}`;
    }
  }
}

// Function name changed from "distributeBE" --> "calcEasterLvls"
function calcEasterLvls(totalBE, discount) {
  const [base, power] = getBasePower(totalBE);
  const easterDist = new EasterDistribution(base, power, discount);

  return {
    Misc: easterDist.misc(),
    Main: normalize(easterDist.main()),
    Turtle: normalize(easterDist.turtle()),
    GK: normalize(easterDist.gk()),
  };
}

// normalized function below rounds base to 3 d.p.
function normalize(x) {
  let preE = Number(String(x).split("e")[0]);
  let postE = Number(String(x).split("e")[1]);

  const degree = Math.floor(Math.log10(Math.abs(preE)));
  preE = preE / 10 ** degree;
  postE = postE + degree;
  const result = `${preE.toFixed(3)}e${postE}`;

  return result;
}

function getBasePower(input) {
  const suffixes = {
    k: 3,
    K: 3,
    m: 6,
    M: 6,
    B: 9,
    T: 12,
    q: 15,
    Q: 18,
    s: 21,
    S: 24,
    O: 27,
    N: 30,
    d: 33,
    U: 36,
    D: 39,
  };

  const suffix = input.match(/[a-zA-Z]$/);

  if (suffix) {
    const base = parseFloat(input);
    const power = suffixes[suffix[0]];
    return [base, power];
  } else {
    const [base, power] = input.split("e").map(Number);
    return [base, power];
  }
}

// NOTE: Adapt to boss health (include multiplier)
function calcHealth(level) {
  const factor = Math.floor((level - 1) / 500);
  const remain = level - factor * 500;

  let logsum = 0;
  for (let i = 1; i < factor; i++) {
    logsum += Math.log10(1.145 + 0.001 * i) * 500;
  }
  logsum += Math.log10(1.145 + 0.001 * factor) * remain;

  base = 10 ** (logsum - Math.floor(logsum)) * 4.2275;
  power = Math.floor(logsum) + 48;

  //   return [base, power];

  return normalize(`${base}e${power}`);
}

function calcDamage(farmerNo, farmerLevel) {}

console.log(calcHealth(141460));
