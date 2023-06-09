import "./assets/styles/index.scss";
import { useCoinsSocket } from "./shared/hooks/useCoinsSocket";
import { ESocketStatuses } from "./shared/enums/ESocketStatuses";
import CoinsList from "./components/CoinsList";
import Spinner from "./components/Spinner";
import Disconnected from "./components/Disconnected";

const App = () => {
  const { coins, status } = useCoinsSocket();

  if (status === ESocketStatuses.connected) return <CoinsList coins={coins} />;
  if (status === ESocketStatuses.disConnected)
    return (
      <>
        {<Disconnected />}
        <CoinsList coins={coins} />
      </>
    );
  return <Spinner />;
};

export default App;
