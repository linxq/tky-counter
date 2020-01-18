import {
  bzckngEl,
  etaEl,
  phiEl,
  tiEl,
  tqEl,
  tmEl,
  t0El,
  pEl,
  fstep
} from "./el.js";

export function counter() {}

export function oneTimeCounter(f, d, i0, l0, bzckng, cr) {
  const { l } = this;
  this.form.bzckng = bzckngEl(this.form);
  setInit.apply(this);
  l.map(item => {
    const etaValue = etaEl(l0, item);
    const phiValue = phiEl(l0, item, etaValue);
    const tiValue = tiEl(this.baseData, f, d, i0, l0, phiValue, item);
    const tqValue = tqEl(bzckng, item);
    const tmValue = tmEl(item);
    const t0Value = t0El(f, i0, cr, etaValue, item);
    const pValue = pEl(tiValue, tqValue, tmValue, t0Value);
    this.eta.push(etaValue);
    this.phi.push(phiValue);
    this.ti.push(tiValue);
    this.tq.push(tqValue);
    this.tm.push(tmValue);
    this.t0.push(t0Value);
    this.p.push(pValue);
  });

  return Math.min(
    ...this.p.map(item => {
      return item ? item : 100000000;
    })
  ).toFixed(2);
}

function setInit() {
  this.eta = [];
  this.phi = [];
  this.ti = [];
  this.tq = [];
  this.tm = [];
  this.t0 = [];
  this.p = [];
}
export function counterFIncrease() {
  console.log(3334445556);
  console.time();
  const step = 0.01;
  const start = 0;
  const end = 3;
  this.xSet = [];
  this.lineSet = new Array((end - start) / step + 1)
    .fill(1)
    .map((item, index) => {
      const { d, i0, l0, bzckng, cr } = this.form;
      const f = fstep(start, step, index);
      this.xSet[index] = f;
      return this.oneTimeCounter(f, d, i0, l0, bzckng, cr);
    });
  this.form.pkmin = Math.max(...this.lineSet.map(item => (item ? item : 0)));
  console.log(222222, this.form.pkmin);
  console.timeEnd();
}

function createLValue() {
  const base = 300;
  const step = 10;
  const max = 720;
  return new Array((max - base) / step + 1).fill(1).map((time, index) => {
    return index * step + base;
  });
}
