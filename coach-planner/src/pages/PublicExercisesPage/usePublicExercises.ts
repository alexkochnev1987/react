import { RoutePath } from '@/app/providers/RouterProvider/config/constants';
import { getOpenExerciseCollection } from '@/repository/openExercise';
import { createExercise, updateExercise } from '@/service/exercise.service';
import { ExerciseForPage } from '@/service/parseExerciseResponse';
import { useAppDispatch } from '@/store/hooks';
import { setImageNull } from '@/store/slices/draw-objects-slice';
import { serverTimestamp } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useNavigate } from 'react-router-dom';

export const usePublicExercises = () => {
  const [value, loading, error] = useCollection(getOpenExerciseCollection());

  const exercises =
    value?.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ExerciseForPage)) ||
    ([] as ExerciseForPage[]);

  return { exercises, loading, error };
};

export const usePublicExerciseCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const saveAndGoToExercise = async (exercise: ExerciseForPage) => {
    const {
      img = '',
      name = '',
      age = [],
      conva,
      description = '',
      imgRef = '',
      tag = [],
      link = '',
      coachId = '',
      coachImage = '',
      keyPoints = '',
      like = '',
      dislike = '',
    } = exercise;

    const newExercise = await createExercise();

    await updateExercise(newExercise.id, {
      img,
      name,
      age,
      conva,
      description,
      tag,
      link,
      coachImage,
      keyPoints,
    });

    dispatch(setImageNull());
    if (newExercise) {
      navigate(`${RoutePath.exercise}/${newExercise?.id}`);
    }
  };

  return { saveAndGoToExercise };
};
