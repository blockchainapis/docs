---
title: "Get Blockchain Pairs"
description: "Learn how to get the list of trading pairs available for a certain blockchain"
sidebar_position: 1
---

In every blockchain supported by [Blockchain APIs](https://www.blockchainapis.io), there
is a certain number of trading pairs available.

For example the pair: WETH-USDC

Which allow you to exchange ETH for USDC.

At the end of this tutorial you will learn how to get all of the trading pairs available on a
specific blockchain.

:::tip
If you are interested only in the code, you can get it following this link: https://github.com/blockchainapis/blockchain-apis-examples/tree/master/examples/8-get-pairs
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

## Step 3: Get pairs

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get pairs for every blockchain
exchanges = blockchain_apis.exchanges()
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/pairs" target="_blank">pairs</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_pairs():
    async with BlockchainAPIs() as blockchain_apis:
        # Get pairs for every blockchain
        exchanges = await blockchain_apis.pairs()

asyncio.run(get_pairs())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/exchanges" target="_blank">pairs</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### Page (optional)

To prevent sending a too big result, Blockchain APIs will return only 100 results per pages.

By default, if you don't put any value, Blockchain APIs will return the result of the first page.
With this parameter you can go to another page.

For example to get the second page of results:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get second page of all pairs available in Blockchain APIs
exchanges = blockchain_apis.exchanges(page=2)
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_pairs():
    async with BlockchainAPIs() as blockchain_apis:
        # Get second page of all pairs available in Blockchain APIs
        exchanges = await blockchain_apis.pairs(page=2)

asyncio.run(get_pairs())
```

</TabItem>
</Tabs>

#### blockchain (optional)

The id of the blockchain that you want to get the results from.

If you ommit this parameter, it will give you the pairs for all of the blockchains.

For example, if you want to get the only pairs of the `ethereum` blockchain:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get first page of pairs available on the blockchain with id ethereum
exchanges = blockchain_apis.exchanges(blockchain="ethereum")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_pairs():
    async with BlockchainAPIs() as blockchain_apis:
        # Get first page of pairs available on the blockchain with id ethereum
        exchanges = await blockchain_apis.pairs(blockchain="ethereum")

asyncio.run(get_pairs())
```

</TabItem>
</Tabs>

:::tip
If you want to get the list of valid blockchain ids supported by the API,
you can follow this tutorial: <a href="/docs/tutorial/blockchains/get-supported-blockchains" target="_blank">Get Supported Blockchains</a>
:::

#### exchange (optional)

The id of the exchange from which you want to get the pair.

This parameter is optional and if you omit it, by default, it will send you all pairs from all supported exchanges by
Blockchain APIs.

Example of exchange ids that you can put:
- uniswapv2_ethereum
- sushiswap_ethereum
- shibaswap_ethereum

:::tip
You can get the full list of supported exchange ids by following this tutorial:
<a href="/docs/tutorial/blockchains/get-supported-exchanges" target="_blank">Get Supported Exchanges</a>
:::

In the example below, we will get the second page of pairs available on uniswapv2_ethereum:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get second page of pairs available on uniswapv2_ethereum
exchanges = blockchain_apis.exchanges(page=2, exchange="uniswapv2_ethereum")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_pairs():
    async with BlockchainAPIs() as blockchain_apis:
        # Get second page of pairs available on uniswapv2_ethereum
        exchanges = await blockchain_apis.pairs(page=2, exchange="uniswapv2_ethereum")

asyncio.run(get_pairs())
```

</TabItem>
</Tabs>
