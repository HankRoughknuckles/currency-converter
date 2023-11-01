import Select from "react-select";
import { StyledInput } from "./StyledInput.tsx";

const options = [{ value: "CZK", label: "CZK" }];

export const CzkInput = () => {
  // TODO: use CurrencyDropdown instaed of copy/pasting the Select
  return (
    <>
      <Select
        classNamePrefix="select"
        defaultValue={options[0]}
        isLoading={false}
        isClearable={false}
        isSearchable={false}
        name="targetCurrency"
        options={options}
      />
      <StyledInput />
    </>
  );
};
