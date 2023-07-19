import { EnergySupply, LoadIntensity } from '../components/exercise-params/constants';

export const setEnergySupply = (work: number, intensity: string) => {
  if (work <= 12) {
    switch (intensity) {
      case LoadIntensity.max:
        return EnergySupply.CP;
      case LoadIntensity.sub:
        return EnergySupply.CP;
      case LoadIntensity.high:
        return EnergySupply.CPLa;
      case LoadIntensity.low:
        return EnergySupply.O2;
      default:
        return EnergySupply.Rest;
    }
  }
  if (work <= 25) {
    switch (intensity) {
      case LoadIntensity.max:
        return EnergySupply.CPLa;
      case LoadIntensity.sub:
        return EnergySupply.CPLa;
      case LoadIntensity.high:
        return EnergySupply.CPLa;
      case LoadIntensity.low:
        return EnergySupply.O2;
      default:
        return EnergySupply.Rest;
    }
  }
  if (work < 35) {
    switch (intensity) {
      case LoadIntensity.max:
        return EnergySupply.CPLa;
      case LoadIntensity.sub:
        return EnergySupply.LA;
      case LoadIntensity.high:
        return EnergySupply.CPLa;
      case LoadIntensity.low:
        return EnergySupply.O2;
      default:
        return EnergySupply.Rest;
    }
  }
  if (work < 45) {
    switch (intensity) {
      case LoadIntensity.max:
        return EnergySupply.LA;
      case LoadIntensity.sub:
        return EnergySupply.LA;
      case LoadIntensity.high:
        return EnergySupply.LA;
      case LoadIntensity.low:
        return EnergySupply.O2;
      default:
        return EnergySupply.Rest;
    }
  }
  if (work > 45) {
    switch (intensity) {
      case LoadIntensity.max:
        return EnergySupply.LA;
      case LoadIntensity.sub:
        return EnergySupply.LA;
      case LoadIntensity.high:
        return EnergySupply.LA;
      case LoadIntensity.low:
        return EnergySupply.O2;
      default:
        return EnergySupply.Rest;
    }
  }
  return EnergySupply.Rest;
};
