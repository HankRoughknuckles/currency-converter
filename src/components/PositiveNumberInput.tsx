import { ChangeEvent, forwardRef } from "react";
import styled from "styled-components";
import { isPositiveNumberString } from "../lib/number.ts";

const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  text-align: center;
`;

interface Props {
  value: string;
  disabled?: boolean;
  onChange: (input: string) => void;
}

/**
 * A text input that only accepts positive numbers.
 * This is preferred to using the React input with type
 * "number" because there are bugs there (i.e. - you
 * can enter "-" by itself)
 **/
export const PositiveNumberInput = forwardRef<HTMLInputElement, Props>(
  ({ value, disabled = false, onChange }, ref) => {
    const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
      const value = input.target.value;

      if (value === "" || isPositiveNumberString(value)) {
        onChange(input.target.value);
      }
    };

    return (
      <StyledInput
        type="text"
        ref={ref}
        placeholder={"0.000"}
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    );
  },
);
