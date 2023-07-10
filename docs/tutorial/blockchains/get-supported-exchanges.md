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

# Get the available exchanges for all of the blockchains
exchanges = blockchain_apis.exchanges()
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/exchanges" target="_blank">exchanges</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_exchanges():
    async with BlockchainAPIs() as blockchain_apis:
        # Get the list of available exchanges for all of the blockchains
        exchanges = await blockchain_apis.exchanges()

asyncio.run(get_exchanges())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/exchanges" target="_blank">exchanges</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### page (optional)

The page of the returned value.

:::tip
This value can be ignored for this version of the API
:::

#### blockchain (optional)

The id of the blockchain from which you want to get the exchanges.

Here we didn't have put any blockchain id, here is how it would have looked like if we put the `ethereum` blockchain id:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get the available exchanges for the ethereum blockchain
exchanges = blockchain_apis.exchanges(blockchain="ethereum")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_exchanges():
    async with BlockchainAPIs() as blockchain_apis:
        # Get the list of available exchanges for the ethereum blockchain
        exchanges = await blockchain_apis.exchanges(blockchain="ethereum")

asyncio.run(get_exchanges())
```

</TabItem>
</Tabs>

:::tip
You can follow this tutorial: [Get Supported Blockchains](/docs/tutorial/blockchains/get-supported-blockchains) in order
to get the id of all of the supported blockchains of the API.
:::
