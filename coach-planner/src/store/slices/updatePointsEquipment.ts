import { DrawObjectsState, Equipment } from './constants';

export const updatePointsEquipment = (equipment: Record<string, Equipment>, difference: number) => {
  const newEquipment = Object.values(equipment).map((item) => {
    const { x, y } = item.scale ? item.scale : { x: 1, y: 1 };
    const newScale = { x: x * difference, y: y * difference };
    const newItem: Equipment = {
      ...item,
      point: item.point.map((point) => point * difference),
      scale: newScale,
    };
    return newItem;
  });
  return newEquipment.reduce((prev, curr) => {
    prev[curr.id] = curr;
    return prev;
  }, {} as Record<string, Equipment>);
};
