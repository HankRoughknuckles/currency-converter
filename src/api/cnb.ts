import axios from "axios";

/** Api functions for fetching information from Czech National Bank */

export interface Rate {
  /** example: USA, EMU, Romania */
  country: string;
  /** example: dollar, euro, leu */
  currencyName: string;
  /** example: USD, EUR, RON */
  code: string;
  /** How many CZK are equal to 1 of the currency */
  czkPerUnit: number;
}

const API_URL =
  "https://tmorris-currency-converter-be-e0cb80cb6809.herokuapp.com/";

export const fetchExchangeRates = async (): Promise<Rate[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
