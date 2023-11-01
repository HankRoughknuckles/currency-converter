import styled from "styled-components";
import { ConversionForm } from "./components/ConversionForm.tsx";
import "./App.css";

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

export const App = () => {
  return (
    <Container>
      <h1>Currency Converter</h1>
      <h2>1 CZK = 0.04 EUR</h2>
      <ConversionForm />
    </Container>
  );
};
