import React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Chart } from '../../training/Chart';
import { countEnergySupplyTime } from '../../../utils/countEnergySupplyTime';
import { type DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { getTrainingRef } from '../../../db/trainings';
import { TrainingResponse } from '../../../db/constants';

export const LoadTrainingParams = ({ id }: { id: string }) => {
  const [training] = useDocument(getTrainingRef(id));
  const parseDocData = (value: DocumentSnapshot<DocumentData>) =>
    ({ id: value.id, ...value.data() } as TrainingResponse);
  if (training) {
    return <Chart params={countEnergySupplyTime(parseDocData(training).exercises)} />;
  }

  return null;
};
