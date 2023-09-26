---
title: "How to display a token amount in his decimal form"
description: "Learn how to convert a token from his unsigned integer form to his decimal form. And also from his unsigned integer form to decimal form"
sidebar_position: 3
sidebar_label: "Display Tokens in Decimal Form"
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

At the end of this tutorial you will learn:
- How to get the decimals of a token
- Transform a floating number like 2.45 ETH to his integer representation: `2450000000000000000`
- Transform an unsigned representation of a number: `2450000000000000000` to his decimal representation: `2.45`

:::tip
Blockchain APIs is only returning values as unsigned integers because that is how the Blockchain is storing data. We advise you to keep
all of the numbers as unsigned integers because it is more precise. Use only the decimal form when you want to display the number to a user.
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

async def get_decimal_form():
    async with BlockchainAPIs() as blockchain_apis:
        # Get the decimals of the given token in the given blockchain
        decimals = await blockchain_apis.decimals(blockchain=blockchain, token=token)

asyncio.run(get_decimal_form())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/decimals" target="_blank">decimals</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### blockchain

The id of the blockchain where the token is. Here we put `ethereum` because we want the decimals of the given token on the Ethereum blockchain.

:::tip
Follow this tutorial to get the list of available blockchain ids: [Get Supported Blockchains](/docs/tutorial/blockchains/get-supported-blockchains)
:::

#### token

The address of the token that we want to get the decimals of. Here we have put `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` which is the address
of the Wrapped Ether token.

You can put any token that is supported by Blockchain APIs.

:::tip
You can get the list of supported tokens following this tutorial: [Get Tokens By Market Cap](/docs/tutorial/tokens/get-tokens-by-market-cap)
:::

## Step 4: Display the token in his decimal form

In this part, we will considere that we have: `2450000000000000000` WETH

And we will first print this value into his decimal form: `2.45` WETH

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get the decimals of the given token in the given blockchain
decimals = blockchain_apis.decimals(blockchain="ethereum", token="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
decimal_form = blockchain_apis.get_token_decimal_form(amount=2450000000000000000, decimals=decimals)
print(f"2450000000000000000 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 in decimal is: {decimal_form} WETH")
```

Here we use the utility method <a href="/docs/python-sdk/blockchain-apis-sync/get-token-decimal-form" target="_blank">get_token_decimal_form</a> of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_decimal_form(blockchain: str, token: str, amount: int, name: str):
    async with BlockchainAPIs() as blockchain_apis:
        # Get the decimals of the token
        decimals = await blockchain_apis.decimals(blockchain, token)
        # Get the decimal form of the token from the amount of decimals
        decimal_form = blockchain_apis.get_token_decimal_form(amount=amount, decimals=decimals)
        print(f"{amount} {token} in decimal is: {decimal_form} {name}")

asyncio.run(get_decimal_form("ethereum", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 2450000000000000000, "WETH"))
```

Here we use the utility method <a href="/docs/python-sdk/blockchain-apis/get-token-decimal-form" target="_blank">get_token_decimal_form</a> of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### amount

The amount of the token that we try to convert in decimal form. Here we have put: 2450000000000000000

#### decimals

The amount of decimals that the token has. We got this decimal before.

:::tip
You can follow [this tutorial](/docs/tutorial/tokens/get-token-decimals) to get the decimals of a token
:::

### Result

This code should print:

```
2450000000000000000 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 in decimal is: 2.45 WETH
```

## Step 5: Display the token in his unsigned integer form

In the previous step, we went from `2450000000000000000` WETH to `2.45` WETH

In this step, we will do the reverse:

We will convert `2542.42 USDC` to the unsigned integer form: `2542420000 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48`

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

decimals = blockchain_apis.decimals("ethereum", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
# Get the unsigned integer form of the token from the amount of decimals
unsigned_form = blockchain_apis.get_token_unsigned_form(amount="2542.42", decimals=decimals)
print(f"2542.42 USDC in unsigned integer form is: {unsigned_form} 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
```

Here we use the utility method <a href="/docs/python-sdk/blockchain-apis/get-token-unsigned-form" target="_blank">get_token_unsigned_form</a> of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def to_unsigned_form(blockchain: str, token: str, decimal_amount: str, name: str):
    async with BlockchainAPIs() as blockchain_apis:
        # Get the amount of decimals that the token has
        decimals = await blockchain_apis.decimals(blockchain, token)
        # Get the unsigned integer form of the token from the amount of decimals
        unsigned_form = blockchain_apis.get_token_unsigned_form(amount=decimal_amount, decimals=decimals)
        print(f"{decimal_amount} {name} in unsigned integer form is: {unsigned_form} {token}")

asyncio.run(to_unsigned_form("ethereum", "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", "2542.42", "USDC"))
```

Here we use the utility method <a href="/docs/python-sdk/blockchain-apis-sync/get-token-unsigned-form" target="_blank">get_token_unsigned_form</a> of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### amount

The amount that you put in decimal str form. Here we have put `"2542.42"`

#### decimals

The amount of decimals that we get from the previous API call.

### Result

This program should print the following:

```
2542.42 USDC in unsigned integer form is: 2542420000 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
```
