import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const InputAdornmentComponent = ({
  show,
  handleMouseDownPassword,
  handleClickShowPassword,
}: {
  show: boolean;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleClickShowPassword: () => void;
}) => {
  return (
    <InputAdornment position="start">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};
