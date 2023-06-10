---
title: "Quickstart"
description: "Get started with Blockchain APIs in less than 5 minutes"
sidebar_position: 1
keywords:
- Getting started
- Blockchain APIs
- Python
- Javascript
- Java
- Rust
---

# Quickstart

Learn how to get the current price of Ethereum using Blockchain APIs.

If you are just interested in the code, you can get it [here](https://github.com/blockchainapis/blockchain-apis-python-example/blob/master/src/async/get_eth_price.py)

## Step 1

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

## Step 2

Create the Blockchain APIs instance:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
# do some stuff...
```
:::success
This solution works, but for better performance, you can use [Python-Async](?programming-language=async-python)
:::

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py
import asyncio

from blockchainapis import BlockchainAPIs

# We need to create an async function, because we can't do async calls in main Python thread.
async def get_price():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainsAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_price())
```

</TabItem>
</Tabs>

## Step 3

Get the price of selling 1 ETH for USDC

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
amount_out = blockchain_apis.amount_out(
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
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/amount-out" target="_blank">amount_out</a> method of the API instance.
</TabItem>
<TabItem value="async-python" label="Python-Async">

```py
import asyncio

from blockchainapis import BlockchainAPIs

# We need to create an async function, because we can't do async calls in main Python thread.
async def get_price():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainsAPIs() as blockchain_apis:
        amount_out = await blockchain_apis.amount_out(
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

asyncio.run(get_price())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/amount-out" target="_blank">amount_out</a> method of the API instance.

</TabItem>
</Tabs>

### Method parameters

#### blockchain

The id of the blockchain from which we are willing to get the price. Here we have put `ethereum` because we want the price
of selling 1 ETH for USDC on the `ethereum` blockchain.

If you want to get the list of the available blockchains you can follow this tutorial: [Get Supported Blockchains](/docs/tutorial/getting-started/get-supported-blockchains)

#### tokenIn

The address of the token that we are selling. Here we have put `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` because that is the
address of the Wrapped Ether token.

#### tokenOut

The address of the token that we are buying. Here we have put `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` because that is
the address of the USDC token.

#### amountIn

The amount of tokenIn that we are selling. Here we have put `1 * 10**18` because we want to sell 1ETH.

We have added `10**18` because the wrapped ETH have 18 decimals.

If you are willing to know the decimal of a token you can follow this tutorial: [How to get the decimals of a token](/docs/tutorial/tokens/get-token-decimals)

## Step 4 retrieve result


