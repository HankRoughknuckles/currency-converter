import {
  ConversionType,
  useExchangeRateContext,
} from "../hooks/useExchangeRate.tsx";
import styled from "styled-components";
import { DECIMAL_PLACES } from "../lib/constants.ts";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LeftSection = styled.h2`
  flex: 2;
  text-align: right;
  width: 15rem;
`;

const MiddleSection = styled.h2`
  flex: 2;
  text-align: center;
`;

const RightSection = styled.h2`
  flex: 2;
  text-align: left;
  width: 15rem;
`;

export const ExchangeRateInfo = () => {
  const {
    isPending,
    unitsPerCzk,
    czkPerUnit,
    selectedCurrencyCode,
    conversionType,
  } = useExchangeRateContext();

  const arrow = conversionType === ConversionType.fromCzk ? "→" : "←";

  const czkAmount =
    conversionType === ConversionType.toCzk
      ? czkPerUnit?.toFixed(DECIMAL_PLACES)
      : 1;
  const foreignCurrencyAmount =
    conversionType === ConversionType.fromCzk
      ? unitsPerCzk?.toFixed(DECIMAL_PLACES)
      : 1;

  if (isPending) return <h2>Loading...</h2>;
  return (
    <Container>
      <LeftSection>{czkAmount} CZK</LeftSection>
      <MiddleSection>{arrow}</MiddleSection>
      <RightSection>
        {foreignCurrencyAmount} {selectedCurrencyCode}
      </RightSection>
    </Container>
  );
};
