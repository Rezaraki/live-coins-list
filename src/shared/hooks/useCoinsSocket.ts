import { useState, useEffect } from "react";
import { ICoins } from "../../types/ICoins";
import { ITickersResponse } from "../../types/ITickersResponse";
import { TSocketStatuses } from "../../types/TSocketStatuses";
import { ESocketStatuses } from "../enums/ESocketStatuses";

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
      ws.onclose = () => {
        setInnerStatus(false);
        reConnectionIntervalId = setInterval(() => connect(), 5000);
      };
    };
    connect();
    return () => {
      ws.close();
    };
  }, []);

  let status: TSocketStatuses = ESocketStatuses.connecting;
  switch (true) {
    case coins && innerStatus:
      status = ESocketStatuses.connected;
      break;
    case coins && !innerStatus:
      status = ESocketStatuses.disConnected;
      break;
    case !coins && innerStatus:
      status = ESocketStatuses.error;
      break;
    case !coins && !innerStatus: //innitial connection
      status = ESocketStatuses.connecting;
      break;
  }
  return { coins, status };
};
