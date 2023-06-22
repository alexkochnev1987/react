import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Box, IconButton } from '@mui/material';
import {
  UserActionsValues,
  selectPlayerType,
  selectUserAction,
  setPlayerType,
  setUserAction,
} from '../../store/slices/canvas-slice';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import PanToolIcon from '@mui/icons-material/PanTool';
import DrawIcon from '@mui/icons-material/Draw';
import PolylineIcon from '@mui/icons-material/Polyline';
import { SelectColor } from './Tools/Select-color';
import { SelectLineType } from './Tools/Line';
import { SelectSize } from './Tools/Select-size';
import CategoryIcon from '@mui/icons-material/Category';
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { PlayerTypes } from '../../store/slices/draw-objects-slice';

const lineTypesArray = [
  {
    icon: <HighlightAltIcon />,
    value: UserActionsValues.select,
  },
  {
    icon: <PanToolIcon />,
    value: UserActionsValues.drag,
  },
  {
    icon: <DrawIcon />,
    value: UserActionsValues.draw,
  },
  {
    icon: <PolylineIcon />,
    value: UserActionsValues.polyline,
  },
  {
    icon: <CategoryIcon />,
    value: UserActionsValues.addPlayer,
  },
];

const playerTypesArray = [
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

export const UserActions = () => {
  const dispatch = useAppDispatch();
  const userAction = useAppSelector(selectUserAction);
  const playerType = useAppSelector(selectPlayerType);
  return (
    <Box display={'flex'} alignItems={'center'} gap={'5px'} sx={{ height: '60px' }}>
      <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
        {lineTypesArray.map((x) => (
          <IconButton
            color="primary"
            key={x.value}
            onClick={() => dispatch(setUserAction(x.value))}
            sx={{
              border: userAction === x.value ? '2px solid' : 'none',
            }}
          >
            {x.icon}
          </IconButton>
        ))}
      </Box>
      {userAction === UserActionsValues.addPlayer ? (
        <Box display={'flex'} gap={'5px'} alignItems={'center'}>
          <SelectColor />
          <Box display={'flex'} sx={{ height: '45px' }} gap={'5px'}>
            {playerTypesArray.map((x) => (
              <IconButton
                color="primary"
                key={x.value}
                onClick={() => dispatch(setPlayerType(x.value))}
                sx={{
                  border: playerType === x.value ? '2px solid' : 'none',
                }}
              >
                {x.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      ) : (
        userAction !== UserActionsValues.drag && (
          <Box display={'flex'} gap={'5px'}>
            <SelectLineType />
            <SelectColor />
            <SelectSize />
          </Box>
        )
      )}
    </Box>
  );
};
