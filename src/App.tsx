import "./assets/styles/index.scss";
import { useEffect, useState } from "react";
import { List, Row, Col, Spin } from "antd";
import { ITickersResponse } from "./types/ITickersResponse";
import { ICoins } from "./types/ICoins";
import { useCoinsSocket } from "./shared/hooks/useCoinsSocket";

const App = () => {
  const { coins, status } = useCoinsSocket();
  // const [coins, setCoins] = useState<ICoins[]>();

  // useEffect(() => {
  //   let ws: WebSocket;
  //   const connect = () => {
  //     ws = new WebSocket("wss://fstream.binance.com/ws/!ticker@arr");

  //     ws.onopen = () => {
  //       const payload = {
  //         method: "SUBSCRIBE",
  //         params: ["!ticker@arr"],
  //         id: 1,
  //       };

  //       ws.send(JSON.stringify(payload));
  //     };

  //     ws.onmessage = (event) => {
  //       const tickerArr = JSON.parse(event?.data) as ITickersResponse[];
  //       const soinsDataArr = tickerArr?.map(({ s, P, c }) => ({
  //         symbol: s,
  //         PriceChangePercent: P,
  //         lastPrice: c,
  //       }));
  //       setCoins(soinsDataArr);
  //     };

  //     ws.onclose = () => {
  //       setTimeout(() => {
  //         connect();
  //       }, 5000);
  //     };
  //   };
  //   connect();
  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  return coins ? (
    <List
      itemLayout="horizontal"
      className="coins-list bg-slate-900"
      dataSource={coins}
      renderItem={(item) => (
        <List.Item>
          <Row className="w-full bg-slate-900 p-0" justify="space-between">
            <Col className="text-gray-100 font-semibold pt-2" span={10}>
              <span>{item.symbol}</span>
            </Col>
            <Col className="flex justify-end" span={10}>
              <div className="flex flex-col">
                <span className="text-gray-100 text-right">
                  {item.lastPrice}
                </span>
                <span
                  className={`${
                    item.PriceChangePercent.includes("-")
                      ? "text-red-700"
                      : "text-green-700"
                  }`}
                >
                  {item.PriceChangePercent}%
                </span>
              </div>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  ) : (
    <div className="w-full h-screen bg-slate-900 flex justify-center pt-10">
      <Spin size="large" />
    </div>
  );
};

export default App;
