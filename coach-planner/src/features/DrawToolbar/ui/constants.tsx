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
import { Box } from '@mui/material';

export const lineTypesArray = [
  {
    title: 'Select object',
    icon: <HighlightAltIcon sx={{ width: '100%', height: '100%' }} />,
    value: UserActionsValues.select,
  },
  {
    title: 'Draw line',
    icon: <DrawIcon sx={{ width: '100%', height: '100%' }} />,
    value: UserActionsValues.draw,
  },
  {
    title: 'Add equipment',
    icon: <ConstructionIcon sx={{ width: '100%', height: '100%' }} />,
    value: UserActionsValues.addEquipment,
  },
  {
    title: 'Add user',
    icon: <CategoryIcon sx={{ width: '100%', height: '100%' }} />,
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
    icon: <TripOriginIcon sx={{ width: '100%', height: '100%' }} />,
    value: PlayerTypes.circle,
  },
  {
    icon: <ChangeHistoryIcon sx={{ width: '100%', height: '100%' }} />,
    value: PlayerTypes.triangle,
  },
  {
    icon: <CropSquareIcon sx={{ width: '100%', height: '100%' }} />,
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
    icon: (
      <Box sx={{ fill: (t) => t.palette.primary.main, fontSize: '0rem' }}>
        <Stick />
      </Box>
    ),
    value: EquipmentTypes.stick,
  },
  {
    icon: <Ball />,
    value: EquipmentTypes.ball,
  },
  {
    icon: (
      <Box sx={{ fill: (t) => t.palette.primary.main, fontSize: '0rem' }}>
        <Tire />
      </Box>
    ),
    value: EquipmentTypes.tire,
  },
  {
    icon: <GoalIcon />,
    value: EquipmentTypes.goal,
  },
];

const TireIconComponent = () => {
  return (
    <Box sx={{ fill: (t) => t.palette.primary.main, fontSize: '0rem' }}>
      <Tire />,
    </Box>
  );
};
