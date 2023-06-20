import { EnergySupply } from "../components/exercise-params/constants";
import { TrainingExerciseData } from "../db/trainings";
const secondsInMinute = 60;

export const countEnergySupplyTime = (exercises: TrainingExerciseData[]) => {
  const baseEnergySupply = {
    [EnergySupply.CP]: 0,
    [EnergySupply.CPLa]: 0,
    [EnergySupply.LA]: 0,
    [EnergySupply.O2]: 0,
    [EnergySupply.Rest]: 0,
  };

  return exercises && exercises.length > 0
    ? exercises.reduce((prev, curr) => {
        const { work, rest, repetitions, explanation, energySupply } =
          curr.params;

        const time = Math.round(
          (Number(repetitions) * (Number(work) + Number(rest))) /
            secondsInMinute
        );

        prev[energySupply] += time;
        prev[EnergySupply.Rest] += Number(explanation);

        return prev;
      }, baseEnergySupply)
    : baseEnergySupply;
};
