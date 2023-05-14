export enum LoadIntensity {
  max = "max",
  sub = "sub",
  high = "high",
  low = "low",
  min = "min",
}

export enum MyColors {
  error = "error",
  warning = "warning",
  success = "success",
  secondary = "secondary",
  primary = "primary",
  default = "default",
  info = "info",
}

// export type MyColors =
//   | "error"
//   | "warning"
//   | "success"
//   | "secondary"
//   | "primary"
//   | "default"
//   | "info";

export const selectOptions: { value: LoadIntensity; color: MyColors }[] = [
  { value: LoadIntensity.max, color: MyColors.error },
  { value: LoadIntensity.sub, color: MyColors.warning },
  { value: LoadIntensity.high, color: MyColors.success },
  { value: LoadIntensity.low, color: MyColors.secondary },
  { value: LoadIntensity.min, color: MyColors.primary },
];

export enum EnergySupply {
  CP = "CP",
  CPLa = "CP+LA",
  LA = "LA",
  O2 = "O2",
  Rest = "Rest",
}

export const energySupplyOptions: { value: EnergySupply; color: MyColors }[] = [
  { value: EnergySupply.CP, color: MyColors.success },
  { value: EnergySupply.CPLa, color: MyColors.warning },
  { value: EnergySupply.LA, color: MyColors.error },
  { value: EnergySupply.O2, color: MyColors.success },
  { value: EnergySupply.Rest, color: MyColors.primary },
];

export interface IExerciseParams {
  work: number;
  rest: number;
  loadIntensity: string;
  repetitions: number;
  explanation: number;
  energySupply: EnergySupply;
  modeManual?: boolean;
}

export type ExerciseParamsFormKeyArray = keyof IExerciseParams;
export interface ExerciseParamsFormFields {
  name: ExerciseParamsFormKeyArray;
  placeholder: string;
  options?: string[];
}
export const ExerciseParamsArray: ExerciseParamsFormFields[] = [
  { name: "work", placeholder: "Work sec" },
  { name: "rest", placeholder: "Rest sec" },
  {
    name: "explanation",
    placeholder: "Explanation min",
  },
  {
    name: "repetitions",
    placeholder: "Repetitions",
  },
];

export const radioParams: ExerciseParamsFormFields = {
  name: "loadIntensity",
  placeholder: "Load Intensity",
};

export const energySupplyParams: ExerciseParamsFormFields = {
  name: "energySupply",
  placeholder: "Energy supply",
};
export const ExerciseParamsDefault: IExerciseParams = {
  work: 0,
  rest: 0,
  loadIntensity: LoadIntensity.sub,
  repetitions: 1,
  explanation: 1,
  energySupply: EnergySupply.Rest,
};
