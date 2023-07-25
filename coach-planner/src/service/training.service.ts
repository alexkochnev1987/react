import { ExerciseParamsDefault } from '@/components/exercise-params/constants';
import { ExerciseResponse, TrainingExerciseData, TrainingResponse } from '@/db/constants';
import { TrainingRepo } from '@/repository/training';
import { v4 as uuidv4 } from 'uuid';

export const getTrainingById = async (id: string) => {
  try {
    const training = await TrainingRepo.getTrainingById(id);
    return { id: training.id, ...training.data() } as TrainingResponse;
  } catch (error) {
    throw error;
  }
};

export const createTraining = async () => {
  try {
    const training = await TrainingRepo.createTraining({ name: 'Enter Training name' });
    return training.id;
  } catch (error) {
    throw error;
  }
};

export const deleteTraining = (trainingId: string) => {
  try {
    TrainingRepo.deleteTraining(trainingId);
  } catch (error) {
    throw error;
  }
};

export const updateTraining = async (id: string, training: Partial<TrainingResponse>) => {
  try {
    TrainingRepo.updateTraining(id, training);
  } catch (error) {
    throw error;
  }
};

export const addExerciseInTraining = async (exercise: ExerciseResponse, id: string) => {
  try {
    const { exercises } = await getTrainingById(id);
    const newArray = Array.isArray(exercises)
      ? [...exercises, { exercise, params: ExerciseParamsDefault, uuid: uuidv4() }]
      : [{ exercise, params: ExerciseParamsDefault, uuid: uuidv4() }];
    await updateTraining(id, { exercises: newArray });
  } catch (error) {
    throw error;
  }
};

export const updateExerciseInTraining = async (exercise: TrainingExerciseData, id: string) => {
  try {
    const { exercises } = await getTrainingById(id);
    const newArray = [...exercises].map((x) => (x.uuid === exercise.uuid ? exercise : x));
    await updateTraining(id, { exercises: newArray });
  } catch (error) {
    throw error;
  }
};

export const deleteExerciseInTraining = async (uuid: string, id: string) => {
  try {
    const { exercises } = await getTrainingById(id);
    const newArray = [...exercises].filter((x) => x.uuid !== uuid);
    await updateTraining(id, { exercises: newArray });
  } catch (error) {
    throw error;
  }
};

export const shiftExerciseRight = (exercises: TrainingExerciseData[], exerciseUuid: string) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index < exercises.length - 1) {
    const arr = [...exercises];
    const temp = arr[index];
    arr[index] = arr[index + 1];
    arr[index + 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExerciseLeft = (exercises: TrainingExerciseData[], exerciseUuid: string) => {
  const index = exercises.findIndex((x) => x.uuid === exerciseUuid);
  if (index > 0) {
    const arr = [...exercises];
    const temp = arr[index];
    arr[index] = arr[index - 1];
    arr[index - 1] = temp;
    return arr;
  }
  return exercises;
};

export const shiftExerciseUp = async (trainingId: string, uuidExercise: string) => {
  try {
    const { exercises } = await getTrainingById(trainingId);
    const newArray = shiftExerciseLeft(exercises, uuidExercise);
    await updateTraining(trainingId, { exercises: newArray });
  } catch (error) {
    throw error;
  }
};

export const shiftExerciseDown = async (trainingId: string, uuidExercise: string) => {
  try {
    const { exercises } = await getTrainingById(trainingId);
    const newArray = shiftExerciseRight(exercises, uuidExercise);
    await updateTraining(trainingId, { exercises: newArray });
  } catch (error) {
    throw error;
  }
};
