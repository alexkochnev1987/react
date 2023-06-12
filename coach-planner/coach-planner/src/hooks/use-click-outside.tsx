import { SelectProps } from "@mui/material/Select";
import { SelectInputProps } from "@mui/material/Select/SelectInput";
import { useCallback, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  selectRef: React.RefObject<SelectProps<SelectInputProps>>
): void => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const select = selectRef.current?.MenuProps;

      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};
