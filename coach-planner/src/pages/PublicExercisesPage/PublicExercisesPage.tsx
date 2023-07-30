import { SearchBar } from '@/features/SearchBar/ui/SearchBar';
import { FC } from 'react';
import { HandleDataWrapper } from '../PageWrappers/HandleDataWrapper';
import { usePublicExercises } from './usePublicExercises';
import { PublicExerciseCard } from './PublicExerciseCard';

interface PublicExercisesPageProps {}

const PublicExercisesPage: FC<PublicExercisesPageProps> = ({}) => {
  const { exercises, loading, error } = usePublicExercises();
  return (
    <HandleDataWrapper loading={loading} error={error}>
      <SearchBar />
      {exercises.length > 0 &&
        exercises.map((exercise) => <PublicExerciseCard key={exercise.id} exercise={exercise} />)}
    </HandleDataWrapper>
  );
};

export default PublicExercisesPage;
