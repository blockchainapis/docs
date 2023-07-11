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

## Step 4: Retrieve result

### The returned model

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

The <a href="/docs/python-sdk/blockchain-apis-sync/pairs" target="_blank">pairs</a> method returns a <a href="/docs/python-sdk/models/pairs" target="_blank">Pairs</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Pairs
    page: int
    total_pages: int
    data: List[Pair]
```

In this structure, you have:
- `page`: The current page that we are at
- `total_pages`: The total amount of pages. If you want all of the pairs, you can use this value to loop to get all
                 available pages.
- `data`: Contains the List of [Pair](/docs/python-sdk/models/pair) for the given page.

The [Pair](/docs/python-sdk/models/pair) model contains all of the informations that are required on a specific pair. Here is his structure:

```py
@dataclass(slots=True, frozen=True)
class Pair
    blockchain: str
    exchange: str
    token0: str
    token1: str
    fee: int
```

#### blockchain

The id of the blockchain that the pair is.

#### exchange

The id of the exchange that the pair is.

#### token0

The first token of the pair.

#### token1

The second token of the pair.

#### fee

The fee that is given to liquidity providers on every trade on this pair.

This fee is written in 100000 of percent, for example: 1000 fee means 1% fee.

</TabItem>
<TabItem value="async-python" label="Python-Async">

The <a href="/docs/python-sdk/blockchain-apis/pairs" target="_blank">pairs</a> method returns a <a href="/docs/python-sdk/models/pairs" target="_blank">Pairs</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Pairs
    page: int
    total_pages: int
    data: List[Pair]
```

In this structure, you have:
- `page`: The current page that we are at
- `total_pages`: The total amount of pages. If you want all of the pairs, you can use this value to loop to get all
                 available pages.
- `data`: Contains the List of [Pair](/docs/python-sdk/models/pair) for the given page.

The [Pair](/docs/python-sdk/models/pair) model contains all of the informations that are required on a specific pair. Here is his structure:

```py
@dataclass(slots=True, frozen=True)
class Pair
    blockchain: str
    exchange: str
    token0: str
    token1: str
    fee: int
```

#### blockchain

The id of the blockchain that the pair is.

#### exchange

The id of the exchange that the pair is.

#### token0

The first token of the pair.

#### token1

The second token of the pair.

#### fee

The fee that is given to liquidity providers on every trade on this pair.

This fee is written in 100000 of percent, for example: 1000 fee means 1% fee.

</TabItem>
</Tabs>

### Print the result

In the code below, we will print all informations on the first pair returned:


<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

pairs = blockchain_apis.pairs()

# There are 100 results per page by default we start at page 1
print(f"Current page: {pairs.page}")
# We print the total amount of pages:
print(f"Total pages: {pairs.total_pages}")
# TIP: You can choose which page you want to get by doing the following:
# pairs = blockchain_apis.pairs(page=2)

# Now we get the first pair available:
pair = pairs.data[0]
print("First pair:")
# The id of the blockchain on which the pair is
print(f"Blockchain ID of pair: {pair.blockchain}")
# The id of the exchange on which the pair is
print(f"Exchange ID of pair: {pair.exchange}")
# A pair contains two tokens: token0 and token1
# In order to be able to execute a trade in any of these pairs, you will need
# to own some token0 or token1.
print(f"Token0 of pair: {pair.token0}")
print(f"Token1 of pair: {pair.token1}")
# The fee taken by liquidity providers during a trade
# The fee is written in 100000 of percents (for example: 1000 is 1%)
print(f"fee: {pair.fee}")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs


async def get_pairs():
    async with BlockchainAPIs() as blockchain_apis:
        pairs = await blockchain_apis.pairs()

        # There are 100 results per page by default we start at page 1
        print(f"Current page: {pairs.page}")
        # We print the total amount of pages:
        print(f"Total pages: {pairs.total_pages}")
        # TIP: You can choose which page you want to get by doing the following:
        # pairs = await blockchain_apis.pairs(page=2)

        # Now we get the first pair available:
        pair = pairs.data[0]
        print("First pair:")
        # The id of the blockchain on which the pair is
        print(f"Blockchain ID of pair: {pair.blockchain}")
        # The id of the exchange on which the pair is
        print(f"Exchange ID of pair: {pair.exchange}")
        # A pair contains two tokens: token0 and token1
        # In order to be able to execute a trade in any of these pairs, you will need
        # to own some token0 or token1.
        print(f"Token0 of pair: {pair.token0}")
        print(f"Token1 of pair: {pair.token1}")
        # The fee taken by liquidity providers during a trade
        # The fee is written in 100000 of percents (for example: 1000 is 1%)
        print(f"fee: {pair.fee}")

asyncio.run(get_pairs())
```

</TabItem>
</Tabs>
