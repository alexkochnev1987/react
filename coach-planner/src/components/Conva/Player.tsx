import React, { useEffect } from 'react';
import {
  Player,
  PlayerTypes,
  selectCurrentId,
  setCurrent,
  setUserColor,
  setUserPoint,
  setUserType,
} from '../../store/slices/draw-objects-slice';
import { Circle, RegularPolygon } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectColor, selectPlayerType } from '../../store/slices/canvas-slice';

export const PlayerComponent = ({ player }: { player: Player }) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(selectCurrentId);
  const color = useAppSelector(selectColor);
  const playerType = useAppSelector(selectPlayerType);
  const props = {
    x: player.point[0],
    y: player.point[1],
    radius: 15,
    stroke: '#000',
    fill: player.color,
    strokeWidth: current === player.id ? 4 : 2,
    draggable: true,
    onMouseOver: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      e.currentTarget._setAttr('strokeWidth', 4);
    },
    onMouseOut: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      if (current !== player.id) e.currentTarget._setAttr('strokeWidth', 2);
    },
    onDragEnd: function (e: KonvaEventObject<MouseEvent>) {
      if (current === player.id) {
        dispatch(setUserPoint([e.target.x(), e.target.y()]));
      }
    },
    onClick: function () {
      dispatch(setCurrent(player.id));
    },
  };

  useEffect(() => {
    if (current === player.id) {
      dispatch(setUserColor(color));
    }
  }, [current, dispatch, color, player.id]);
  useEffect(() => {
    if (current === player.id) {
      dispatch(setUserType(playerType));
    }
  }, [current, dispatch, playerType, player.id]);

  switch (player.type) {
    case PlayerTypes.circle:
      return <Circle {...props} />;
    case PlayerTypes.square:
      return <RegularPolygon {...props} sides={4} />;
    case PlayerTypes.triangle:
      return <RegularPolygon {...props} sides={3} />;
    default:
      return null;
  }
};
