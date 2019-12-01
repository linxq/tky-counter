import NA from "number-accuracy";

export const td = (
  railAllowableStress,
  gd,
  brakingStress,
  railElasticModulusE,
  expansionCoefficientRailLine
) => {
  if (
    (railAllowableStress || railAllowableStress === 0) &&
    (gd || gd === 0) &&
    (brakingStress || brakingStress === 0) &&
    (railElasticModulusE || railElasticModulusE === 0) &&
    (expansionCoefficientRailLine || expansionCoefficientRailLine === 0)
  ) {
    return NA.divide(
      NA.minus(railAllowableStress, gd, brakingStress),
      railElasticModulusE,
      expansionCoefficientRailLine
    );
  }
  return "";
};
