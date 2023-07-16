import { Ball } from '@/entities/Conva/equipment/Ball';
import { Cone } from '@/entities/Conva/equipment/Cone';
import { Goal } from '@/entities/Conva/equipment/Golal';
import { Puck } from '@/entities/Conva/equipment/Puck';
import { Stick } from '@/entities/Conva/equipment/Stick';
import { Tire } from '@/entities/Conva/equipment/Tire';
import { Equipment, EquipmentTypes } from '@/store/slices/constants';

export const selectEquipment = (equipment: Equipment) => {
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
    case EquipmentTypes.goal:
      return <Goal equipment={equipment} key={equipment.id} />;
    default:
      return null;
  }
};
