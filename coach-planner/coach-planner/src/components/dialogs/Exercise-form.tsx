import React, { useEffect, useState } from "react";
import {
  updateExercise,
  UpdateExerciseBody,
  uploadImg,
} from "../../db/exercises";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { UploadFile } from "./Upload-file";
import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Button,
  Chip,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SelectComponent } from "./Select-component";
import { InputComponent } from "./Input-component";

export type FormKeyArray = keyof UpdateExerciseBody;
export interface FormFields {
  name: FormKeyArray;
  placeholder: string;
  options?: string[];
  rules: { [key: string]: boolean | string };
}

const selectOptions = ["female", "male", "other", "untagged"];

const ExerciseFormFields: FormFields[] = [
  { name: "img", placeholder: "Image", rules: { required: true } },
  { name: "name", placeholder: "Name", rules: { required: true } },
  {
    name: "description",
    placeholder: "Description",
    rules: { required: false },
  },
  { name: "keyPoints", placeholder: "Key Points", rules: { required: false } },
  {
    name: "tag",
    placeholder: "Tag",
    rules: { required: false },
    options: selectOptions,
  },
  { name: "age", placeholder: "Age", rules: { required: false } },
  { name: "link", placeholder: "Link", rules: { required: false } },
];

export const errorMessage = "Field is required";

export const ExerciseForm = ({
  exercise,
  submit,
  idExercise,
}: {
  exercise?: UpdateExerciseBody | undefined;
  submit: (x: UpdateExerciseBody) => void;
  idExercise: string;
}) => {
  const initialValue: UpdateExerciseBody = {
    img: "",
    name: "",
    description: "",
    keyPoints: "",
    tag: ["untagged"],
    age: [],
    link: "",
  };

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm<UpdateExerciseBody>({
    defaultValues: { ...initialValue, ...exercise },
    mode: "all",
  });
  const onSubmit: SubmitHandler<UpdateExerciseBody> = (data) => {
    submit(data);
  };
  const [image, setImage] = useState("");
  const [loadImage, setLoadImage] = useState(false);

  const { tag } = { ...initialValue, ...exercise };

  const loadFile = (file: File) => {
    setLoadImage(true);
    uploadImg(file, idExercise)
      .then((img) => {
        setImage(img);
        setValue("img", img);
      })
      .finally(() => setLoadImage(false));
  };
  const [selectValue, setSelectValue] = useState<
    (string | undefined)[] | string
  >();

  useEffect(() => {
    const subscription = watch((value) => setSelectValue(value.tag));
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <UploadFile loadFile={loadFile} />
      {loadImage ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : image ? (
        <img src={image} alt="exercise image" />
      ) : (
        exercise?.img && <img src={exercise.img} alt="exercise image" />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          {ExerciseFormFields.map((x) => {
            if (x.name === "tag" && x.options) {
              return (
                <SelectComponent
                  tag={tag}
                  control={control}
                  x={x}
                  key={x.name}
                  selectValue={selectValue}
                />
              );
            }
            return (
              <InputComponent
                key={x.name}
                control={control}
                x={x}
                errors={errors}
              />
            );
          })}
          <Button type="submit" variant="contained" color="success">
            Save
          </Button>
        </>
      </form>
    </>
  );
};
