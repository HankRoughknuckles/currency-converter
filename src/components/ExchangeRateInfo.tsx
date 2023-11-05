import { useExchangeRateContext } from "../hooks/useExchangeRate.tsx";

export const ExchangeRateInfo = () => {
  const { isPending, unitsPerCzk, selectedCurrencyCode } =
    useExchangeRateContext();

  const oneCrownWorth =
    isPending || unitsPerCzk === undefined || selectedCurrencyCode === undefined
      ? "..."
      : `${unitsPerCzk.toFixed(3)} ${selectedCurrencyCode}`;

  return <h2>1 CZK = {oneCrownWorth}</h2>;
};
