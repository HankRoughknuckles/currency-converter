import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExchangeRates, Rate } from "../api/cnb.ts";

export enum ConversionType {
  toCzk = "toCzk",
  fromCzk = "fromCzk",
}

interface ExchangeRateState {
  /** If the API is still fetching the exchange rates */
  isPending: boolean;
  /** If there was an error while fetching the exchange rates */
  isError: boolean;
  /** The error that occurred while fetching the exchange rates */
  error: unknown;
  /** The fetched exchange rates */
  data: Rate[] | undefined;
  /** Sets the selected currency code, this dynamically updates other values returned by this hook */
  setSelectedCurrencyCode: (code: string) => void;
  /** The currently selected currency code, ex: AUD, USD, EUR */
  selectedCurrencyCode: string | undefined;
  /** How many of the selected currency (example:) USD are in 1 CZK */
  unitsPerCzk: number | undefined;
  /** How many CZK are in 1 of the selected currency (example:) USD */
  czkPerUnit: number | undefined;
  /** Whether the conversion is from CZK to the selected currency or the other way around */
  conversionType: ConversionType;
  /** Sets the conversion type as either fromCzk or ToCzk */
  setConversionType: Dispatch<SetStateAction<ConversionType>>;
}

const initialState = {
  isPending: true,
  isError: false,
  error: null,
  data: undefined,
  setSelectedCurrencyCode: () => {},
  selectedCurrencyCode: undefined,
  unitsPerCzk: undefined,
  czkPerUnit: undefined,
  conversionType: ConversionType.fromCzk,
  setConversionType: () => {},
};

/** Hook for storing the information about the exchange rates */
const _useExchangeRateState = (): ExchangeRateState => {
  const { isPending, isError, data, error } = useQuery<Rate[]>({
    queryKey: ["exchangeRates"],
    queryFn: fetchExchangeRates,
  });

  const [conversionType, setConversionType] = useState<ConversionType>(
    ConversionType.fromCzk,
  );

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<
    string | undefined
  >(undefined);

  const selectedCurrency = useMemo(() => {
    if (selectedCurrencyCode === undefined || data === undefined)
      return undefined;
    return data.find((rate) => rate.code === selectedCurrencyCode);
  }, [selectedCurrencyCode, data]);

  const unitsPerCzk = useMemo(() => {
    if (selectedCurrency === undefined) return undefined;
    return 1 / selectedCurrency.czkPerUnit;
  }, [selectedCurrency]);

  // Set selected currency to first option when the API loads them
  useEffect(() => {
    if (data === undefined) return;
    setSelectedCurrencyCode(data[0].code);
  }, [data]);

  return {
    isPending,
    isError,
    error,
    data,
    setSelectedCurrencyCode,
    selectedCurrencyCode,
    unitsPerCzk,
    czkPerUnit: selectedCurrency?.czkPerUnit,
    conversionType,
    setConversionType,
  };
};

const ExchangeRateContext =
  createContext<ReturnType<typeof _useExchangeRateState>>(initialState);

/**
 * Provider that makes the exchange rate state getters and setters available
 * to any components nested below it.
 */
export const ExchangeRateContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const exchangeRateState = _useExchangeRateState();
  return (
    <ExchangeRateContext.Provider value={exchangeRateState}>
      {children}
    </ExchangeRateContext.Provider>
  );
};

/** Hook for accessing the exchangeRateState through the context api */
export const useExchangeRateContext = () => useContext(ExchangeRateContext);
