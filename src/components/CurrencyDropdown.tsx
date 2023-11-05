import Select from "react-select";
import { useExchangeRateContext } from "../hooks/useExchangeRate.tsx";
import { useCallback, useMemo } from "react";

type Option = { value: string; label: string };

export const CurrencyDropdown = () => {
  const { isPending, data, selectedCurrencyCode, setSelectedCurrencyCode } =
    useExchangeRateContext();

  const options = useMemo(() => {
    return (data ?? []).map((currencyInfo) => ({
      value: currencyInfo.code,
      label: `${currencyInfo.code} (${currencyInfo.country})`,
    }));
  }, [data]);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === selectedCurrencyCode);
  }, [options, selectedCurrencyCode]);

  const onChange = useCallback(
    (option: Option | null) => {
      if (option === null) return;
      setSelectedCurrencyCode(option.value);
    },
    [setSelectedCurrencyCode],
  );

  return (
    <Select
      classNamePrefix="select"
      isLoading={isPending}
      isClearable={false}
      isSearchable={true}
      onChange={onChange}
      value={selectedOption}
      name="targetCurrency"
      options={options}
    />
  );
};
