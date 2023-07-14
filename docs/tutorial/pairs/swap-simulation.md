---
title: "Simulate Token Swaps"
sidebar_label: "How To Determine Exact Token Swap Rates"
description: "Learn how to predict the amount of tokens that you will get after a certain swap."
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

## Step 1: Install the SDK

Get the SDK for your favorite language:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

<Tabs groupId="programming-language" queryString>
    <TabItem value="python" label="Python" default>
        <CodeBlock language="shell">
            {`pip install blockchain-apis`}
        </CodeBlock>
    </TabItem>
</Tabs>

## Step 2: Create the Blockchain APIs instance

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
# do some stuff...
```
:::success
This solution works, but for better performance, you can use [Python-Async](?programming-language=async-python#step-2-create-the-instance)
:::

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

# We need to create an async function, because we can't do async calls in main Python thread.
async def get_reserves(blockchain: str, token0: str, token1: str):
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_reserves("ethereum", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"))
```

</TabItem>
</Tabs>

## Step 3: Get the amount out

In this step we will compute the amount of USDC token that we will own after exchanging 1 WETH for USDC.


