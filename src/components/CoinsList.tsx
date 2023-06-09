import { Col, List, Row } from "antd";
import { ICoins } from "../types/ICoins";
const CoinsList = ({ coins }: { coins: ICoins[] | undefined }) => {
  return (
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
};

export default CoinsList;
