import NA from "number-accuracy";

export const kx = (k, x) => {
  if (k && (x || x === 0)) {
    return NA.times(k, x);
  }
  return "";
};

export const u = kx => {
  if (kx || kx === 0) {
    return NA.times(Math.exp(-kx), NA.minus(Math.cos(kx), Math.sin(kx)));
  }
  return "";
};

export const p0u = (p0, u) => {
  if ((p0 || p0 === 0) && (u || u === 0)) {
    return NA.times(p0, u);
  }
  return "";
};

export const sum = ({ w1, w2, w3, w4 }) => {
  if (
    (w1 || w1 === 0) &&
    (w2 || w2 === 0) &&
    (w3 || w3 === 0) &&
    (w4 || w4 === 0)
  ) {
    return NA.plus(w1, w2, w3, w4);
  }
  return "";
};
export const m0 = (max, k) => {
  if ((max || max === 0) && (k || k === 0)) {
    return NA.times(NA.divide(1, NA.times(4, k)), max);
  }
  return "";
};

export const dynamicLoad = ({ speedFactor, f, biasFactor }) => {
  if (
    (speedFactor || speedFactor === 0) &&
    (f || f === 0) &&
    (biasFactor || biasFactor === 0)
  ) {
    return NA.times(NA.plus(1, speedFactor, biasFactor), f);
  }
  return "";
};

export const md = ({ speedFactor, biasFactor, m0 }) => {
  if (
    (speedFactor || speedFactor === 0) &&
    (m0 || m0 === 0) &&
    (biasFactor || biasFactor === 0)
  ) {
    return NA.times(NA.plus(1, speedFactor, biasFactor), m0);
  }
  return "";
};

export const gd = ({ f, md }, w1) => {
  if ((f || f === 0) && (md || md === 0) && (w1 || w1 === 0)) {
    return NA.divide(NA.times(f, md), w1, 1000);
  }
  return "";
};
