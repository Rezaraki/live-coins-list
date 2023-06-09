import { ICoins } from "../types/ICoins";
import { TSocketStatuses } from "../types/TSocketStatuses";
import { ESocketStatuses } from "./enums/ESocketStatuses";

export const makeStatus = (
  coins: ICoins[] | undefined,
  innerStatus: boolean
) => {
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
  return status;
};
