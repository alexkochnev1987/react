import { addDocOpenExercise, deleteDocOpenExercise } from '@/repository/openExercise';
import { ExerciseForPage } from './parseExerciseResponse';

export const addExerciseInOpenFolder = async (exercise: ExerciseForPage) => {
  try {
    await addDocOpenExercise(exercise);
  } catch (error) {
    throw error;
  }
};

export const deleteExerciseFromOpenFolder = async (id: string) => {
  try {
    await deleteDocOpenExercise(id);
  } catch (error) {
    throw error;
  }
};
