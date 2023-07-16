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
import { ReactComponent as Tire } from '@/shared/assets/icons/big-tire.svg';
import { ReactComponent as Puck } from '@/shared/assets/icons/puck.svg';
import { ReactComponent as Cone } from '@/shared/assets/icons/cone.svg';
import { ReactComponent as Stick } from '@/shared/assets/icons/stick.svg';
import { EquipmentTypes, PlayerTypes, UserActionsValues } from '../../../store/slices/constants';
import { ReactComponent as Ball } from '@/shared/assets/icons/tennis-ball.svg';
import { ReactComponent as GoalIcon } from '@/shared/assets/icons/goal.svg';

export const lineTypesArray = [
  {
    title: 'Select object',
    icon: <HighlightAltIcon />,
    value: UserActionsValues.select,
  },
  {
    title: 'Draw line',
    icon: <DrawIcon />,
    value: UserActionsValues.draw,
  },
  {
    title: 'Add equipment',
    icon: <ConstructionIcon />,
    value: UserActionsValues.addEquipment,
  },
  {
    title: 'Add user',
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
    icon: <Puck />,
    value: EquipmentTypes.puck,
  },
  {
    icon: <Cone />,
    value: EquipmentTypes.cone,
  },
  {
    icon: <Stick />,
    value: EquipmentTypes.stick,
  },
  {
    icon: <Ball />,
    value: EquipmentTypes.ball,
  },
  {
    icon: <Tire />,
    value: EquipmentTypes.tire,
  },
  {
    icon: <GoalIcon />,
    value: EquipmentTypes.goal,
  },
];
