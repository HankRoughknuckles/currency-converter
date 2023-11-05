import styled from "styled-components";
import {
  ConversionType,
  useExchangeRateContext,
} from "../hooks/useExchangeRate.tsx";
import { useCallback } from "react";

const LargeClickableArrow = styled.div`
  font-size: 3rem;
  cursor: pointer;
`;

const TO_CZK_ICON = "⬅️";
const FROM_CZK_ICON = "➡️";

export const ToggleConversionDirectionButton = () => {
  const { conversionType, setConversionType } = useExchangeRateContext();

  const onClick = useCallback(() => {
    if (conversionType === ConversionType.fromCzk) {
      setConversionType(ConversionType.toCzk);
    } else {
      setConversionType(ConversionType.fromCzk);
    }
  }, [conversionType, setConversionType]);

  return (
    <LargeClickableArrow onClick={onClick}>
      {conversionType === ConversionType.fromCzk ? FROM_CZK_ICON : TO_CZK_ICON}
    </LargeClickableArrow>
  );
};
