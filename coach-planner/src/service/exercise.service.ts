import { UpdateExerciseBody } from '../db/constants';
import { ExerciseForPage, parseExerciseResponse } from './parseExerciseResponse';
import {
  addDocExercise,
  deleteExerciseAndImageDoc,
  getDocExerciseById,
  getUserDocsExercises,
  updateDocExercise,
  uploadExerciseBlob,
} from '@/repository/exercise';

export const createExercise = async (coachImage?: string | null | undefined) => {
  try {
    const image = coachImage || '';
    const result = await addDocExercise({ coachImage: image });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getExerciseById = async (id: string): Promise<ExerciseForPage> => {
  try {
    const response = await getDocExerciseById(id);
    return parseExerciseResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getUserExercises = async (): Promise<ExerciseForPage[]> => {
  try {
    const exerciseUserCollection = await getUserDocsExercises();
    return exerciseUserCollection.docs.map(parseExerciseResponse);
  } catch (error) {
    throw error;
  }
};

export const updateExercise = async (
  id: string,
  exercise: Partial<UpdateExerciseBody>,
): Promise<void> => {
  try {
    await updateDocExercise(id, exercise);
  } catch (error) {
    throw error;
  }
};

export const deleteExercise = async (id: string): Promise<void> => {
  try {
    await deleteExerciseAndImageDoc(id);
  } catch (error) {
    throw error;
  }
};

export const uploadBlob = async (
  file: Blob,
  id: string,
): Promise<{
  img: string;
  link: string;
}> => {
  try {
    const response = await uploadExerciseBlob(file, id);
    return response;
  } catch (error) {
    throw error;
  }
};
