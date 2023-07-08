/* eslint-disable import/order */
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
// import dynamic from "next/dynamic";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
// import { useEffect, useState } from "react";
import { configureChains, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CHAINS } from "@constants/chains";
import { DefaultLayout } from "@layouts/default-layout";
import { env } from "env.mjs";

import SEO from "../../next-seo.config";

import type { ExtendedPage } from "@types";
import type { AppProps } from "next/app";
import { demoAppInfo, wagmiConfig, chains as rChains } from "@lib/config/rainbow-kit";

const { chains, provider } = configureChains(CHAINS, [
  alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: "Web3 Boilerplate",
  chains,
});

// const client = createClient({
//   autoConnect: true,
//   connectors,
//   provider,
//   persister: null,
// });

const queryClient = new QueryClient();
// const ReactQueryDevtoolsProduction = dynamic(
//   () =>
//     // eslint-disable-next-line import/extensions
//     import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
//       (d) => ({
//         default: d.ReactQueryDevtools,
//       }),
//     ),
//   { ssr: false },
// );

function MyApp({ Component, pageProps }: AppProps) {
  // const [showReactQueryDevtools, setShowReactQueryDevtools] = useState(false);
  // useEffect(() => {
  //   // @ts-expect-error - window doesn't have toggleDevtools but we're adding it
  //   window.toggleDevtools = () => setShowReactQueryDevtools((old) => !old);
  // }, []);

  const getLayout =
    (Component as ExtendedPage).getLayout ||
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* {showReactQueryDevtools && <ReactQueryDevtoolsProduction />} */}

      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider appInfo={demoAppInfo} chains={rChains}>
          <ThemeProvider>
            <DefaultSeo {...SEO} />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}

export default MyApp;
