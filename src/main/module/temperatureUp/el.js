import NA from "number-accuracy";

function is(vale) {
  return vale || vale === 0;
}

function and() {
  return Array.prototype.every.call(arguments, value => {
    return is(value);
  });
}
export const bzckngEl = ({ q0, b, z, c, k, n, g, f }) => {
  if (and(q0, b, z, c, k, n, g, f)) {
    return NA.divide(
      NA.plus(
        NA.minus(q0, NA.times(2, b, g, Math.pow(f, z))),
        NA.times(2, c, k, Math.pow(f, NA.divide(1, n)))
      ),
      NA.times(Math.PI, Math.PI)
    );
  }
  return "";
};

export const etaEl = (l0, l) => {
  if (and(l0, l)) {
    return NA.divide(
      NA.times(2, l0, l0, Math.sin(NA.times(NA.divide(l, l0), Math.PI))),
      NA.times(Math.PI, NA.minus(NA.times(l0, l0), NA.times(l, l)))
    );
  }
  return "";
};

export const phiEl = (l0, l, eta) => {
  if (and(l0, l, eta)) {
    return NA.divide(NA.times(eta, l), l0);
  }
  return "";
};

export const tiEl = ({ railElasticModulusE, iy }, f, d, i0, l0, phi, l) => {
  if (and(railElasticModulusE, iy, f, d, i0, l0, phi, l)) {
    return NA.times(
      2,
      100,
      4,
      railElasticModulusE,
      iy,
      Math.PI,
      Math.PI,
      NA.plus(NA.divide(f, Math.pow(l, 2)), NA.divide(NA.times(d, i0, phi), l0))
    );
  }
  return "";
};

export const tqEl = (bzckng, l) => {
  if (and(bzckng, l)) {
    return NA.times(bzckng, l, l);
  }
  return "";
};

export const tmEl = l => {
  if (and(l)) {
    return NA.times(1.95339, 1000, Math.sqrt(l));
  }
  return "";
};

export const t0El = (f, i0, cr, eta, l) => {
  if (and(f, i0, cr, eta, l)) {
    return NA.plus(
      f,
      NA.times(i0, l, eta),
      NA.divide(NA.times(l, l), NA.times(100, cr, Math.PI, Math.PI))
    );
  }
  return "";
};

export const pEl = (ti, tq, tm, t0) => {
  if (and(ti, tq, tm, t0)) {
    return NA.divide(NA.plus(ti, tq, tm), t0);
  }
  return "";
};

export const fstep = (start, step, index) => {
  if (and(start, step, index)) {
    return NA.plus(NA.times(step, index), start);
  }
  return "";
};
