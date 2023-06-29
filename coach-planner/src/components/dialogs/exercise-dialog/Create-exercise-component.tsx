// import { ShowImage } from "./Show-image";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { ExerciseFormFields1, ExerciseFormFields2 } from "./constants";
// import { InputComponent } from "./Input-component";
// import { Button, Grid } from "@mui/material";

// interface CreateExerciseProps {
//   exercise: ExerciseResponse;
//   submit: (x: UpdateExerciseBody) => void;
// }

// const initialValue: UpdateExerciseBody = {
//   img: "",
//   name: "",
//   description: "",
//   keyPoints: "",
//   tag: ["untagged"],
//   age: [],
//   link: "",
// };

// export const CreateExerciseComponent = (props: CreateExerciseProps) => {
//   const { exercise, submit } = props;

//   const { tag } = { ...initialValue, ...exercise };
//   const {
//     handleSubmit,
//     setValue,
//     control,
//     formState: { errors },
//   } = useForm<UpdateExerciseBody>({
//     defaultValues: { ...initialValue, ...exercise },
//     mode: "all",
//   });
//   const onSubmit: SubmitHandler<UpdateExerciseBody> = (data) => {
//     submit(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={1} padding={1}>
//         {ExerciseFormFields1.map((x) => {
//           if (x.name === "img")
//             return (
//               <Grid container item spacing={1} xs={12} key={x.name}>
//                 <Grid item xs={12} sm={6}>
//                   <ShowImage
//                     setValue={setValue}
//                     idExercise={exercise.id}
//                     // exerciseImage={exercise?.img}
//                   />
//                 </Grid>
//                 <Grid item container xs={12} sm={6} spacing={1}>
//                   {ExerciseFormFields2.map((x) => {
//                     return (
//                       <Grid item xs={12} key={x.name}>
//                         <InputComponent
//                           control={control}
//                           x={x}
//                           errors={errors}
//                         />
//                       </Grid>
//                     );
//                   })}
//                 </Grid>
//               </Grid>
//             );
//           if (x.name === "tag" && x.options) {
//             return (
//               <Grid item xs={12} key={x.name}>
//                 <SelectComponent tag={tag} control={control} x={x} />
//               </Grid>
//             );
//           }

//           return (
//             <Grid item xs={12} sm={6} md={4} key={x.name}>
//               <InputComponent control={control} x={x} errors={errors} />
//             </Grid>
//           );
//         })}
//         <Grid item xs={12} container justifyContent="center">
//           <Button type="submit" variant="contained" color="success">
//             Save
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// };
