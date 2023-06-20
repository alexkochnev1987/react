import { colors } from "@mui/material";
import { EnergySupply } from "../components/exercise-params/constants";

export const getColorFromParams = (param: string) => {
  switch (param) {
    case EnergySupply.CP:
      return colors.green[500];
    case EnergySupply.CPLa:
      return colors.yellow[500];
    case EnergySupply.LA:
      return colors.red[500];
    case EnergySupply.Rest:
      return colors.blue[200];
    default:
      return colors.lightBlue[700];
  }
};
