import { hardhat, polygon, polygonMumbai } from "wagmi/chains";

import { ChainMap } from "./chains";

export const PROMPT_HUNT_ADDRESS: ChainMap = {
  [hardhat.id]: "0x07B9837e81b917451690f2eF4752AC5F1434450B",
  [polygonMumbai.id]: "",
  [polygon.id]: "'",
};
