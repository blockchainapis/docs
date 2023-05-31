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
    <TabItem value="javascript" label="JavaScript">
        <CodeBlock language="shell">
            {`npm install blockchain-apis`}
        </CodeBlock>
    </TabItem>
</Tabs>

## Step 2

Create the Blockchain APIs instance:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py
def hello_world():
  print("Hello, world!")
```
:::success
This solution works, but for better performance, you can use [Python-Async](?programming-language=async-python)
:::

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py
import asyncio

async def get_amount_out(blockchain: str, token0: str, token1: str, amountIn: int):
    async with BlockchainApi(API_KEY) as blockchain_api:
        return await blockchain_api.get_amount_out(blockchain, token0, token1, amountIn)

asyncio.run(get_amount_out(...))
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```js
function helloWorld() {
  console.log('Hello, world!');
}
```

</TabItem>
</Tabs>
