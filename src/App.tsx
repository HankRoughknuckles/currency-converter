import styled from "styled-components";
import { ConversionForm } from "./components/ConversionForm";
import "./App.css";
import { useExchangeRateContext } from "./hooks/useExchangeRate.tsx";
import { ExchangeRateInfo } from "./components/ExchangeRateInfo.tsx";

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: mintcream;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 7rem;
  width: 7rem;
`;

export const App = () => {
  const { isError } = useExchangeRateContext();

  if (isError) alert("There was an error while fetching the exchange rates");

  return (
    <Container>
      <Logo src={"/lion.svg"} />
      <h1>Currency Converter</h1>
      <ExchangeRateInfo />
      <ConversionForm />
    </Container>
  );
};
