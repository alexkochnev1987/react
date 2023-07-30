import { AllDrawType } from '../features/DrawExercise/lib/helpers';
import { IExerciseParams } from '../components/exercise-params/constants';
import { Timestamp } from 'firebase/firestore';

export enum DbCollections {
  exercises = 'exercises',
  trainings = 'trainings',
  plans = 'plans',
  events = 'events',
  users = 'users',
  openExercise = 'openExercise',
}

export interface ExerciseResponse {
  id: string;
  like?: string[];
  dislike?: string[];
  coachId: string;
  name: string;
  img: string;
  description?: string;
  keyPoints?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  create: Timestamp;
  modify?: Timestamp;
  coachImage?: string;
  conva?: AllDrawType;
  imgRef?: string;
  open?: boolean;
}

export type ExerciseResponseKeys = keyof ExerciseResponse;

export interface UpdateExerciseBody {
  img: string;
  name: string;
  description?: string;
  keyPoints?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  coachImage?: string;
  conva?: AllDrawType;
  open?: boolean;
}

export interface TrainingExerciseData {
  exercise: ExerciseResponse;
  params: IExerciseParams;
  uuid: string;
}

export interface TrainingResponse {
  id: string;
  like?: string[];
  dislike?: string[];
  coachId: string;
  name?: string;
  description?: string;
  comments?: string;
  tag?: string[];
  age?: string[];
  link?: string;
  create: Timestamp;
  modify?: Timestamp;
  coachImage?: string;
  exercises: TrainingExerciseData[];
}

export interface CreateTrainingRequest {
  coachId: string;
  coachImage?: string;
  name: string;
}
