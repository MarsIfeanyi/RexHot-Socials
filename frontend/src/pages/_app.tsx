import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  avalancheFuji,
  bscTestnet,
  opBNBTestnet,
  avalanche,
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  zora,
  base,
  polygonMumbai,
  baseGoerli,
  sepolia,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [
    avalancheFuji,
    bscTestnet,
    opBNBTestnet,
    avalanche,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    polygonMumbai,
    sepolia,
    goerli,
    baseGoerli,
  ],
  [
    alchemyProvider({
      apiKey: "https://data-seed-prebsc-1-s1.bnbchain.org:8545",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "360VestWise",
  projectId: "4c0ff852eb2c84659a24b7d7c8335bc1",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className=" ">
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={darkTheme({
            overlayBlur: "large",
            accentColor: "#ffa",
            accentColorForeground: "#111",
          })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default MyApp;
