import {
  ConversionType,
  useExchangeRateContext,
} from "../hooks/useExchangeRate.tsx";
import styled from "styled-components";

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

  const arrow = conversionType === ConversionType.fromCzk ? "👉" : "👈";

  const czkAmount =
    conversionType === ConversionType.toCzk ? czkPerUnit?.toFixed(3) : 1;
  const foreignCurrencyAmount =
    conversionType === ConversionType.fromCzk ? unitsPerCzk?.toFixed(3) : 1;

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
