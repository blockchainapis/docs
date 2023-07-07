---
title: "How to get the decimals of a token"
description: "Learn how to get the decimals of any token in any blockchain"
sidebar_position: 2
sidebar_label: "Get Token Decimals"
---

Inside of any blockchain (whenever it is Ethereum, Arbitrum, Polygon...), the numbers are stored as integers.
Applications like [Uniswap](https://app.uniswap.org/#/swap) or [Metamask](https://metamask.io/) are displaying
the number as float.

For example in the screenshot of Uniswap below:

<img loading="eager" alt="Choose plan page" src="/img/docs/decimals/uniswap.png" />

As you can see, I am trying to exchange 2.45 ETH for 4,255.19 USDC

This is what Uniswap displays, but actually inside of the blockchain, these numbers are stored as unsigned integers this way:

- ETH: `2450000000000000000`
- USDC: `4255190000`

As you can see, it is less user-friendly to see numbers like above instead of their decimal representation, so you may ask
yourself: _Why does the blockchain store the numbers as integers and not floating numbers?_

The blockchain store these numbers as integers because there is no way to store a floating number inside of the blockchain.
Floating numbers in IT are usually not precise, indeed, it is better to avoid these numbers when we deal with financial data
like the blockchain does.

To make it user-friendly, the [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token standard have
added a `decimal` variable inside of each tokens. This `decimal` variable is used for application that need to display some
numbers to users (like Uniswap and MetaMask). In our example above, ETH have 18 decimals point and USDC have 6, that is where all
of these `0` come from.

At the end of this tutorial you will learn how to get the decimals of a token

:::tip
If you are looking to a tutorial on how to display an amount of tokens in decimal form, follow [this tutorial](display-tokens-in-decimal-form)
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
async def get_price():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_price())
```

</TabItem>
</Tabs>

## Step 3: Get the decimals of a token

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get the decimals of the given token in the given blockchain
decimals = blockchain_apis.decimals(blockchain="ethereum", token="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/decimals" target="_blank">decimals</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_decimals():
    async with BlockchainAPIs() as blockchain_apis:
        # Get the decimals of the given token in the given blockchain
        decimals = await blockchain_apis.decimals(blockchain=blockchain, token=token)

asyncio.run(get_decimals())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/decimals" target="_blank">decimals</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### blockchain

The id of the blockchain where the token is. Here we put `ethereum` because we want the decimals of the given token on the Ethereum blockchain.

:::tip
Follow this tutorial to get the list of available blockchain ids: [Get Supported Blockchains](/docs/tutorial/getting-started/get-supported-blockchains)
:::

#### token

The address of the token that we want to get the decimals of. Here we have put `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` which is the address
of the Wrapped Ether token.

You can put any token that is supported by Blockchain APIs.

:::tip
You can get the list of supported tokens following this tutorial: [Get Tokens By Market Cap](/docs/tutorial/tokens/get-tokens-by-market-cap)
:::

