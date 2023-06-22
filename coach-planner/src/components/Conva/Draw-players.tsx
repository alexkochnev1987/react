import React from 'react';
import { Layer } from 'react-konva';
import { useAppSelector } from '../../store/hooks';
import { selectPlyersObject } from '../../store/slices/draw-objects-slice';
import { PlayerComponent } from './Player';

export const DrawPlayers = () => {
  const players = useAppSelector(selectPlyersObject);
  return (
    <>
      <Layer>
        {players.length > 0 && players.map((player) => <PlayerComponent player={player} key={player.id} />)}
      </Layer>
    </>
  );
};
