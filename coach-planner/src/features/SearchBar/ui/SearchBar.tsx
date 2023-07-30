import React, { ChangeEvent, ReactNode, useState } from 'react';
import { Box, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SearchInput } from '@/shared/ui/SearchInput';
import { CustomUser } from '../../../service/user.service';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FirebaseError } from '../../../widgets/FirebaseError';
import { type DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { includeStringValue } from '../lib/helpers';
import { getUserCollection } from '@/repository/user';

export const SearchBar = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const nullHints = 'Coaches not found';
  const radioLabel = 'Filter By';
  const placeholder = 'Search coach by name';
  const [value, setValue] = useState<string>('');
  const onResetSearch = () => {
    setValue('');
  };
  const [filterBy, setFilterBy] = useState('name');
  const [users, loading, error] = useCollection(getUserCollection());

  const onChangeInput = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  if (error) return <FirebaseError message={error.message} />;

  const reduceFunction = (
    previousValue: JSX.Element[],
    currentValue: QueryDocumentSnapshot<DocumentData>,
  ) => {
    const user = { ...currentValue.data() } as CustomUser;
    const element = (
      <Typography align="left" variant="body1" key={currentValue.id}>
        {`${user.name} ${user.surName}`}
      </Typography>
    );

    if (filterBy === 'name') {
      return includeStringValue(user.name, value) || includeStringValue(user.surName, value)
        ? [...previousValue, element]
        : previousValue;
    }
    return includeStringValue(user.team, value) ? [...previousValue, element] : previousValue;
  };

  const checkArrayLength = (arr: JSX.Element[] | undefined) =>
    arr && arr.length > 0 ? (
      arr
    ) : (
      <Typography align="left" variant="body1">
        {nullHints}
      </Typography>
    );

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        minWidth: 500,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        navigate(value);
      }}
    >
      <Box
        sx={{ display: 'flex', gap: '10px' }}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography align="left" variant="body1">
          {radioLabel}
        </Typography>
        <RadioGroup row value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <FormControlLabel value="name" control={<Radio />} label="Name" />
          <FormControlLabel value="team" control={<Radio />} label="Team" />
        </RadioGroup>
        {children}
      </Box>

      <SearchInput
        loading={loading}
        value={value}
        onChange={onChangeInput}
        onReset={onResetSearch}
        placeholder={placeholder}
      />
      {value && checkArrayLength(users?.docs.reduce(reduceFunction, [] as JSX.Element[]))}
    </Paper>
  );
};
