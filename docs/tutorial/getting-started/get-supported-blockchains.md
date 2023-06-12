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
