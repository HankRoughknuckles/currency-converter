import { useEffect, useState } from "react";
import styled from "styled-components";
import { CzkDropdown } from "./CzkDropdown.tsx";
import { ToggleConversionDirectionButton } from "./ToggleConversionDirectionButton.tsx";
import { CurrencyDropdown } from "./CurrencyDropdown.tsx";
import { PositiveNumberInput } from "./PositiveNumberInput.tsx";
import { useExchangeRateContext } from "../hooks/useExchangeRate.tsx";
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
  const { unitsPerCzk } = useExchangeRateContext();
  const [czkValue, setCzkValue] = useState<string>("");
  const [foreignValue, setForeignValue] = useState<string>("");

  /** update foreign currency value when czk value changes */
  useEffect(() => {
    if (czkValue === "" || unitsPerCzk === undefined) {
      setForeignValue("");
      return;
    }
    const foreignValue = Number(czkValue) * unitsPerCzk;
    setForeignValue(foreignValue.toFixed(DECIMAL_PLACES));
  }, [czkValue, unitsPerCzk]);

  return (
    <Container>
      <div>
        <CzkDropdown />
        <PositiveNumberInput value={czkValue} onChange={setCzkValue} />
      </div>
      <Spacer>
        <ToggleConversionDirectionButton />
      </Spacer>
      <div>
        <CurrencyDropdown />
        <PositiveNumberInput
          value={foreignValue}
          onChange={() => {}}
          disabled
        />
      </div>
    </Container>
  );
};
