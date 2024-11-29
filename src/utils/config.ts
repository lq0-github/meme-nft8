import { getSelectedRpc } from "./rpc";
export default function getConfig(
  env: string | undefined = process.env.NEXT_PUBLIC_NEAR_ENV
) {
  const RPC = getSelectedRpc();
  switch (env) {
    case "production":
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: RPC.url,
        walletUrl: "https://wallet.near.org",
        myNearWalletUrl: "https://app.mynearwallet.com/",
        helperUrl: "https://api.kitwallet.app",
        explorerUrl: "https://nearblocks.io",
        pikespeakUrl: "https://pikespeak.ai",
        nearExplorerUrl: "https://explorer.near.org/",
        indexerUrl: "https://mainnet-indexer.ref-finance.com",
        dataServiceApiUrl: "https://api.data-service.ref.finance",
        txIdApiUrl: "https://api3.nearblocks.io",
        blackList: ["1371#3", "2769#2"],
        REF_FI_CONTRACT_ID: "v2.ref-finance.near",
        WRAP_NEAR_CONTRACT_ID: process.env.WRAP_NEAR_CONTRACT_ID || "wrap.near",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID: "v2.ref-farming.near",
        XREF_TOKEN_ID: "xtoken.ref-finance.near",
        REF_TOKEN_ID: "token.v2.ref-finance.near",
        POOL_TOKEN_REFRESH_INTERVAL: 20,
        TOTAL_PLATFORM_FEE_REVENUE: "3241971.25",
        CUMULATIVE_REF_BUYBACK: "4313890.03",
        BLACKLIST_POOL_IDS: [
          "3699",
          "3734",
          "3563",
          "3613",
          "3620",
          "3625",
          "4744",
          "5029",
        ],
        FARM_LOCK_SWITCH: 0,
        REF_FARM_BOOST_CONTRACT_ID: "boostfarm.ref-labs.near",
        FARM_BLACK_LIST_V2: ["3612"],
        boostBlackList: ["3699#0", "3612#0", "3612#1"],
        REF_UNI_V3_SWAP_CONTRACT_ID: "dclv2.ref-labs.near",
        REF_UNI_SWAP_CONTRACT_ID: "dcl.ref-labs.near",
        switch_on_dcl_farms: "off",
        DCL_POOL_BLACK_LIST: [""],
        BURROW_CONTRACT_ID: "contract.main.burrow.near",
        BLACK_TOKEN_LIST: ["token.pembrock.near"],
        REF_MEME_FARM_CONTRACT_ID: "meme-farming_011.ref-labs.near",
        REF_TOKEN_LOCKER_CONTRACT_ID: "token-locker.ref-labs.near",
        REF_VE_CONTRACT_ID: "",
        MEME_CHECK_IN_CONTRACT_ID: "checkin.refnft.near",
        MEME_NFT_CONTRACT_ID: "ms8.refnft.near",
      };
    case "pub-testnet":
      return {
        networkId: "testnet",
        nodeUrl: RPC.url,
        walletUrl: "https://wallet.testnet.near.org",
        myNearWalletUrl: "https://testnet.mynearwallet.com/",
        helperUrl: "https://testnet-api.kitwallet.app",
        explorerUrl: "https://testnet.nearblocks.io",
        pikespeakUrl: "https://pikespeak.ai",
        nearExplorerUrl: "https://explorer.testnet.near.org/",
        indexerUrl: "https://testnet-indexer.ref-finance.com",
        dataServiceApiUrl: "https://api.data-service.ref.finance",
        txIdApiUrl: "https://api-testnet.nearblocks.io",
        blackList: ["1371#3"],
        REF_FI_CONTRACT_ID: "ref-finance-101.testnet",
        WRAP_NEAR_CONTRACT_ID:
          process.env.WRAP_NEAR_CONTRACT_ID || "wrap.testnet",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID: "v2.ref-farming.testnet",
        XREF_TOKEN_ID: "xref.ref-finance.testnet",
        REF_TOKEN_ID: "ref.fakes.testnet",
        POOL_TOKEN_REFRESH_INTERVAL: 20,
        TOTAL_PLATFORM_FEE_REVENUE: "3241971.25",
        CUMULATIVE_REF_BUYBACK: "4313890.03",
        BLACKLIST_POOL_IDS: ["1752", "1760"],
        REF_FARM_BOOST_CONTRACT_ID: "boostfarm.ref-finance.testnet",
        FARM_LOCK_SWITCH: 0,
        DCL_POOL_BLACK_LIST: [""],
        REF_UNI_V3_SWAP_CONTRACT_ID: "dclv2.ref-dev.testnet",
        REF_UNI_SWAP_CONTRACT_ID: "dclv1.ref-dev.testnet",
        FARM_BLACK_LIST_V2: ["571"],
        boostBlackList: ["1760#0", "1760#1"],
        switch_on_dcl_farms: "on",
        BURROW_CONTRACT_ID: "contract.1689937928.burrow.testnet",
        BLACK_TOKEN_LIST: [],
        REF_MEME_FARM_CONTRACT_ID: "memefarm-dev2.ref-dev.testnet",
        REF_TOKEN_LOCKER_CONTRACT_ID: "token-locker.ref-labs.testnet",
        REF_VE_CONTRACT_ID: "",
        MEME_CHECK_IN_CONTRACT_ID: "check-in.testnet",
        MEME_NFT_CONTRACT_ID: "ms_8.refnft.testnet",
      };
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: RPC.url,
        walletUrl: "https://wallet.testnet.near.org",
        myNearWalletUrl: "https://testnet.mynearwallet.com/",
        helperUrl: "https://testnet-api.kitwallet.app",
        explorerUrl: "https://testnet.nearblocks.io",
        pikespeakUrl: "https://pikespeak.ai",
        nearExplorerUrl: "https://explorer.testnet.near.org/",
        indexerUrl: "https://dev-indexer.ref-finance.com",
        dataServiceApiUrl: "https://dev.data-service.ref-finance.com",
        txIdApiUrl: "https://api-testnet.nearblocks.io",
        blackList: ["1371#3"],
        REF_FI_CONTRACT_ID: "exchange.ref-dev.testnet",
        WRAP_NEAR_CONTRACT_ID:
          process.env.WRAP_NEAR_CONTRACT_ID || "wrap.testnet",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID: "farm-dev.ref-dev.testnet",
        XREF_TOKEN_ID: "xref.ref-dev.testnet",
        REF_TOKEN_ID: "ref.fakes.testnet",
        POOL_TOKEN_REFRESH_INTERVAL: 20,
        DCL_POOL_BLACK_LIST: [""],
        TOTAL_PLATFORM_FEE_REVENUE: "3241971.25",
        CUMULATIVE_REF_BUYBACK: "4313890.03",
        BLACKLIST_POOL_IDS: ["686"],
        REF_FARM_BOOST_CONTRACT_ID: "boostfarm-dev.ref-dev.testnet",
        FARM_LOCK_SWITCH: 0,
        REF_UNI_V3_SWAP_CONTRACT_ID: "refv2-dev.ref-dev.testnet",
        REF_UNI_SWAP_CONTRACT_ID: "refv2-dev.ref-dev.testnet",
        FARM_BLACK_LIST_V2: ["666"],
        boostBlackList: [""],
        switch_on_dcl_farms: "on",
        BURROW_CONTRACT_ID: "contract.1689937928.burrow.testnet",
        BLACK_TOKEN_LIST: [],
        REF_MEME_FARM_CONTRACT_ID: "memefarm-dev2.ref-dev.testnet",
        REF_TOKEN_LOCKER_CONTRACT_ID: "token-locker.testnet",
        REF_VE_CONTRACT_ID: "",
        MEME_CHECK_IN_CONTRACT_ID: "check-in.testnet",
        MEME_NFT_CONTRACT_ID: "ms_8.refnft.testnet",
      };
    default:
      return {
        networkId: "mainnet",
        nodeUrl: RPC.url,
        walletUrl: "https://wallet.near.org",
        myNearWalletUrl: "https://app.mynearwallet.com/",
        helperUrl: "https://api.kitwallet.app",
        explorerUrl: "https://nearblocks.io",
        pikespeakUrl: "https://pikespeak.ai",
        nearExplorerUrl: "https://explorer.near.org/",
        indexerUrl: "https://api.ref.finance",
        dataServiceApiUrl: "https://api.data-service.ref.finance",
        txIdApiUrl: "https://api3.nearblocks.io",
        blackList: ["1371#3", "2769#2"],
        REF_FI_CONTRACT_ID: "v2.ref-finance.near",
        WRAP_NEAR_CONTRACT_ID: process.env.WRAP_NEAR_CONTRACT_ID || "wrap.near",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID: "v2.ref-farming.near",
        XREF_TOKEN_ID: "xtoken.ref-finance.near",
        REF_TOKEN_ID: "token.v2.ref-finance.near",
        POOL_TOKEN_REFRESH_INTERVAL: 20,
        TOTAL_PLATFORM_FEE_REVENUE: "3241971.25",
        CUMULATIVE_REF_BUYBACK: "4313890.03",
        BLACKLIST_POOL_IDS: [
          "3699",
          "3734",
          "3563",
          "3613",
          "3620",
          "3625",
          "4744",
          "5029",
        ],
        FARM_LOCK_SWITCH: 0,
        REF_FARM_BOOST_CONTRACT_ID: "boostfarm.ref-labs.near",
        FARM_BLACK_LIST_V2: ["3612"],
        boostBlackList: ["3699#0", "3612#0", "3612#1"],
        REF_UNI_V3_SWAP_CONTRACT_ID: "dclv2.ref-labs.near",
        REF_UNI_SWAP_CONTRACT_ID: "dcl.ref-labs.near",
        switch_on_dcl_farms: "off",
        DCL_POOL_BLACK_LIST: [""],
        BURROW_CONTRACT_ID: "contract.main.burrow.near",
        BLACK_TOKEN_LIST: ["token.pembrock.near"],
        REF_MEME_FARM_CONTRACT_ID: "meme-farming_011.ref-labs.near",
        REF_TOKEN_LOCKER_CONTRACT_ID: "token-locker.ref-labs.near",
        REF_VE_CONTRACT_ID: "",
        MEME_CHECK_IN_CONTRACT_ID: "checkin.refnft.near",
        MEME_NFT_CONTRACT_ID: "ms8.refnft.near",
      };
  }
}

export const colorMap: any = {
  DAI: "rgba(255, 199, 0, 0.45)",
  USDT: "#167356",
  USN: "rgba(255, 255, 255, 0.45)",
  cUSD: "rgba(69, 205, 133, 0.6)",
  HBTC: "#4D85F8",
  WBTC: "#ED9234",
  STNEAR: "#A0A0FF",
  NEAR: "#A0B1AE",
  LINEAR: "#4081FF",
  NEARXC: "#4d5971",
  NearXC: "#4d5971",
  NearX: "#00676D",
  "USDT.e": "#19936D",
  "USDC.e": "#2B6EB7",
  USDC: "#2FA7DB",
  USDt: "#45D0C0",
  "b-USDt": "#167356",
  "b-USDC": "#2FA7DB",
  "b-USDT.e": "#19936D",
  "b-USDC.e": "#2B6EB7",
  "b-ETH": "#A0A0FF",
  "USDC.ws": "#2B6EB7",
  "USDC.we": "#2B6EB7",
  FRAX: "rgba(255,255,255,0.8)",
  sFRAX: "#4A6D7C",
  "zNEARnM-USDC": "#74FA9D",
};