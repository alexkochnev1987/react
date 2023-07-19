import { TrainingResponse } from '@/db/constants';
import { updateTraining } from '@/db/trainings';
import { parseDate } from '@/shared/lib/parseDate';
import { DescriptionField } from '@/shared/ui/DescriptionField';
import { EditTrainingTags } from '@/shared/ui/EditTrainingTag';
import { countEnergySupplyTime } from '@/utils/countEnergySupplyTime';
import { Box, Chip, Grid, TextField, Typography } from '@mui/material';
import { FC } from 'react';
import { ageOptions, tagOptions } from '../EditExerciseCard/lib/constants';
import { EditTrainingField } from '@/shared/ui/EditTrainingField';

interface TrainingCardParamsProps {
  training: TrainingResponse;
  color?: string;
}

export const TrainingCardParams: FC<TrainingCardParamsProps> = ({ training, color }) => {
  const updateMyTraining = (content: string | string[], fieldName: string) => {
    updateTraining(training.coachId, training.id, { [fieldName]: content });
  };

  const updateTrainingName = (name: string) => updateMyTraining(name, 'name');
  const updateDescription = (description: string) => updateMyTraining(description, 'description');
  const updateTrainingAge = (name: string[]) => updateMyTraining(name, 'age');
  const updateTrainingTags = (name: string[]) => updateMyTraining(name, 'tag');
  const totalTime = Object.values(countEnergySupplyTime(training.exercises)).reduce((prev, curr) => prev + curr, 0);
  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Box display={'flex'} justifyContent={'space-between'} height={60}>
          <EditTrainingField label={'Name'} startValue={training.name || ''} onSubmit={updateTrainingName}>
            <Typography variant="h4" color={color} textAlign={'start'}>
              {training.name || 'NAME NOT FOUND'}
            </Typography>
          </EditTrainingField>

          <TextField
            sx={{ width: '55px' }}
            size={'small'}
            label="Total"
            variant="outlined"
            value={totalTime}
            disabled
          />
        </Box>
        <Box display={'flex'} justifyContent={'space-between'}>
          <DescriptionField label="Created" data={parseDate(training.create.toDate())} />
          {training.modify && <DescriptionField label="Modify" data={parseDate(training.modify?.toDate())} />}
        </Box>

        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <EditTrainingTags
            label={'Age'}
            tagOptions={ageOptions}
            startValue={training.age}
            onSubmit={updateTrainingAge}
          >
            <DescriptionField label="Age">
              {training.age?.map((age) => (
                <Chip label={age} key={age} size="small" />
              ))}
            </DescriptionField>
          </EditTrainingTags>
          <EditTrainingTags label="Tag" tagOptions={tagOptions} onSubmit={updateTrainingTags} startValue={training.tag}>
            <DescriptionField label="Tag">
              {training.tag?.map((tag) => (
                <Chip label={tag} key={tag} size="small" />
              ))}
            </DescriptionField>
          </EditTrainingTags>
        </Box>

        <EditTrainingField
          small
          label={'Description'}
          startValue={training.description || ''}
          onSubmit={updateDescription}
        >
          <Box
            sx={{
              textOverflow: 'auto',
              overflow: 'auto',
              height: '100%',
              maxHeight: '50px',
              width: '100%',
            }}
          >
            <DescriptionField label="Description" data={training.description} />
          </Box>
        </EditTrainingField>
      </Grid>
    </Grid>
  );
};
