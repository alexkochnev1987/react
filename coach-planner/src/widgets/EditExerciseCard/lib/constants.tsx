import { ExerciseResponse } from '@/db/constants';

export const tagOptions = ['1x0', '1x1', '2x1', '2x2', '3x2', 'skating', 'scoring'];
export const deleteDialogContent = {
  title: 'Вы хотите удалить упражнение',
  message: 'Упражнение будет удалено безвозвратно',
  submit: 'Подтвердить',
  cancel: 'Отмена',
};

export const ageOptions = ['8', '9', '10', '11', '12'];

export const editContentFieldArray: { label: string; field: keyof ExerciseResponse }[] = [
  { label: 'Description', field: 'description' },
  { label: 'Key points', field: 'keyPoints' },
];

export const editTagsFieldArray: { label: string; field: keyof ExerciseResponse; defaultTags: string[] }[] = [
  { label: 'Tag', field: 'tag', defaultTags: tagOptions },
  { label: 'Age', field: 'age', defaultTags: ageOptions },
];
