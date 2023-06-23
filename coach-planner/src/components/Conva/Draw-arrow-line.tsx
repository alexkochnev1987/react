import React from 'react';
import { LineComponent } from './Line';
import { Layer } from 'react-konva';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentId, selectLinesObject } from '../../store/slices/draw-objects-slice';

export const DrawArrowLine = () => {
  const lines = useAppSelector(selectLinesObject);
  const current = useAppSelector(selectCurrentId);
  console.log('arrow');
  return (
    <Layer>
      {lines.length > 0 && lines.map((line) => <LineComponent current={current} line={line} key={line.id} />)}
    </Layer>
  );
};
