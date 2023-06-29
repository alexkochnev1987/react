// import { TextField } from "@mui/material";
// import { Control, Controller, FieldErrors } from "react-hook-form";
// import { UpdateExerciseBody } from "../../../db/exercises";
// import { FormFields, errorMessage } from "./constants";

// export const InputComponent = ({
//   x,
//   control,
//   errors,
// }: {
//   errors: FieldErrors<UpdateExerciseBody>;
//   x: FormFields;
//   control: Control<UpdateExerciseBody, any>;
// }) => {
//   return (
//     <>
//       <Controller
//         name={x.name}
//         control={control}
//         rules={x.rules}
//         render={({ field }) => (
//           <TextField
//             sx={x.name === "img" ? { display: "none" } : { width: "100%" }}
//             {...field}
//             error={!!errors[x.name]}
//             label={x.placeholder}
//           />
//         )}
//       />
//       {errors[x.name] && (
//         <p
//           style={x.name === "img" ? { display: "none" } : { color: "red" }}
//           role="alert"
//         >
//           {errorMessage}
//         </p>
//       )}
//     </>
//   );
// };
