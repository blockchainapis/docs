---
title: "How to use Blockchain APIs"
description: "Learn everything you need to know about Blockchain APIs in 5 minutes."
sidebar_position: 4
---

Blockchain APIs has 3 main methods:
- [Get Reserves](/docs/tutorial/pairs/get-reserves)
- [Get Amount Out](/docs/tutorial/pairs/get-swap-amount-out)
- [Get Amount In](/docs/tutorial/pairs/get-swap-amount-in)

If you know how to use these 3 methods, you know how to utilise the API.

## The main methods

### Get Reserves

The [Get Reserves](/docs/tutorial/pairs/get-reserves) method allow you to get the
reserves of a specific pair.

The good thing about Blockchain APIs is that it gives you the reserve of the pair
inside of every dex available for the given blockchain.

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

### Simulate trades

One of the main feature is trade-simulation using the [amount_out](/docs/tutorial/pairs/get-swap-amount-out) and [amount_in](/docs/tutorial/pairs/get-swap-amount-out) methods.

The goal here, is for example in the screenshot from uniswap below:
<img loading="eager" alt="Choose plan page" src="/img/docs/simulations/uniswap-amount-out.png" />

Here you can see the amount of USDC that you will get after exchange one 1 ETH for USDC.

The API will copy the math of the blockchain and give you the exact same output for the trade as if you
executed it on the blockchain.

For example this request:

https://api.blockchainapis.io/v0/exchanges/pairs/amountOut?blockchain=ethereum&tokenIn=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2&tokenOut=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&amountIn=1000000000000000000

Will give you the amount of USDC that you will get after selling one ETH one every DEX.

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


