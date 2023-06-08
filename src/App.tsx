import { useEffect, useState } from "react";
import { List, Row, Col } from "antd";
import { ITickersResponse } from "./types/ITickersResponse";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];
const App = () => {
  const [coins, setCoins] = useState<
    {
      symbol: string;
      PriceChangePercent: string;
      lastPrice: string;
    }[]
  >();

  useEffect(() => {
    const ws = new WebSocket("wss://fstream.binance.com/ws/!ticker@arr");

    ws.onopen = () => {
      const payload = {
        method: "SUBSCRIBE",
        params: ["!ticker@arr"],
        id: 1,
      };

      ws.send(JSON.stringify(payload));
    };

    ws.onmessage = (event) => {
      console.log(`Received message: ${event}`, event.data);
      const tickerArr = JSON.parse(event?.data) as ITickersResponse[];
      const soinsDataArr = tickerArr?.map(({ s, P, c }) => ({
        symbol: s,
        PriceChangePercent: P,
        lastPrice: c,
      }));
      setCoins(soinsDataArr);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <List
      itemLayout="horizontal"
      className="list"
      dataSource={coins}
      renderItem={(item, index) => (
        <List.Item>
          <Row className="list-item" justify="space-between">
            <Col className="col left-team-text" span={10}>
              <span>coinName:{item.symbol}</span>
            </Col>
            <Col className="col right-team-text" span={10}>
              <span>{item.lastPrice}</span>
              <span>{item.PriceChangePercent}</span>
            </Col>
          </Row>
        </List.Item>
      )}
    />
  );
};

export default App;

// import "./assets/styles/index.scss";
// import React, { useState, useEffect } from "react";
// import { socket } from "./shared/services/socket";
// // import { ConnectionState } from "./components/ConnectionState";
// // import { ConnectionManager } from "./components/ConnectionManager";
// // import { MyForm } from "./components/MyForm";
// import { Avatar, List, Row, Col } from "antd";

// const data = [
//   {
//     title: "Ant Design Title 1",
//   },
//   {
//     title: "Ant Design Title 2",
//   },
//   {
//     title: "Ant Design Title 3",
//   },
//   {
//     title: "Ant Design Title 4",
//   },
// ];

// const App: React.FC = () => {
//   const [isConnected, setIsConnected] = useState(socket.connected);
//   const [fooEvents, setFooEvents] = useState([]);

//   useEffect(() => {
//     const payload = { method: "SUBSCRIBE", params: ["!Icker@arr"] };

//     socket.emit("payload", JSON.stringify(payload));
//     console.log("something");
//     socket.on("message", (data: unknown) => {
//       console.log(`Received message: ${data}`, data);
//     });

//     return () => {
//       socket.off("message");
//     };
//   }, []);
//   // useEffect(() => {
//   //   function onConnect() {
//   //     setIsConnected(true);
//   //   }

//   //   function onDisconnect() {
//   //     setIsConnected(false);
//   //   }

//   //   function onFooEvent(value) {
//   //     setFooEvents((previous) => [...previous, value]);
//   //   }

//   //   socket.on("connect", onConnect);
//   //   socket.on("disconnect", onDisconnect);
//   //   socket.on("foo", onFooEvent);

//   //   return () => {
//   //     socket.off("connect", onConnect);
//   //     socket.off("disconnect", onDisconnect);
//   //     socket.off("foo", onFooEvent);
//   //   };
//   // }, []);
//   return (
//     <List
//       itemLayout="horizontal"
//       className="list"
//       dataSource={data}
//       renderItem={(item, index) => (
//         <List.Item>
//           <Row className="list-item" justify="space-between">
//             <Col className="col left-team-text" span={10}>
//               <span>coinName:{item.title}</span>
//             </Col>
//             <Col className="col right-team-text" span={10}>
//               <span>2400.22</span>
//             </Col>
//           </Row>
//         </List.Item>
//       )}
//     />
//   );
// };

// export default App;
