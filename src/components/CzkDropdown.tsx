import Select from "react-select";

const options = [{ value: "CZK", label: "CZK" }];

export const CzkDropdown = () => {
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
    </>
  );
};
