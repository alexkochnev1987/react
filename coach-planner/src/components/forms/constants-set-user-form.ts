import * as yup from 'yup';

export const setUserSchema = yup.object({
  name: yup.string().min(3).max(100).required(),
  surName: yup.string().max(100),
  team: yup.string().max(100),
  age: yup.number().min(0).max(140),
});

export type SetUserFormData = yup.InferType<typeof setUserSchema>;

export interface SetUserFields {
  name: 'name' | 'surName' | 'team' | 'age';
  label: string;
  type: string;
  hint: string;
}

export const SetUserFields: SetUserFields[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'string',
    hint: 'Allowed letters, symbols and numbers',
  },
  {
    name: 'surName',
    label: 'Surname',
    type: 'string',
    hint: 'Allowed letters, symbols and numbers',
  },
  {
    name: 'team',
    label: 'Team',
    type: 'string',
    hint: 'Allowed only numbers min 0 max 140',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    hint: 'Allowed only numbers min 0 max 140',
  },
];

export const setUserDefaultData = {
  name: '',
  surName: '',
  team: '',
  age: 18,
};
