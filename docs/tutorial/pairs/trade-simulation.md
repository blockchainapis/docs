---
title: "Trade Simulations"
description: "Get how much token you will get after executing a certain trade"
sidebar_position: 3
---

With Automated Market Makers, for a specific pair, for example: WETH-USDC, it is possible
to predict the exact amount of USDC that you will get after exchanging 1 WETH.

The goal of Blockchain APIs is to compute the amount of token0 that you will get after
selling any amount of token1.

In our examples, we will use the pair WETH-USDC and we will answer the following questions:
- How much USDC will I get if I sell 1 WETH?
- How much WETH do I need to sell in order to get 2000 USDC?

The example above will apply to any token and any pair on the blockchain. More generally, for
a given token0 and token1 at the end of this tutorial you will learn:
- How to get the amount of token1 that you will get after selling a certain amount of token0
- How to get the amount of token0 that you need in order to get a certain amount of token1

:::caution
The amount out is computed using the exact same math as inside of the blockchain, taking 
liquidity provider fee in account. Which means that for big tokens like USDC and WETH, you
will get the **exact** same output as if you ran the trade on the blockchain.

But be careful: Some tokens implement a fee mechanism on buy or sell, this mechanism is not
taken in account in the math made by Blockchain APIs.
:::
