import {
  gnosis,
  gnosisChiado,
  hardhat,
  polygon,
  polygonMumbai,
  scrollTestnet,
} from "wagmi/chains";

import GnosisIcon from "@icons/gnosis.svg";
import HardhatIcon from "@icons/hardhat.svg";
import PolygonIcon from "@icons/polygon.svg";
import ScrollIcon from "@icons/scroll.svg";
import { env } from "env.mjs";

export type ChainMap = { [chainId: number]: string };

const getChains = () => {
  switch (env.NEXT_PUBLIC_CHAIN) {
    case "localhost":
      return [hardhat, polygonMumbai, gnosis, gnosisChiado, scrollTestnet];
    case "testnet":
      return [polygonMumbai];
    case "mainnet":
      throw [polygon];
    default:
      throw new Error("Invalid NEXT_PUBLIC_CHAIN value");
  }
};

export const CHAINS = getChains();

type Icon = (className: { className?: string }) => JSX.Element;

export const CHAIN_ICON: { [chainId: number]: Icon } = {
  [hardhat.id]: HardhatIcon,
  [polygonMumbai.id]: PolygonIcon,
  [polygon.id]: PolygonIcon,
  [gnosis.id]: GnosisIcon,
  [gnosisChiado.id]: GnosisIcon,
  [scrollTestnet.id]: ScrollIcon,
};
