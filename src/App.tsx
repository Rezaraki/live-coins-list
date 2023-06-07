import "./assets/styles/index.scss";

import { Avatar, List, Row, Col } from "antd";

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

const App: React.FC = () => (
  <List
    itemLayout="horizontal"
    className="list"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <Row className="list-item" justify="space-between">
          <Col className="col left-team-text" span={10}>
            <span>coinName:{item.title}</span>
          </Col>
          <Col className="col right-team-text" span={10}>
            <span>2400.22</span>
          </Col>
        </Row>
      </List.Item>
    )}
  />
);

export default App;
