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
