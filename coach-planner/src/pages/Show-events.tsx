import { useDocument } from 'react-firebase-hooks/firestore';
import { ShowCalendar } from '../components/Calendar/Show-calendar';
import { useParams } from 'react-router-dom';
import { getPlanDocRef, updatePlan } from '../db/plans';
import { Card, CardHeader } from '@mui/material';
import { EditContent } from '../features/EditContent/ui/Edit-content';
import { AllDrawType } from '@/features/DrawExercise/lib/helpers';
import { Timestamp } from 'firebase/firestore';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/slices/userSlice';

const ShowEvents = () => {
  const params = useParams();
  const userUiid = useAppSelector(selectUser);
  const id = params.id as string;
  const [calendar] = useDocument(getPlanDocRef(userUiid, id));
  const editPlanName = (name: string | string[] | AllDrawType | undefined | Timestamp) => {
    if (name && typeof name === 'string') updatePlan(userUiid, id, name);
  };

  return (
    <Card>
      {calendar && (
        <CardHeader
          title={
            <EditContent
              label={'Plan name'}
              callback={editPlanName}
              value={(calendar?.data() as { name: string }).name}
            />
          }
        />
      )}
      <div style={{ height: '100vh' }}>
        <ShowCalendar planId={id} />
      </div>
    </Card>
  );
};

export default ShowEvents;
