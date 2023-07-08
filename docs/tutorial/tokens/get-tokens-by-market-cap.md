---
title: "How to get the tokens of any blockchain ordered by market cap"
description: "Learn how to get the list of tradable tokens of any blockchain ordered by Market cap."
sidebar_position: 1
sidebar_label: "Get Tokens By Market Cap"
---

Blockchain APIs is only compatible with the token that have a liquidity pool available. This way it limits his tokens to only the tradable tokens and remove all of the tokens that have no value.

Additionaly, the API computes the market cap of all of the tokens available, this way you can choose your trading strategy depending on the market cap of the token.

At the end of the tutorial you will learn:
- How to get the list of supported tokens by Blockchain APIs
- How to get the market cap of each of these tokens

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

## Step 3: Get the list of tokens ordered by market cap


