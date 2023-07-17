import { useDocument } from 'react-firebase-hooks/firestore';
import { Training } from '../components/training/Training';
import { useParams } from 'react-router-dom';
import { getTrainingRef } from '../db/trainings';
import { CircularProgress, Stack, SwipeableDrawer, Typography } from '@mui/material';
import { TrainingResponse } from '../db/constants';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';
import { FirebaseError } from '@/components/Firebase-error';
import { Chart } from '@/components/training/Chart';
import { countEnergySupplyTime } from '@/utils/countEnergySupplyTime';
import { DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { TrainingCardHeader } from '@/components/training/Training-card-header';

const TrainingPage = () => {
  const { id } = useParams();
  const userUiid = useAppSelector(selectUser);
  const [value, loading, error] = useDocument(getTrainingRef(userUiid, id));

  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    return <FirebaseError error={error} />;
  }

  // const transformValueToTraining = (data: DocumentSnapshot<DocumentData>) => {
  //   return { id: data.id, ...data.data() } as TrainingResponse;
  // };

  return (
    <>
      {value && (
        <>
          {/* <Chart params={countEnergySupplyTime(transformValueToTraining(value).exercises)} /> */}
          <Training training={{ id: value.id, ...value.data() } as TrainingResponse} />
        </>
      )}
    </>
  );
};

export default TrainingPage;
