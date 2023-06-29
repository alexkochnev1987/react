// import { Button } from "@mui/material";

// const maxFileSize = 10_000_000;

// export const UploadFile = ({
//   loadFile,
// }: {
//   loadFile: (file: File) => void;
// }) => {
//   const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       if (files[0].size > maxFileSize) throw Error();
//       loadFile(files[0]);
//     }
//   };

//   return (
//     <Button variant="contained" component="label" sx={{ width: "80px" }}>
//       Upload
//       <input
//         hidden
//         style={{ width: "10px" }}
//         accept="image/*, .png, .jpg, .web"
//         type="file"
//         onChange={onFileChange}
//       />
//     </Button>
//   );
// };
