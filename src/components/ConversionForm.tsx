import styled from "styled-components";
import { CzkInput } from "./CzkInput.tsx";
import { ToggleConversionDirectionButton } from "./ToggleConversionDirectionButton.tsx";
import { ForeignCurrencyInput } from "./ForeignCurrencyInput.tsx";

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
  return (
    <Container>
      <div>
        <CzkInput />
      </div>
      <Spacer>
        <ToggleConversionDirectionButton />
      </Spacer>
      <div>
        <ForeignCurrencyInput />
      </div>
    </Container>
  );
};
