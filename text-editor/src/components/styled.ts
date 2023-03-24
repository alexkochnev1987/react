import styled from 'styled-components';

export enum ElementColors {
  submitButtonBackground = 'green',
  cancelButtonBackground = 'red',
  buttonTextColor = 'white',
}

export const Button = styled.button<{ color: string }>`
  background: ${(props) => props.color};
  color: ${ElementColors.buttonTextColor};
  height: 30px;
  border-radius: 8px;
  padding: 5px;
`;

export const Search = styled.input`
  border: 1px solid black;
  height: 40px;
  border-radius: 5px;
`;
