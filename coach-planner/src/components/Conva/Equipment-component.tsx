import { Equipment, EquipmentTypes } from '../../store/slices/constants';
import { Cone } from './equipment/Cone';
import { Puck } from './equipment/Puck';
import { Stick } from './equipment/Stick';
import { Tire } from './equipment/Tire';
import { Ball } from './equipment/Ball';

export const EquipmentComponent = ({ equipment }: { equipment: Equipment }) => {
  switch (equipment.type) {
    case EquipmentTypes.cone:
      return <Cone equipment={equipment} />;
    case EquipmentTypes.puck:
      return <Puck equipment={equipment} />;
    case EquipmentTypes.stick:
      return <Stick equipment={equipment} />;
    case EquipmentTypes.tire:
      return <Tire equipment={equipment} />;
    case EquipmentTypes.ball:
      return <Ball equipment={equipment} />;
    default:
      return null;
  }
};
