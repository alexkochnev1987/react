import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
// import PanToolIcon from '@mui/icons-material/PanTool';
import DrawIcon from '@mui/icons-material/Draw';
// import PolylineIcon from '@mui/icons-material/Polyline';
import CategoryIcon from '@mui/icons-material/Category';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { PlayerTypes } from '../../store/slices/draw-objects-slice';
import { UserActionsValues } from '../../store/slices/canvas-slice';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveAsIcon from '@mui/icons-material/SaveAs';

export const lineTypesArray = [
  {
    icon: <HighlightAltIcon />,
    value: UserActionsValues.select,
  },
  // {
  //   icon: <PanToolIcon />,
  //   value: UserActionsValues.drag,
  // },
  {
    icon: <DrawIcon />,
    value: UserActionsValues.draw,
  },
  // {
  //   icon: <PolylineIcon />,
  //   value: UserActionsValues.polyline,
  // },
  {
    icon: <CategoryIcon />,
    value: UserActionsValues.addPlayer,
  },
];

export const TooltipTitle = {
  deleteLine: 'Delete line',
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
