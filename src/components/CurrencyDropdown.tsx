import Select from "react-select";

export const CurrencyDropdown = () => {
  const options = [
    { value: "USD", label: "USD" },
    { value: "EUR", label: "EUR" },
    { value: "GBP", label: "GBP" },
  ];

  return (
    <Select
      classNamePrefix="select"
      defaultValue={options[0]}
      isLoading={false}
      isClearable={false}
      isSearchable={true}
      name="targetCurrency"
      options={options}
    />
  );
};
