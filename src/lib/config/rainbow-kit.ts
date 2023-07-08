import {
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig } from "wagmi";
import {
  goerli,
  gnosis,
  hardhat,
  polygonMumbai,
  gnosisChiado,
  scrollTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, hardhat, polygonMumbai, gnosis, gnosisChiado, scrollTestnet],
  [publicProvider()],
);

const projectId = "e6775470c037dbea234c6766306e24d8";

const appName = "Request Network Quickstart: Create a request";

const { wallets } = getDefaultWallets({
  appName,
  projectId,
  chains,
});

export const demoAppInfo = {
  appName,
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
