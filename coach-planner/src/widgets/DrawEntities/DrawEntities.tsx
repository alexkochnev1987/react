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
import { Equipment, EquipmentTypes } from '@/store/slices/constants';
import { Cone } from '@/entities/Conva/equipment/Cone';
import { Puck } from '@/entities/Conva/equipment/Puck';
import { Stick } from '@/entities/Conva/equipment/Stick';
import { Tire } from '@/entities/Conva/equipment/Tire';
import { Ball } from '@/entities/Conva/equipment/Ball';
import { PlayerComponent } from '@/entities/Conva/Player';

export const DrawEntities = ({ width, height }: { width: number; height: number }) => {
  const [image] = useImage(field);
  const lines = useAppSelector(selectLinesObject);
  const current = useAppSelector(selectCurrentId);
  const equipment = useAppSelector(selectEquipmentObject);
  const players = useAppSelector(selectPlyersObject);
  const selectEquipment = (equipment: Equipment) => {
    switch (equipment.type) {
      case EquipmentTypes.cone:
        return <Cone equipment={equipment} key={equipment.id} />;
      case EquipmentTypes.puck:
        return <Puck equipment={equipment} key={equipment.id} />;
      case EquipmentTypes.stick:
        return <Stick equipment={equipment} key={equipment.id} />;
      case EquipmentTypes.tire:
        return <Tire equipment={equipment} key={equipment.id} />;
      case EquipmentTypes.ball:
        return <Ball equipment={equipment} key={equipment.id} />;
      default:
        return null;
    }
  };

  return (
    <>
      {image && <Image image={image} width={width} height={height} />}
      {lines.length > 0 && lines.map((line) => <LineComponent current={current} line={line} key={line.id} />)}
      {equipment.length > 0 && equipment.map((elem) => selectEquipment(elem))}
      {players.length > 0 && players.map((player) => <PlayerComponent player={player} key={player.id} />)}
    </>
  );
};
