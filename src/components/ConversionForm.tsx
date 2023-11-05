import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { CzkDropdown } from "./CzkDropdown.tsx";
import { ToggleConversionDirectionButton } from "./ToggleConversionDirectionButton.tsx";
import { CurrencyDropdown } from "./CurrencyDropdown.tsx";
import { PositiveNumberInput } from "./PositiveNumberInput.tsx";
import {
  ConversionType,
  useExchangeRateContext,
} from "../hooks/useExchangeRate.tsx";
import { DECIMAL_PLACES } from "../lib/constants.ts";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Spacer = styled.div`
  width: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ConversionForm = () => {
  const { unitsPerCzk, czkPerUnit, conversionType } = useExchangeRateContext();
  const [czkValue, setCzkValue] = useState<string>("");
  const [foreignCurrencyValue, setForeignCurrencyValue] = useState<string>("");
  const czkInputRef = useRef<HTMLInputElement>(null);
  const foreignCurrencyInputRef = useRef<HTMLInputElement>(null);

  const onCzkInputChange = useCallback(
    (input: string) => {
      if (unitsPerCzk === undefined) return;
      setCzkValue(input);
      setForeignCurrencyValue(
        (Number(input) * unitsPerCzk).toFixed(DECIMAL_PLACES),
      );
    },
    [unitsPerCzk],
  );

  const onForeignCurrencyInputChange = useCallback(
    (input: string) => {
      if (czkPerUnit === undefined) return;
      setForeignCurrencyValue(input);
      setCzkValue((Number(input) * czkPerUnit).toFixed(DECIMAL_PLACES));
    },
    [czkPerUnit],
  );

  /** dynamically updates based on input, conversion type, and selected currency */
  const displayedForeignCurrencyValue = useMemo(() => {
    if (unitsPerCzk === undefined) return "";

    return conversionType === ConversionType.toCzk
      ? foreignCurrencyValue
      : (Number(czkValue) * unitsPerCzk).toFixed(DECIMAL_PLACES);
  }, [conversionType, czkValue, foreignCurrencyValue, unitsPerCzk]);

  /** dynamically updates based on input, conversion type, and selected currency */
  const displayedCzkValue = useMemo(() => {
    if (czkPerUnit === undefined) return "";

    return conversionType === ConversionType.fromCzk
      ? czkValue
      : (Number(foreignCurrencyValue) * czkPerUnit).toFixed(DECIMAL_PLACES);
  }, [conversionType, czkPerUnit, czkValue, foreignCurrencyValue]);

  const focusInputsOnDirectionChange = useCallback(() => {
    if (conversionType === ConversionType.toCzk) {
      foreignCurrencyInputRef?.current?.focus();
    } else {
      czkInputRef?.current?.focus();
    }
  }, [conversionType]);

  useEffect(focusInputsOnDirectionChange, [focusInputsOnDirectionChange]);

  const recalculateValuesOnDirectionChange = useCallback(() => {
    if (conversionType === ConversionType.toCzk) {
      onForeignCurrencyInputChange(foreignCurrencyValue);
    } else {
      onCzkInputChange(czkValue);
    }
  }, [
    conversionType,
    czkValue,
    foreignCurrencyValue,
    onCzkInputChange,
    onForeignCurrencyInputChange,
  ]);

  useEffect(recalculateValuesOnDirectionChange, [
    recalculateValuesOnDirectionChange,
  ]);

  return (
    <Container>
      <div>
        <CzkDropdown />
        <PositiveNumberInput
          ref={czkInputRef}
          value={displayedCzkValue}
          onChange={onCzkInputChange}
          disabled={conversionType === ConversionType.toCzk}
        />
      </div>
      <Spacer>
        <ToggleConversionDirectionButton />
      </Spacer>
      <div>
        <CurrencyDropdown />
        <PositiveNumberInput
          ref={foreignCurrencyInputRef}
          value={displayedForeignCurrencyValue}
          onChange={onForeignCurrencyInputChange}
          disabled={conversionType === ConversionType.fromCzk}
        />
      </div>
    </Container>
  );
};
