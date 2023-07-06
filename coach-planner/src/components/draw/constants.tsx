import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import DrawIcon from '@mui/icons-material/Draw';
import CategoryIcon from '@mui/icons-material/Category';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ConstructionIcon from '@mui/icons-material/Construction';
import Tire from '../../assets/big-tire.svg';
import Puck from '../../assets/puck.svg';
import Cone from '../../assets/cone.svg';
import Stick from '../../assets/stick.svg';
import { EquipmentTypes, PlayerTypes, UserActionsValues } from '../../store/slices/constants';
import Ball from '../../assets/tennis-ball.svg';

export const lineTypesArray = [
  {
    icon: <HighlightAltIcon />,
    value: UserActionsValues.select,
  },
  {
    icon: <DrawIcon />,
    value: UserActionsValues.draw,
  },
  {
    icon: <ConstructionIcon />,
    value: UserActionsValues.addEquipment,
  },
  {
    icon: <CategoryIcon />,
    value: UserActionsValues.addPlayer,
  },
];

export const TooltipTitle = {
  deleteLine: 'Delete current',
  save: 'Save this image',
  saveAs: 'Create new and save',
};

export const ActionsOnConva = {
  saveIcon: <SaveIcon />,
  deleteIcon: <DeleteForeverIcon />,
  saveAs: <SaveAsIcon />,
};

export const playerTypesArray = [
  {
    icon: <TripOriginIcon />,
    value: PlayerTypes.circle,
  },
  {
    icon: <ChangeHistoryIcon />,
    value: PlayerTypes.triangle,
  },
  {
    icon: <CropSquareIcon />,
    value: PlayerTypes.square,
  },
];

export const toolsTypesArray = [
  {
    svgIcon: Puck,
    value: EquipmentTypes.puck,
  },
  {
    svgIcon: Cone,
    value: EquipmentTypes.cone,
  },
  {
    svgIcon: Stick,
    value: EquipmentTypes.stick,
  },
  {
    svgIcon: Ball,
    value: EquipmentTypes.ball,
  },
  {
    svgIcon: Tire,
    value: EquipmentTypes.tire,
  },
];
