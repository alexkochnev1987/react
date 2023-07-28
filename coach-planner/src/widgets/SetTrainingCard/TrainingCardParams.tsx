import { TrainingResponse } from '@/db/constants';
import { updateTraining } from '@/db/trainings';
import { parseDate } from '@/shared/lib/parseDate';
import { DescriptionField } from '@/shared/ui/DescriptionField';
import { EditTrainingTags } from '@/shared/ui/EditTrainingTag';
import { countEnergySupplyTime } from '@/utils/countEnergySupplyTime';
import { Box, Chip, Fab, Grid, TextField, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { ageOptions, tagOptions } from '../EditExerciseCard/lib/constants';
import { EditTrainingField } from '@/shared/ui/EditTrainingField';
import { ExpandText } from '@/shared/ui/ExpandText';

interface TrainingCardParamsProps {
  training: TrainingResponse;
  color?: string;
  children?: ReactNode;
}

export const TrainingCardParams: FC<TrainingCardParamsProps> = ({ children, training, color }) => {
  const updateMyTraining = (content: string | string[], fieldName: string) => {
    updateTraining(training.id, { [fieldName]: content });
  };

  const updateTrainingName = (name: string) => updateMyTraining(name, 'name');
  const updateDescription = (description: string) => updateMyTraining(description, 'description');
  const updateTrainingAge = (name: string[]) => updateMyTraining(name, 'age');
  const updateTrainingTags = (name: string[]) => updateMyTraining(name, 'tag');
  const totalTime = Object.values(countEnergySupplyTime(training.exercises)).reduce(
    (prev, curr) => prev + curr,
    0,
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Box display={'flex'} justifyContent={'space-between'} height={45}>
          {children}
          <EditTrainingField
            label={'Name'}
            startValue={training.name || ''}
            onSubmit={updateTrainingName}
          >
            <Typography variant="h4" color={color} textAlign={'start'}>
              {training.name || 'NAME NOT FOUND'}
            </Typography>
          </EditTrainingField>

          <TextField
            sx={{ width: '125px' }}
            size={'small'}
            label="Total time min"
            variant="outlined"
            value={totalTime}
            disabled
          />
        </Box>

        <ExpandText label="Options">
          <Grid spacing={1} container>
            <Grid item xs={6}>
              <DescriptionField label="Created" data={parseDate(training.create?.toDate())} />
            </Grid>
            <Grid item xs={6}>
              {training.modify && (
                <DescriptionField label="Modify" data={parseDate(training.modify?.toDate())} />
              )}
            </Grid>
          </Grid>
          <Grid spacing={1} container>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <EditTrainingTags
                label="Tag"
                tagOptions={tagOptions}
                onSubmit={updateTrainingTags}
                startValue={training.tag}
              >
                <DescriptionField label="Tag">
                  {training.tag?.map((tag) => (
                    <Chip label={tag} key={tag} size="small" />
                  ))}
                </DescriptionField>
              </EditTrainingTags>
            </Grid>
            <Grid item>
              <EditTrainingField
                small
                label={'Description'}
                startValue={training.description || ''}
                onSubmit={updateDescription}
              >
                <DescriptionField label="Description" data={training.description} />
              </EditTrainingField>
            </Grid>
          </Grid>

          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}></Box>
        </ExpandText>
      </Grid>
    </Grid>
  );
};
