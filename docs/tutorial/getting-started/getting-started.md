---
title: "QuickStart"
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

# QuickStart

Learn how to get the current price of Ethereum using Blockchain APIs.

You can get the code for this tutorial [here](https://github.com/blockchainapis/blockchain-apis-examples/tree/master/examples/1-get-ethereum-price)

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
async def get_price():
    # We instantiate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_price())
```

</TabItem>
</Tabs>

## Step 3: Make the API call

Get the price of selling 1 ETH for USDC

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
amount_outs = blockchain_apis.amount_out(
    # The blockchain on which you want the exchange to take place
    blockchain="ethereum",
    # The address of the token that we sell, here it is WETH address
    tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    # The address of the token that we buy, here it is USDC
    tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    # The amount of tokenIn that we sell.
    # Here we sell 1 WETH.
    # We need to add 10**18 because WETH have 18 decimals.
    amountIn=1 * 10**18
)
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/amount-out" target="_blank">amount_out</a> method of the Blockchain APIs instance.
</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

# We need to create an async function, because we can't do async calls in main Python thread.
async def get_price():
    # We instantiate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainsAPIs() as blockchain_apis:
        amount_outs = await blockchain_apis.amount_out(
            # The blockchain on which you want the exchange to take place
            blockchain="ethereum",
            # The address of the token that we sell, here it is WETH address
            tokenIn="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            # The address of the token that we buy, here it is USDC
            tokenOut="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            # The amount of tokenIn that we sell.
            # Here we sell 1 WETH.
            # We need to add 10**18 because WETH have 18 decimals.
            amountIn=1 * 10**18
        )

asyncio.run(get_price())
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/amount-out" target="_blank">amount_out</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### blockchain

The id of the blockchain from which we are willing to get the price. Here we have put `ethereum` because we want the price
of selling 1 ETH for USDC on the `ethereum` blockchain.

Follow this tutorial to get the list of available blockchains: [Get Supported Blockchains](/docs/tutorial/blockchains/get-supported-blockchains)

#### tokenIn

The address of the token that we are selling. Here we have put `0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2` because that is the
address of the Wrapped Ether token.

#### tokenOut

The address of the token that we are buying. Here we have put `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` because that is
the address of the USDC token.

#### amountIn

The amount of tokenIn that we are selling. Here we have put `1 * 10**18` because we want to sell 1ETH.

We have added `10**18` because the wrapped ETH token has 18 decimals.

If you are willing to know the decimal of a token you can follow this tutorial: [How to get the decimals of a token](/docs/tutorial/tokens/get-token-decimals)

## Step 4: Retrieve result

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

The <a href="/docs/python-sdk/blockchain-apis-sync/amount-out" target="_blank">amount_out</a> method returns a List of <a href="/docs/python-sdk/models/amount-out" target="_blank">AmountOut</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class AmountOut
    blockchain: str
    exchange: str
    tokenIn: str
    tokenOut: str
    amountIn: int
    amountOut: int
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

The <a href="/docs/python-sdk/blockchain-apis/amount-out" target="_blank">amount_out</a> method returns a List of <a href="/docs/python-sdk/models/amount-out" target="_blank">AmountOut</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class AmountOut
    blockchain: str
    exchange: str
    tokenIn: str
    tokenOut: str
    amountIn: int
    amountOut: int
```

</TabItem>
</Tabs>

In this structure, these values are the same as the one that we used to make the API call:
- `blockchain` is the id of the blockchain from which you want to get the price from
- `tokenIn` is the address of the token that we sell
- `tokenOut` is the address of the token that we buy
- `amountIn` is the amount of `tokenIn` that we sell in exchange of `tokenOut`

What interest us are these values:
- `amountOut`: The amount of `tokenOut` that we get after selling `amountIn` `tokenIn`
- `exchange`: The id of the exchange that gives this rate.

To retrieve all values, we first need to loop the result:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
# Previous code
for amount_out in amount_outs:
    # Do something with the AmountOut object
    pass
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
        # Previous code
        for amount_out in amount_outs:
            # Do something with the AmountOut object
            pass
```

</TabItem>
</Tabs>

Then, we will print all of the values:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
# Previous code
print("=======================")
# We loop to get all of the results
for amount_out in amount_outs:
    # The blockchain
    print(f"Blockchain: {amount_out.blockchain}")
    # The id of the exchange
    print(f"Exchange: {amount_out.exchange}")
    # The address of the token that we sell
    print(f"tokenIn: {amount_out.tokenIn}")
    # The address of the token that we buy
    print(f"tokenOut: {amount_out.tokenOut}")
    # The amount of tokenIn that we sell
    print(f"amountIn: {amount_out.amountIn}")
    # The amount of tokenOut that we get after selling amountIn tokenIn
    print(f"amountOut: {amount_out.amountOut}")
    print("=======================")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
        # Previous code
        print("=======================")
        # We loop to get all of the results
        for amount_out in amount_outs:
            # The blockchain
            print(f"Blockchain: {amount_out.blockchain}")
            # The id of the exchange
            print(f"Exchange: {amount_out.exchange}")
            # The address of the token that we sell
            print(f"tokenIn: {amount_out.tokenIn}")
            # The address of the token that we buy
            print(f"tokenOut: {amount_out.tokenOut}")
            # The amount of tokenIn that we sell
            print(f"amountIn: {amount_out.amountIn}")
            # The amount of tokenOut that we get after selling amountIn tokenIn
            print(f"amountOut: {amount_out.amountOut}")
            print("=======================")
```
</TabItem>
</Tabs>

This code should give you something like this:

```sh
=================
Blockchain: ethereum
# highlight-next-line
Exchange: dooar_ethereum
tokenIn: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
tokenOut: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
amountIn: 1000000000000000000
# highlight-next-line
amountOut: 1705409482
=======================
Blockchain: ethereum
Exchange: elk_finance_ethereum
tokenIn: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
tokenOut: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
amountIn: 1000000000000000000
amountOut: 210231391
=======================
...
```

Here, the exchange with id `dooar_ethereum` have an amountOut of `1705409482`.

USDC have 6 decimals so we would get 1705.409482 USDC after exchanging 1 ETH in dooar_ethereum.

_Please  note: The fee of the exchange is took in account by the API. Blockchain APIs is giving you the exact amount that you will get as if you did the exchange. Be careful, some tokens have an  extra fee on buy/sell which is not taken in account using this method._
