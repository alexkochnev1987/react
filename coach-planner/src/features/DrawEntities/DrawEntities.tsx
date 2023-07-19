import field from '@/shared/assets/img/field.png';
import useImage from 'use-image';
import { Image } from 'react-konva';
import { LineComponent } from '@/entities/Conva/Line';
import { useAppSelector } from '@/store/hooks';
import {
  selectCurrentId,
  selectEquipmentObject,
  selectLinesObject,
  selectPlyersObject,
} from '@/store/slices/draw-objects-slice';
import { PlayerComponent } from '@/entities/Conva/Player';
import { selectEquipment } from './selectEquipment';

export const DrawEntities = ({ width, height }: { width: number; height: number }) => {
  const [image] = useImage(field);
  const lines = useAppSelector(selectLinesObject);
  const current = useAppSelector(selectCurrentId);
  const equipment = useAppSelector(selectEquipmentObject);
  const players = useAppSelector(selectPlyersObject);

  return (
    <>
      {image && <Image image={image} width={width} height={height} />}
      {lines.length > 0 && lines.map((line) => <LineComponent current={current} line={line} key={line.id} />)}
      {equipment.length > 0 && equipment.map((elem) => selectEquipment(elem))}
      {players.length > 0 && players.map((player) => <PlayerComponent player={player} key={player.id} />)}
    </>
  );
};
