import { Equipment, EquipmentTypes } from '../../store/slices/constants';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentId } from '../../store/slices/draw-objects-slice';
import { selectColor } from '../../store/slices/canvas-slice';
import { KonvaEventObject } from 'konva/lib/Node';
import { WrapperEquipment } from './equipment/Wrapper-equipment';
import { Cone } from './equipment/Cone';
import { Puck } from './equipment/Puck';
import { Stick } from './equipment/Stick';
import { Tire } from './equipment/Tire';
import { Ball } from './equipment/Ball';

export const EquipmentComponent = ({ equipment }: { equipment: Equipment }) => {
  const current = useAppSelector(selectCurrentId);
  const color = useAppSelector(selectColor);
  //   const playerType = useAppSelector(selectPlayerType);
  const props = {
    x: equipment.point[0],
    y: equipment.point[1],
    draggable: true,
    onMouseOver: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      //   e.currentTarget._setAttr('strokeWidth', 4);
    },
    onMouseOut: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      //   if (current !== player.id) e.currentTarget._setAttr('strokeWidth', 2);
    },
  };

  //   useEffect(() => {
  //     if (current === equipment.id) {
  //       dispatch(setColor(color));
  //     }
  //   }, [current, dispatch, color, equipment.id]);
  //   useEffect(() => {
  //     if (current === equipment.id) {
  //     //   dispatch(setPlayerType(playerType));
  //     }
  //   }, [current, dispatch, playerType, player.id]);

  const getTypeEquipment = (equipment: Equipment) => {
    switch (equipment.type) {
      case EquipmentTypes.cone:
        return <Cone equipment={equipment} />;
      case EquipmentTypes.puck:
        return <Puck />;
      case EquipmentTypes.stick:
        return <Stick />;
      case EquipmentTypes.tire:
        return <Tire equipment={equipment} />;
      case EquipmentTypes.ball:
        return <Ball />;
      default:
        return null;
    }
  };

  return (
    <>
      <WrapperEquipment equipment={equipment} current={current}>
        {getTypeEquipment(equipment)}
      </WrapperEquipment>
    </>
  );
};
