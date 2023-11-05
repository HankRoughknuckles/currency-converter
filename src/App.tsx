import styled from "styled-components";
import { ConversionForm } from "./components/ConversionForm";
import "./App.css";
import { useExchangeRateContext } from "./hooks/useExchangeRate.tsx";
import { ExchangeRateInfo } from "./components/ExchangeRateInfo.tsx";
import { ConversionTable } from "./components/ConversionTable.tsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  height: 7rem;
  width: 7rem;
`;

const TableContainer = styled.div`
  height: 10vh;
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
      <TableContainer>
        <h2>Exchange Rates</h2>
        <ConversionTable />
      </TableContainer>
    </Container>
  );
};
