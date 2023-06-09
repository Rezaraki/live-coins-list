import { useState, useEffect } from "react";
import { ICoins } from "../../types/ICoins";
import { ITickersResponse } from "../../types/ITickersResponse";
import { makeStatus } from "../utils";

const tickerPayload = {
  method: "SUBSCRIBE",
  params: ["!ticker@arr"],
  id: 1,
};
const binanceTickerUrl = "wss://fstream.binance.com/ws/!ticker@arr";

export const useCoinsSocket = () => {
  const [coins, setCoins] = useState<ICoins[]>();
  const [innerStatus, setInnerStatus] = useState(false);

  useEffect(() => {
    let ws: WebSocket;
    //@ts-expect-error Nodejs is falsy unknown to ts
    let reConnectionIntervalId: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket(binanceTickerUrl);

      ws.onopen = () => {
        ws.send(JSON.stringify(tickerPayload));
      };

      ws.onmessage = (event) => {
        setInnerStatus(true);
        clearInterval(reConnectionIntervalId);

        const tickerArr = JSON.parse(event?.data) as ITickersResponse[];

        if (Array.isArray(tickerArr)) {
          const soinsDataArr = tickerArr?.map(({ s, P, c }) => ({
            symbol: s,
            PriceChangePercent: P,
            lastPrice: c,
          }));
          setCoins(soinsDataArr);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = (error) => {
        setInnerStatus(false);
        console.error(
          "connection lost with code:",
          error.code,
          "due to:",
          error.reason
        );
        reConnectionIntervalId = setInterval(() => connect(), 5000);
      };
    };
    connect();
    return () => {
      ws.close();
    };
  }, []);
  const status = makeStatus(coins, innerStatus);

  return { coins, status };
};
