---
title: "How to use Blockchain APIs?"
description: "Learn everything you need to know about Blockchain APIs in 15 minutes."
sidebar_label: "How to use Blockchain APIs"
sidebar_position: 4
---

Blockchain APIs have 3 main methods:
- [Get Reserves](/docs/tutorial/pairs/get-reserves)
- [Get Amount Out](/docs/tutorial/pairs/get-swap-amount-out)
- [Get Amount In](/docs/tutorial/pairs/get-swap-amount-in)

If you know how to use these 3 methods, you know how to use the core methods of the API.

:::tip
You can try these methods for free on the [API Sandbox](https://api.blockchainapis.io/docs):
- [Get Reserves](https://api.blockchainapis.io/docs#/exchanges/reserves_v0_exchanges_pairs_reserves_get)
- [Get Amount Out](https://api.blockchainapis.io/docs#/exchanges/amountOut_v0_exchanges_pairs_amountOut_get)
- [Get Amount In](https://api.blockchainapis.io/docs#/exchanges/amountIn_v0_exchanges_pairs_amountIn_get)
:::

## The main methods

### Get Reserves

The [Get Reserves](/docs/tutorial/pairs/get-reserves) method allows you to get the
reserves of a specific pair. It will give you the reserves of the pair in every available
Decentralized Exchange for the given blockchain.

For example this request:

https://api.blockchainapis.io/v0/exchanges/pairs/reserves?blockchain=ethereum&token0=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&token1=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48

Gives you the reserves of the WETH-USDC pair.

Here is the result:
```json
[
    {
        "blockchain": "ethereum",
        "exchange": "pancakeswap_ethereum",
        "token0": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "token1": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-start
        "reserve0": 67152413143271526864,
        "reserve1": 127071093888
        // highlight-end
    }
    {
        "blockchain": "ethereum",
        "exchange": "sushiswap_ethereum",
        "token0": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "token1": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-start
        "reserve0": 4591463100347026224822,
        "reserve1": 8711355660420
        // highlight-end
    },
    {
        "blockchain": "ethereum",
        "exchange": "uniswapv2_ethereum",
        "token0": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "token1": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-start
        "reserve0": 14459464172860251614205,
        "reserve1": 27462030232062
        // highlight-end
    }
    ...
]
```

:::tip
For more information, follow this tutorial: <a href="/docs/tutorial/pairs/get-reserves" target="_blank">Get Reserves</a>
:::

### Simulate trades

One of the main features of [Blockchain APIs](https://www.blockchainapis.io) is trade-simulation using the [amount_out](/docs/tutorial/pairs/get-swap-amount-out) and [amount_in](/docs/tutorial/pairs/get-swap-amount-in) methods.

For example, in the screenshot below:
<img loading="eager" alt="Choose plan page" src="/img/docs/simulations/uniswap-amount-out.png" />

You can see the amount of USDC that you will get after exchanging 1 ETH for USDC.

The API will copy the math of the blockchain and give you the exact same output for the trade as if you
executed it on the blockchain.

For example this request:

https://api.blockchainapis.io/v0/exchanges/pairs/amountOut?blockchain=ethereum&tokenIn=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&tokenOut=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amountIn=1000000000000000000

Will give you the amount of USDC that you will get after selling one ETH on every Decentralized Exchange.

Here is the result of the request:
```json
[
    {
        "blockchain": "ethereum",
        "exchange": "pancakeswap_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amountIn": 1000000000000000000,
        // highlight-next-line
        "amountOut": 1859920435
    },
    {
        "blockchain": "ethereum",
        "exchange": "sushiswap_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amountIn": 1000000000000000000,
        // highlight-next-line
        "amountOut": 1891997998
    },
    {
        "blockchain": "ethereum",
        "exchange": "uniswapv2_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "amountIn": 1000000000000000000,
        // highlight-next-line
        "amountOut": 1892347881
    },
    ...
]
```

The method [amount_in](/docs/tutorial/pairs/get-swap-amount-in) will allow you to make the reverse operation: For example,
if you are willing to buy 2000.00 USDC, it will give you the amount of ETH that you need to have to be able
to execute this trade.

For example, the API call below:

https://api.blockchainapis.io/v0/exchanges/pairs/amountIn?blockchain=ethereum&tokenIn=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&tokenOut=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amountOut=2000000000

Will give you the amount of ETH required to buy 2000 USDC on every DEX.

Here is the result of the request:
```json
[
    {
        "blockchain": "ethereum",
        "exchange": "pancakeswap_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-next-line
        "amountIn": 1076519167424618438,
        "amountOut": 2000000000
    },
    {
        "blockchain": "ethereum",
        "exchange": "sushiswap_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-next-line
        "amountIn": 1056724306341808230,
        "amountOut": 2000000000
    },
    {
        "blockchain": "ethereum",
        "exchange": "uniswapv2_ethereum",
        "tokenIn": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "tokenOut": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // highlight-next-line
        "amountIn": 1055528980177225328,
        "amountOut": 2000000000
    }
    ...
]
```

:::caution
There are two limitations of Blockchain APIs computing:
- During high volatility the amount that you will get may differ because of slippage
- If some tokens have a fee mechanism (for example, 5% sell fee), this fee mechanism is not taken into account by the Blockchain APIs math

Other than that, you will get the exact same output as Uniswap shows you.
:::

## Helper methods

The 3 method that we saw are the core methods of the API, the other methods support the above methods.

In this part we will see:
- How to handle token decimals
- How to get the list of pairs
- How to get the list of available exchange IDs
- How to get the list of available blockchain IDs

### Handling of decimals

In the last request we have made, you can see that we input: 2000000000 USDC.

You may ask:
> Why did we write 2000000000 instead of 2000.00?

Because the blockchain only uses integer data (they are more precise). Here we have put `2000000000` instead of `2000.00` because the USDC token has 6 decimals. So we have:

2000.00 USDC * 10**6 = 2000000000

That is where the `2000000000` comes from.

By default, the API will copy the Blockchain behavior and return the value as an integer. We recommend you to keep
the same form for your computations.

If you want to display the token in his decimal form (2000000000 to 2000.00) you can follow these tutorials: [Get Token Decimals](/docs/tutorial/tokens/get-token-decimals) and [Display Tokens in Decimal Form](/docs/tutorial/tokens/display-tokens-in-decimal-form)

### Getting available Pairs

Since the beginning of this page, we only took the pair USDC - WETH as an example. But the API supports more than 300000 pairs (and all new pairs are added when they are created).

For example this API call:

https://api.blockchainapis.io/v0/exchanges/pairs?page=1

Will give you the first 100 pairs supported by the API

Here is the result:
```json
{
    "page": 1,
    "total_pages": 3245,
    "data": [
        {
            "blockchain": "ethereum",
            "exchange": "dooar_ethereum",
            "token0": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "token1": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "fee": 1000
        },
        {
            "blockchain": "ethereum",
            "exchange": "dooar_ethereum",
            "token0": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "token1": "0xe3c408BD53c31C085a1746AF401A4042954ff740",
            "fee": 1000
        },
        {
            "blockchain": "ethereum",
            "exchange": "dooar_ethereum",
            "token0": "0x473037de59cf9484632f4A27B509CFE8d4a31404",
            "token1": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            "fee": 1000
        },
        ...
    ]
}
```

If you want a guide on how to get the pairs, you can follow this tutorial: [Get Blockchain Pairs](/docs/tutorial/pairs/get-blockchain-pairs)

### Blockchains

[Blockchain APIs](https://www.blockchainapis.io) support many blockchains. So, for every request that you make,
you need to specify the blockchain used.

To get all the supported blockchain, you can do this API call:

https://api.blockchainapis.io/v0/blockchains/

This API call will give you all the supported blockchains with the ID that you can use for other
API calls.

Here is the result of the API call, the ID of the blockchain has been highlighted:

```json
[
    {
        // highlight-next-line
        "blockchain": "arbitrum",
        "name": "Arbitrum",
        "chain_id": 42161,
        "explorer": "https://arbiscan.io/"
    },
    {
        // highlight-next-line
        "blockchain": "avalanche",
        "name": "Avalanche",
        "chain_id": 43114,
        "explorer": "https://snowtrace.io/"
    },
    {
        // highlight-next-line
        "blockchain": "bsc",
        "name": "Binance Smart Chain",
        "chain_id": 56,
        "explorer": "https://bscscan.com/"
    },
    {
        // highlight-next-line
        "blockchain": "ethereum",
        "name": "Ethereum",
        "chain_id": 1,
        "explorer": "https://etherscan.io/"
    },
    {
        // highlight-next-line
        "blockchain": "polygon",
        "name": "Polygon",
        "chain_id": 137,
        "explorer": "https://polygonscan.com/"
    }
]
```

For more information, follow this tutorial: [Get Supported Blockchains](/docs/tutorial/blockchains/get-supported-blockchains)

### Exchanges

[Blockchain APIs](https://www.blockchainapis.io) support many Decentralized Exchanges.

As you saw in the previous calls, in the result, you got the id of the exchange.

If you are willing to work on a specific exchange, you can specify the ID of the exchange in your API call.

The API call below will give you the list of available exchanges:

https://api.blockchainapis.io/v0/exchanges/?page=1

In the result below, we have highlighted the ID of the exchange that you can use in other API calls:

```json
{
  "page": 1,
  "total_pages": 1,
  "data": [
    {
      // highlight-next-line
      "exchange": "dooar_ethereum",
      "blockchain": "ethereum",
      "name": "DOOAR",
      "url": "https://dooar.com"
    },
    {
      // highlight-next-line
      "exchange": "pancakeswap_ethereum",
      "blockchain": "ethereum",
      "name": "PancakeSwap",
      "url": "https://pancakeswap.finance/info/eth"
    },
    {
      // highlight-next-line
      "exchange": "uniswapv2_ethereum",
      "blockchain": "ethereum",
      "name": "Uniswap V2",
      "url": "https://app.uniswap.org/"
    },
    ...
  ]
}
```

For more information, follow this tutorial: [Get Supported Exchanges](/docs/tutorial/blockchains/get-supported-exchanges)
