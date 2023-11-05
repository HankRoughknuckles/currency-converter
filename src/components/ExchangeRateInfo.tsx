import { useExchangeRateContext } from "../hooks/useExchangeRate.tsx";
import { DECIMAL_PLACES } from "../lib/constants.ts";

export const ExchangeRateInfo = () => {
  const { isPending, unitsPerCzk, selectedCurrencyCode } =
    useExchangeRateContext();

  const oneCrownWorth =
    isPending || unitsPerCzk === undefined || selectedCurrencyCode === undefined
      ? "..."
      : `${unitsPerCzk.toFixed(DECIMAL_PLACES)} ${selectedCurrencyCode}`;

  return <h2>1 CZK = {oneCrownWorth}</h2>;
};
