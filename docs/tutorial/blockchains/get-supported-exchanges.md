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

:::tip
If you are just looking for the code, you can find it inside of the [examples](https://github.com/blockchainapis/blockchain-apis-examples/tree/master/examples/3-get-supported-exchanges) repository.
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

## Step 4: Retrieve the result

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

The <a href="/docs/python-sdk/blockchain-apis-sync/exchanges" target="_blank">exchanges</a> method returns an <a href="/docs/python-sdk/models/exchanges" target="_blank">Exchanges</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Exchanges
    page: int
    total_pages: int
    data: List[Exchange]
```

In this structure, you have:
- `page`: The current page that we are at (this value will always be `1` for this version of the API)
- `total_pages`: The total amount of pages (this value will always be `1` for this version of the API)

What really interest us in here, is the `data` List, it contains the list of [Exchange](/docs/python-sdk/models/exchange) model. This
model contains all of the informations that we want to retrieve on all exchanges.

Here is the [Exchange](/docs/python-sdk/models/exchange) model structure:

```py
@dataclass(slots=True, frozen=True)
class Exchange
    exchange: str
    blockchain: str
    name: str
    url: str
```
Once you have the result, you can create a method to pretty-print it:

```py
def pretty_print_exchanges(exchanges: Exchanges):
    """Allow to pretty print exchanges in a nice array

    :param exchanges: The exchanges that we got from the API and that we are trying to print
    :type exchanges: Exchanges
    """
    widths = [25, 15, 15, 45]
    print(f'| {"Exchange ID":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Exchange Name":<{widths[2]}} | {"Exchange URL":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    # Loop through the data
    for exchange in exchanges.data:
        # First is the exchange ID
        # Second is the blockchain ID
        # Third is the name of the exchange
        # Fourth is the url of the exchange
        print(f'| {exchange.exchange:<{widths[0]}} | {exchange.blockchain:<{widths[1]}} | {exchange.name:<{widths[2]}} | {exchange.url:<{widths[3]}} |')
```

And then call the `pretty_print_exchanges` function:
```py
from blockchainapis import BlockchainAPIsSync
from blockchainapis.models import Exchanges


def pretty_print_exchanges(exchanges: Exchanges):
    widths = [25, 15, 15, 45]
    print(f'| {"Exchange ID":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Exchange Name":<{widths[2]}} | {"Exchange URL":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for exchange in exchanges.data:
        print(f'| {exchange.exchange:<{widths[0]}} | {exchange.blockchain:<{widths[1]}} | {exchange.name:<{widths[2]}} | {exchange.url:<{widths[3]}} |')


blockchain_apis = BlockchainAPIsSync()
exchanges = blockchain_apis.exchanges()
# highlight-next-line
pretty_print_exchanges(exchanges)

```
</TabItem>
<TabItem value="async-python" label="Python-Async">

The <a href="/docs/python-sdk/blockchain-apis/exchanges" target="_blank">exchanges</a> method returns an <a href="/docs/python-sdk/models/exchanges" target="_blank">Exchanges</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Exchanges
    page: int
    total_pages: int
    data: List[Exchange]
```

In this structure, you have:
- `page`: The current page that we are at (this value will always be `1` for this version of the API)
- `total_pages`: The total amount of pages (this value will always be `1` for this version of the API)

What really interest us in here, is the `data` List, it contains the list of [Exchange](/docs/python-sdk/models/exchange) model. This
model contains all of the informations that we want to retrieve on all exchanges.

Here is the [Exchange](/docs/python-sdk/models/exchange) model structure:

```py
@dataclass(slots=True, frozen=True)
class Exchange
    exchange: str
    blockchain: str
    name: str
    url: str
```

Once you have the result, you can create a method to pretty-print it:

```py
def pretty_print_exchanges(exchanges: Exchanges):
    """Allow to pretty print exchanges in a nice array

    :param exchanges: The exchanges that we got from the API and that we are trying to print
    :type exchanges: Exchanges
    """
    widths = [25, 15, 15, 45]
    print(f'| {"Exchange ID":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Exchange Name":<{widths[2]}} | {"Exchange URL":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    # Loop through the data
    for exchange in exchanges.data:
        # First is the exchange ID
        # Second is the blockchain ID
        # Third is the name of the exchange
        # Fourth is the url of the exchange
        print(f'| {exchange.exchange:<{widths[0]}} | {exchange.blockchain:<{widths[1]}} | {exchange.name:<{widths[2]}} | {exchange.url:<{widths[3]}} |')
```

And then call the `pretty_print_exchanges` function:
```py
import asyncio

from blockchainapis import BlockchainAPIs
from blockchainapis.models import Exchanges

def pretty_print_exchanges(exchanges: Exchanges):
    widths = [25, 15, 15, 45]
    print(f'| {"Exchange ID":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Exchange Name":<{widths[2]}} | {"Exchange URL":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for exchange in exchanges.data:
        print(f'| {exchange.exchange:<{widths[0]}} | {exchange.blockchain:<{widths[1]}} | {exchange.name:<{widths[2]}} | {exchange.url:<{widths[3]}} |')


async def get_exchanges():
    async with BlockchainAPIs() as blockchain_apis:
        exchanges = await blockchain_apis.exchanges()
        # highlight-next-line
        pretty_print_exchanges(exchanges)

asyncio.run(get_exchanges())
```

</TabItem>
</Tabs>


