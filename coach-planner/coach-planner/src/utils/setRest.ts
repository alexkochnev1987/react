import { LoadIntensity } from "../components/exercise-params/constants";

export const setRest = (work: number, intensity: string) => {
  if (work <= 26) {
    switch (intensity) {
      case LoadIntensity.max:
        return work * 5;
      case LoadIntensity.sub:
        return work * 4;
      case LoadIntensity.high:
        return work * 3;
      case LoadIntensity.low:
        return work * 2;
      default:
        return work;
    }
  }
  if (work <= 61) {
    switch (intensity) {
      case LoadIntensity.max:
        return work * 4;
      case LoadIntensity.sub:
        return work * 3;
      case LoadIntensity.high:
        return work * 2;
      case LoadIntensity.low:
        return work;
      default:
        return 0;
    }
  }
  if (work > 61) {
    switch (intensity) {
      case LoadIntensity.max:
        return work * 3;
      case LoadIntensity.sub:
        return work * 2;
      case LoadIntensity.high:
        return work * 1;
      default:
        return 0;
    }
  }
  return 0;
};
