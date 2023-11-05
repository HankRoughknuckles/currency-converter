import { useExchangeRateContext } from "../hooks/useExchangeRate.tsx";
import { useMemo } from "react";
import { DECIMAL_PLACES } from "../lib/constants.ts";
import { firstLetterToUpperCase } from "../lib/string.ts";
import styled from "styled-components";

const HeaderCell = styled.th`
  padding: 0 1rem;
`;

const DataCell = styled.td`
  padding: 0 1rem;
`;

export const ConversionTable = () => {
  const { isPending, data } = useExchangeRateContext();

  const rows = useMemo(() => {
    const sortedData = (data ?? []).sort((a, b) => {
      return a.code.localeCompare(b.code);
    });

    return sortedData.map((currency) => {
      return (
        <tr>
          <DataCell>{currency.code}</DataCell>
          <DataCell>{currency.country}</DataCell>
          <DataCell>{firstLetterToUpperCase(currency.currencyName)}</DataCell>
          <DataCell>{currency.czkPerUnit.toFixed(DECIMAL_PLACES)}</DataCell>
          <DataCell>
            {(1 / currency.czkPerUnit).toFixed(DECIMAL_PLACES)}
          </DataCell>
        </tr>
      );
    });
  }, [data]);

  if (isPending) return <p>Loading...</p>;

  return isPending ? (
    <p>Loading...</p>
  ) : (
    <table>
      <thead>
        <tr>
          <HeaderCell>Code</HeaderCell>
          <HeaderCell>Country</HeaderCell>
          <HeaderCell>Currency Name</HeaderCell>
          <HeaderCell>to CZK</HeaderCell>
          <HeaderCell>from CZK</HeaderCell>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
