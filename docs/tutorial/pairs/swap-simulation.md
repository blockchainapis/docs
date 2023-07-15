---
title: "How to predict the output of a swap?"
sidebar_label: "Predict Token Swap Output"
description: "Learn how to predict the amount of tokens that you will get after selling a token on ."
sidebar_position: 3
---

With Automated Market Makers, for a specific pair, for example: WETH-USDC, it is possible
to predict the exact amount of USDC that you will get after exchanging 1 WETH.

For example in this screenshot:
<img loading="eager" alt="Choose plan page" src="/img/docs/simulations/uniswap-amount-out.png" />

We can see that if we exchange 1 ETH for USDC, Uniswap gives us that we will get 1938.92 USDC.

The goal of this tutorial is to learn how to use Blockchain APIs to get the output amount of this trade.

:::caution
The amount out is computed using the exact same math as inside of the blockchain, taking 
liquidity provider fee in account. Which means that for big tokens like USDC and WETH, you
will get the **exact** same output as if you ran the trade on the blockchain.

But be careful on 2 points:
- During high activity, because of slippage, you might get a slightly different amount out
- Some tokens implement a fee mechanism on buy or sell, this mechanism is not
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

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Do an API call in order to get the amount out
# highlight-start
amount_outs = blockchain_apis.amount_out(
    # The blockchain on which you want the exchange to take place
    blockchain="ethereum",
    # The address of the token that we sell, here it is WETH address
    tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    # The address of the token that we buy, here it is USDC
    tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    # The amount of tokenIn that we sell.
    # Here we sell 1 WETH.
    # We need to add 10**18 because WETH have 18 decimals.
    amountIn=1 * 10**18
)
# highlight-end
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/amount-out" target="_blank">amount_out</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

# The blockchain that you want to get the price from
BLOCKCHAIN = "ethereum"

# The address of the token that we are selling
# Here we put the address of wrapped ETH
TOKEN_IN = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"

# The address of the token that we are buying
# Here we put USDC
TOKEN_OUT = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"

# The amount of TOKEN_IN that we are selling.
# We add 10**18 because the TOKEN_IN is WETH and WETH has
# 18 decimals
AMOUNT_IN = 1 * 10**18

async def get_amount_out():
    async with BlockchainAPIs() as blockchain_apis:
        # Call the API to get the amount out
        # highlight-start
        amount_outs = await blockchain_apis.amount_out(
            blockchain=BLOCKCHAIN,
            tokenIn=TOKEN_IN,
            tokenOut=TOKEN_OUT,
            amountIn=AMOUNT_IN
        )
        # highlight-end

asyncio.run(get_amount_out())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/amount-out" target="_blank">amount_out</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

## Step 4: Retrieve result


