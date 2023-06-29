import { useAppSelector } from '../../store/hooks';
import { selectEquipmentObject } from '../../store/slices/draw-objects-slice';
import { Layer } from 'react-konva';
import { EquipmentComponent } from './Equipment-component';

export const DrawEquipment = () => {
  const equipment = useAppSelector(selectEquipmentObject);
  return (
    <Layer>
      {equipment.length > 0 && equipment.map((gear) => <EquipmentComponent equipment={gear} key={gear.id} />)}
    </Layer>
  );
};
