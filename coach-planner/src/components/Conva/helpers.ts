import { updateExercise, uploadBlob } from '../../db/exercises';
import { DrawObjectsState } from '../../store/slices/constants';

export const findNearestPoint = (x: number, y: number, points: number[]) => {
  let pointIndex = 0;
  let abs = Number.MAX_VALUE;
  points.forEach((elem, index, arr) => {
    if (index % 2 === 0) {
      const middlePoint = Math.abs(elem - x) + Math.abs(arr[index + 1] - y);
      if (middlePoint < abs) {
        pointIndex = index;
        abs = middlePoint;
      }
    }
  });
  return pointIndex;
};

export type AllDrawType = Omit<DrawObjectsState, 'current'>;

export const loadFile = async (file: Blob, id: string | undefined, conva: AllDrawType) => {
  if (id) {
    const img = await uploadBlob(file, id);
    await updateExercise(id, { img, conva });
  }
};
