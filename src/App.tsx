import React, { useCallback, useEffect, useState } from "react";
import logo from "./assets/logo.png";
import {
  Container,
  Converter,
  StyledForm,
  RowWrapper,
  ConvertorHeading,
  ResultHeader,
  Result,
} from "./style";
import { debounce } from "./utils";

interface ICurrencyData {
  ccy: string;
  base_ccy: string;
  buy: string;
  sale: string;
}

const mockData = [
  { ccy: "EUR", base_ccy: "UAH", buy: "40.65000", sale: "41.65000" },
  { ccy: "USD", base_ccy: "UAH", buy: "37.45000", sale: "37.95000" },
];

function App() {
  const [from, setFrom] = useState("UAH");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState<ICurrencyData[] | null>(null);
  const [result, setResult] = useState<number>();

  const makeRequest = useCallback(() => {
    console.log("make request");
    const fetchData = new Promise<ICurrencyData[]>((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 500);
    });
    fetchData.then((data) => {
      setRate(data);
    });
  }, []);
  const optimizedNMakeRequest = useCallback(debounce(makeRequest), []);

  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^[0-9\b]+$/;
    const value = e.target.value;

    if (value.includes(",")) {
      alert('Only "," is allowed');
    }

    if (value === "" || reg.test(value)) {
      setAmount(value);
      setRate(null);
    }
    optimizedNMakeRequest();
  };

  const currencyToChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTo(e.currentTarget.value);
    setRate(null);
    optimizedNMakeRequest();
  };

  const currencyFromChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFrom(e.currentTarget.value);
    setRate(null);
    optimizedNMakeRequest();
  };

  useEffect(() => {
    switch (true) {
      case (from === "EUR" && to === "USD") || (from === "USD" && to === "EUR"):
        alert("Sorry, we don't support this currency conversion");
        setFrom("UAH");
        break;
      case from === to:
        setResult(+amount!);
        break;
      case from === "EUR" || from === "USD":
        const currentCurrencyRate = rate?.find((item) => item.ccy === from);
        if (currentCurrencyRate) {
          setResult(+(+currentCurrencyRate?.sale * +amount!).toFixed(2));
        }
        break;
      case from === "UAH":
        const currentCurrencyRate2 = rate?.find((item) => item.ccy === to);
        if (currentCurrencyRate2) {
          setResult(+(+amount! / +currentCurrencyRate2?.buy).toFixed(2));
        }
        break;
      default:
        break;
    }
  }, [rate, from, to, amount]);

  return (
    <Container>
      <Converter>
        <img src={logo} alt="logo" width={35} height={35} />
        <ConvertorHeading>Convert your currency</ConvertorHeading>
        <StyledForm>
          <RowWrapper>
            <label htmlFor="from">From</label>
            <select name="from" onChange={currencyFromChangeHandler}>
              <option value="UAH">UAH</option>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </RowWrapper>
          <RowWrapper>
            <label htmlFor="to">To</label>
            <select name="to" onChange={currencyToChangeHandler}>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
              <option value="USD">USD</option>
            </select>
          </RowWrapper>
          <RowWrapper>
            <label htmlFor="amount">Amount</label>
            <input
              name="amount"
              onChange={amountChangeHandler}
              value={amount}
            />
          </RowWrapper>
          <RowWrapper>
            <ResultHeader>result</ResultHeader>
            <Result>
              {amount &&
                rate &&
                result &&
                `${amount} ${from} = ${result} ${to}`}
            </Result>
          </RowWrapper>
        </StyledForm>
      </Converter>
    </Container>
  );
}

export default App;
