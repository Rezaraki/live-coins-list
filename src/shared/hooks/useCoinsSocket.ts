import { useState, useEffect } from "react";
import { ICoins } from "../../types/ICoins";
import { ITickersResponse } from "../../types/ITickersResponse";

const tickerPayload = {
  method: "SUBSCRIBE",
  params: ["!ticker@arr"],
  id: 1,
};
const binanceTickerUrl = "wss://fstream.binance.com/ws/!ticker@arr";

export const useCoinsSocket = () => {
  const [coins, setCoins] = useState<ICoins[]>();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    const connect = () => {
      ws = new WebSocket(binanceTickerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify(tickerPayload));
      };

      ws.onmessage = (event) => {
        setStatus(true);
        const tickerArr = JSON.parse(event?.data) as ITickersResponse[];
        const soinsDataArr = tickerArr?.map(({ s, P, c }) => ({
          symbol: s,
          PriceChangePercent: P,
          lastPrice: c,
        }));
        setCoins(soinsDataArr);
      };

      ws.onclose = () => {
        setStatus(false);
        setTimeout(() => {
          connect();
        }, 5000);
      };
    };
    connect();
    return () => {
      ws.close();
    };
  }, []);
  return { coins, status };
};
