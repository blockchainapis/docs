---
title: "Get Supported Blockchains"
description: "Learn how to get the list of supported blockchains by the API"
sidebar_position: 3
keywords:
- blockchain
- ethereum
- polygon
- arbitrum
- bsc
- binance smart chain
- avalanche
tags:
- blockchains
---

Each blockchain have a unique id, you need this id in order to know with which blockchain you are willing to interact with in Blockchain APIs.

At the end of the tutorial you will be able to print all blockchain IDs supported by the API like this:

- arbitrum
- avalanche
- bsc
- ethereum
- polygon

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

## Step 2: Create the instance

Create the Blockchain APIs instance:

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
async def get_blockchains():
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_blockchains())
```

</TabItem>
</Tabs>

## Step 3: Make the API call

Get all blockchains supported by [Blockchain APIs](https://www.blockchainapis.io) with all of their informations.

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

# Create the blockchain_apis instance that allow us to make calls
# to Blockchain APIs
blockchain_apis = BlockchainAPIsSync()

# Get the blockchains
blockchains = blockchain_apis.blockchains()
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/blockchains" target="_blank">blockchains</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_blockchains():
    async with BlockchainAPIs() as blockchain_apis:
        # Make an API call in order to get the list of blockchains.
        blockchains = await blockchain_apis.blockchains()

asyncio.run(get_blockchains())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/blockchains" target="_blank">blockchains</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

## Step 4: Retrieve result

### The returned model

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

This method call return a List of [Blockchain](/docs/python-sdk/models/blockchain) models.

Here is the structure of one Blockchain model:

```py
@dataclass(slots=True, frozen=True)
class Blockchain
    blockchain: str
    name: str
    chain_id: int
    explorer: str
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

This method call return a List of [Blockchain](/docs/python-sdk/models/blockchain) models.

Here is the structure of one Blockchain model:

```py
@dataclass(slots=True, frozen=True)
class Blockchain
    blockchain: str
    name: str
    chain_id: int
    explorer: str
```

</TabItem>
</Tabs>

- `blockchain`: Is the id of the blockchain, this is the field that we are interested in here
- `name`: The name of the blockchain, for example: `Ethereum`
- `chain_id`: The id of the chain (for example, the Ethereum blockchain has an id of `1`)
- `explorer`: The url of the explorer of transactions for the blockchain, for example: https://etherscan.io/

### Get the blockchain ids
