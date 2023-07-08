import {
  gnosis,
  goerli,
  hardhat,
  polygonMumbai,
  scrollTestnet,
} from "wagmi/chains";

import { ChainMap } from "./chains";

export const PROMPT_HUNT_ADDRESS: ChainMap = {
  [hardhat.id]: "0x07B9837e81b917451690f2eF4752AC5F1434450B",
  [polygonMumbai.id]: "",
  [gnosis.id]: "0x1E21e9bB2bf3EB0d4b2cFbD1e8Cc0653F42B8532",
  [scrollTestnet.id]: "0xceC6C334EddF49c33A6AF66CB0F4883D5669210F",
  [goerli.id]: "0x1AC58B79a4d888a298296E0e0b17629e48f6c555",
};

export const DEPLOYMENT_BLOCK: { [chainId: number]: number } = {
  [hardhat.id]: 0,
  [polygonMumbai.id]: 0,
  [gnosis.id]: 28850454,
  [scrollTestnet.id]: 3694091,
  [goerli.id]: 9312851,
};
