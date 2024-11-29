import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Big from "big.js";
import { PoolInfo, quote, get_pool_from_cache } from "../services/swapV3";
import { percentLess, toReadableNumber } from "../utils/numbers";
import { TokenMetadata } from "@/services/ft-contract";
import { ftGetTokenMetadata } from "@/services/token";
import { StablePool } from "@/interfaces/swap";
import { INEAR_USDT_SWAP_TODOS } from "../interfaces/swapMix";
import {
  token_near_id,
  token_usdc_id,
  token_usdt_id,
  near_udsc_pool_id,
  four_stable_pool_id,
} from "../utils/constant";
import { getBoostTokenPrices } from "../services/farm";
import { toPrecision } from "../utils/numbers";
import { usePersistMixSwapStore } from "../stores/swapMix";
import { getReturn, getStablePoolFromCache } from "../services/swap/swap";
import { useSwapStore, usePersistSwapStore } from "@/stores/swap";
const token_in_id = token_near_id;
const token_out_id = token_usdt_id;
const dcl_pool_id = near_udsc_pool_id;
const four_pool_id = four_stable_pool_id;
const useSwapMix = ({
  tokenIn,
  tokenInAmount,
  tokenOut,
  firstInput,
}): INEAR_USDT_SWAP_TODOS => {
  const [estimateOutAmount, setEstimateOutAmount] = useState<string>("0");
  const [quoteDone, setQuoteDone] = useState<boolean>(false);
  const [canSwap, setCanSwap] = useState<boolean>(false);
  const [mixTag, setMixTag] = useState<string>();
  const [mixError, setMixError] = useState<Error>();
  const [dcl_quote_amout, set_dcl_quote_amout] = useState<string>("0");
  const [dclPool, setDclPool] = useState<PoolInfo>();
  const [stablePool, setStablePool] = useState<StablePool>();
  const [usdcMetadata, setUsdcMetadata] = useState<TokenMetadata>();
  const [tokenPriceList, setTokenPriceList] = useState<Record<string, any>>();
  const [avgFee, setAvgFee] = useState<number>(0);
  const [priceImpact, setPriceImpact] = useState<string>("0");
  const { set_near_usdt_swapTodos, set_near_usdt_swapTodos_transaction } =
    usePersistMixSwapStore();
  const { getSlippage, getSmartRoute } = usePersistSwapStore();
  const { getTrigger } = useSwapStore();
  const trigger = getTrigger();
  const slippageTolerance = getSlippage();
  const supportLedger = !getSmartRoute();
  useEffect(() => {
    getAssets();
  }, []);
  useDebounce(
    () => {
      if (
        tokenIn?.id == token_in_id &&
        tokenOut?.id == token_out_id &&
        usdcMetadata?.id &&
        Big(tokenInAmount || 0).gt(0) &&
        !supportLedger
      ) {
        getEstimate();
      } else {
        initState();
      }
    },
    firstInput ? 100 : 300,
    [
      tokenIn?.id,
      tokenIn?.symbol,
      tokenOut?.id,
      tokenOut?.symbol,
      tokenInAmount,
      usdcMetadata?.id,
      supportLedger,
    ]
  );
  useEffect(() => {
    if (
      (tokenIn && tokenIn.id !== token_in_id) ||
      (tokenOut && tokenOut.id !== token_out_id)
    ) {
      set_near_usdt_swapTodos(null);
      set_near_usdt_swapTodos_transaction(null);
    }
  }, [tokenIn?.id, tokenOut?.id]);
  useEffect(() => {
    if (
      tokenIn?.id == token_in_id &&
      tokenOut?.id == token_out_id &&
      usdcMetadata?.id &&
      Big(tokenInAmount || 0).gt(0) &&
      !supportLedger &&
      trigger
    ) {
      getEstimate();
    }
  }, [trigger]);
  async function getEstimate() {
    setQuoteDone(false);
    try {
      const dcl_quote = await quote({
        pool_ids: [dcl_pool_id],
        input_token: tokenIn,
        output_token: usdcMetadata,
        input_amount: tokenInAmount,
        tag: `${tokenIn.id}|2000|${tokenInAmount}`,
      });
      const { amount: dcl_quote_amount } = dcl_quote;
      const v1_quote_amount = await getReturn({
        pool_id: four_pool_id,
        token_in: token_usdc_id,
        token_out: token_out_id,
        amount_in: dcl_quote_amount,
      });
      set_dcl_quote_amout(dcl_quote_amount);
      setEstimateOutAmount(v1_quote_amount);
      setQuoteDone(true);
      setCanSwap(true);
      setMixTag(`${token_in_id}|${token_out_id}|${tokenInAmount}`);
      getPriceImpact(tokenInAmount, v1_quote_amount);
    } catch (error) {
      initState();
      setMixError(error);
    }
  }
  function initState() {
    setEstimateOutAmount("0");
    set_dcl_quote_amout("0");
    setQuoteDone(true);
    setCanSwap(false);
    setMixTag(`${tokenIn?.id}|${tokenOut?.id}|${tokenInAmount}`);
  }
  async function getAssets() {
    const dclPool = await get_pool_from_cache(dcl_pool_id);
    const [stablePool, stablePoolInfo] = await getStablePoolFromCache(
      four_pool_id.toString()
    );

    const tokenUsdcMetadata = await ftGetTokenMetadata(token_usdc_id);
    const tokenPrices = await getBoostTokenPrices();
    setDclPool(dclPool);
    setStablePool(stablePoolInfo);
    setUsdcMetadata(tokenUsdcMetadata);
    setTokenPriceList(tokenPrices);
    getAverageFee(stablePool);
  }
  function getAverageFee(stablePool) {
    const dclPoolFee = 2000 / 100;
    const stablePoolFee = stablePool.fee;
    setAvgFee(dclPoolFee + +stablePoolFee);
  }
  const getPriceImpact = (tokenInAmount, estimateOutAmount) => {
    try {
      const readablEStimateOutAmount = toReadableNumber(
        tokenOut?.decimals || 0,
        estimateOutAmount
      );
      const newPrice = new Big(tokenInAmount || "0").div(
        new Big(readablEStimateOutAmount || "1")
      );
      const priceIn = tokenPriceList[tokenIn.id]?.price;
      const priceOut = tokenPriceList[tokenOut.id]?.price;
      const oldPrice = new Big(priceOut).div(priceIn || "1");
      const priceImpact = newPrice.lt(oldPrice)
        ? "0"
        : newPrice.minus(oldPrice).div(newPrice).times(100).abs().toFixed();
      setPriceImpact(
        new Big(priceImpact).minus(new Big((avgFee || 0) / 100)).toFixed()
      );
    } catch (error) {
      setPriceImpact("0");
    }
  };
  const readblEstimateOutAmount = toReadableNumber(
    tokenOut?.decimals || 0,
    estimateOutAmount
  );
  const readblEstimateOutAmountMin = readblEstimateOutAmount
    ? toPrecision(
        percentLess(slippageTolerance, toPrecision(readblEstimateOutAmount, 6)),
        tokenOut?.decimals ?? 6
      )
    : null;
  const estimateOutAmountMin = estimateOutAmount
    ? Big(percentLess(slippageTolerance, estimateOutAmount)).toFixed(0)
    : null;
  return {
    estimateOutAmount: readblEstimateOutAmount,
    estimateOutAmountWithSlippageTolerance: readblEstimateOutAmountMin,
    dcl_quote_amout,
    nonEstimateOutAmount: estimateOutAmount,
    nonEstimateOutAmountWithSlippageTolerance: estimateOutAmountMin,
    mixTag,
    quoteDone,
    canSwap,
    pools: [dclPool, stablePool],
    tokens: [tokenIn, usdcMetadata, tokenOut],
    slippageTolerance,
    mixError,
    process: "0",
    tokenInAmount,
    fee: avgFee,
    priceImpact,
  };
};
export default useSwapMix;