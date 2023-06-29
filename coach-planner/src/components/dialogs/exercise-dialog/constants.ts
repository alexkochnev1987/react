import { UpdateExerciseBody } from '../../../db/constants';

export const selectOptions = ['female', 'male', 'other', 'untagged'];
export type FormKeyArray = keyof UpdateExerciseBody;
export interface FormFields {
  name: FormKeyArray;
  placeholder: string;
  options?: string[];
  rules: { [key: string]: boolean | string };
}

export const ExerciseFormFields1: FormFields[] = [
  { name: 'img', placeholder: 'Image', rules: { required: false } },
  {
    name: 'description',
    placeholder: 'Description',
    rules: { required: false },
  },
  { name: 'keyPoints', placeholder: 'Key Points', rules: { required: false } },
  {
    name: 'tag',
    placeholder: 'Tag',
    rules: { required: false },
    options: selectOptions,
  },
];
export const ExerciseFormFields2: FormFields[] = [
  { name: 'name', placeholder: 'Name', rules: { required: true } },
  { name: 'age', placeholder: 'Age', rules: { required: false } },
  { name: 'link', placeholder: 'Link', rules: { required: false } },
];
export const errorMessage = 'Field is required';
