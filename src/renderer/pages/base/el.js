import NA from "number-accuracy";

export const w1 = form => {
  console.log(123123, form);
  const { ix, neutralAxisPosition } = form;
  if (neutralAxisPosition && ix) {
    return NA.times(10, NA.divide(ix, neutralAxisPosition));
  }
  return "";
};

export const w2 = form => {
  const { ix, neutralAxisPosition, railHeight } = form;
  if (neutralAxisPosition && ix && railHeight) {
    return NA.times(
      10,
      NA.divide(ix, NA.minus(railHeight, neutralAxisPosition))
    );
  }
  return "";
};

export const u = form => {
  const { d, a } = form;
  if (d && a) {
    return NA.divide(d, a);
  }
  return "";
};

export const k = form => {
  const { ix, u, railElasticModulusE } = form;
  if (u && railElasticModulusE) {
    return Math.pow(NA.divide(u, 4 * railElasticModulusE * ix * 10000), 0.25);
  }
  return "";
};
