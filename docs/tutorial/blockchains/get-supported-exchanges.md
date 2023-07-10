---
title: "Get Supported Exchanges"
description: "Learn how to get the list of decentralized exchanges available on any blockchain"
sidebar_position: 2
keywords:
- uniswap
- sushiswap
- shibaswap
- dooar
- pancakeswap
- exchanges
- exchange
- lydia-finance
- elk-finance
tags:
- exchanges
---

Each Blockchain has his own list of DEX (Decentralized Exchanges). For example:
- [UniswapV2](https://app.uniswap.org/)
- [Sushiswap](https://www.sushi.com/)
- [Pancakeswap](https://pancakeswap.finance/swap)
- ...


In this tutorial you will learn how to get the list of every decentralized exchange available for a given blockchain.

At the end of the tutorial, you should get a table like this:

| Exchange ID               | Blockchain ID   | Exchange Name   | Exchange URL                                  |
| ------------------------- | --------------- | --------------- | --------------------------------------------- |
| dooar_ethereum            | ethereum        | DOOAR           | https://dooar.com                             |
| elk_finance_ethereum      | ethereum        | Elk Finance     | https://elk.finance/                          |
| pancakeswap_ethereum      | ethereum        | PancakeSwap     | https://pancakeswap.finance/info/eth          |
| plasmafinance_ethereum    | ethereum        | Plasma Finance  | https://apy.plasma.finance/#/hyper-dex/market |
| radioshack_ethereum       | ethereum        | Radioshack      | https://www.radioshack.org/                   |
| shibaswap_ethereum        | ethereum        | ShibaSwap       | https://shibaswap.com/#/                      |
| sushiswap_ethereum        | ethereum        | SushiSwap       | https://www.sushi.com/swap                    |
| uniswapv2_ethereum        | ethereum        | Uniswap V2      | https://app.uniswap.org/                      |

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
async def get_exchanges():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_exchanges())
```

</TabItem>
</Tabs>

## Step 3: Get the list of available exchanges

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


