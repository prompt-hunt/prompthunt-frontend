import {
  gnosis,
  gnosisChiado,
  hardhat,
  polygonMumbai,
  scrollTestnet,
} from "wagmi/chains";

import { ChainMap } from "./chains";

export const PROMPT_HUNT_ADDRESS: ChainMap = {
  [hardhat.id]: "0x07B9837e81b917451690f2eF4752AC5F1434450B",
  [polygonMumbai.id]: "",
  [gnosisChiado.id]: "0xF372dEa06A91444029cc1cBA994b6071E88e72d0",
  [gnosis.id]: "0x584B9958b653e313B9b90f2bc214567cc37A3da0",
  [scrollTestnet.id]: "0xcb02f711F674956b0836EA9fae7D31B00AA0581A",
};

export const DEPLOYMENT_BLOCK: { [chainId: number]: number } = {
  [hardhat.id]: 0,
  [polygonMumbai.id]: 0,
  [gnosisChiado.id]: 4871839,
  [gnosis.id]: 28846547,
  [scrollTestnet.id]: 3687779,
};
