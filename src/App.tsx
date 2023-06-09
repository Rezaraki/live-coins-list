import "./assets/styles/index.scss";
import { useEffect, useState } from "react";
import { List, Row, Col, Spin } from "antd";
import { ITickersResponse } from "./types/ITickersResponse";
import { ICoins } from "./types/ICoins";
import { useCoinsSocket } from "./shared/hooks/useCoinsSocket";
import { ESocketStatuses } from "./shared/enums/ESocketStatuses";
import CoinsList from "./components/CoinsList";

const App = () => {
  const { coins, status } = useCoinsSocket();

  const coinsList = (
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
  );
  const spinner = (
    <div className="w-full h-screen bg-slate-900 flex justify-center pt-10">
      <Spin size="large" />
    </div>
  );
  const disconnected = (
    <div className="w-full h-3 bg-slate-600 text-gray-300 flex justify-center  ">
      disconnected trying to fetch data.
    </div>
  );

  if (status === ESocketStatuses.connected) return <CoinsList />;
  if (status === ESocketStatuses.disConnected)
    return (
      <>
        {disconnected}
        {coinsList}
      </>
    );
  return spinner;
};

export default App;
