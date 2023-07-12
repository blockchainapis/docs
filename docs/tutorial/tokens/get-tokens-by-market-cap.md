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
async def get_tokens_by_market_cap(blockchain: str):
    # We instanciate the Blockchain APIs instance using Python
    # async with feature, this way we are sure that the API instance
    # is closed at the end
    async with BlockchainAPIs() as blockchain_apis:
        # do some stuff...
        pass

asyncio.run(get_tokens_by_market_cap("ethereum"))
```

</TabItem>
</Tabs>

## Step 3: Get the list of tokens ordered by market cap

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Make the call to blockchain_apis in order to get the tokens
# of the ethereum blockchain
tokens = blockchain_apis.tokens(blockchain="ethereum")
```

Here we call the <a href="/docs/python-sdk/blockchain-apis-sync/tokens" target="_blank">tokens</a> method of the Blockchain APIs instance.

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_tokens_by_market_cap(blockchain: str):
    async with BlockchainAPIs() as blockchain_apis:
        # Make the call to blockchain_apis to get the tokens
        tokens = await blockchain_apis.tokens(blockchain=blockchain)

asyncio.run(get_tokens_by_market_cap("ethereum"))
```

Here we call the <a href="/docs/python-sdk/blockchain-apis/tokens" target="_blank">tokens</a> method of the Blockchain APIs instance.

</TabItem>
</Tabs>

### Method parameters

#### page (optional)

To prevent sending a too big result, Blockchain APIs will return only 100 results per pages.

By default, if you don't put any value, Blockchain APIs will return the result of the first page.
With this parameter you can go to another page.

For example to get the second page of results:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

# Get the second page of all of the tokens available
# on the ethereum blockchain
tokens = blockchain_apis.tokens(page=2, blockchain="ethereum")
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def get_tokens_by_market_cap(blockchain: str):
    async with BlockchainAPIs() as blockchain_apis:
        # Get second page of all tokens order by market cap on
        # the given Blockchain
        tokens = await blockchain_apis.tokens(page=2, blockchain=blockchain)

asyncio.run(get_tokens_by_market_cap("ethereum"))
```

</TabItem>
</Tabs>

#### blockchain (optional)

The blockchain from which you are willing to get all of the tokens ordered by
market cap.

This parameter is optional, and if you don't specify it, Blockchain APIs will
return the market cap of all of the tokens supported by Blockchain APIs regardless
of the blockchain.

In our example, we have specified the blockchain with id: `ethereum`

:::tip
If you want to get the list of all of the supported blockchain IDs by Blockchain APIs, you can follow
this tutorial: [Get Supported Blockchains](/docs/tutorial/blockchains/get-supported-blockchains)
:::

## Step 4: Retrieve result

### The returned model

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

The <a href="/docs/python-sdk/blockchain-apis-sync/tokens" target="_blank">tokens</a> method returns a <a href="/docs/python-sdk/models/tokens" target="_blank">Tokens</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Tokens
    page: int
    total_pages: int
    data: List[Token]
```

In this structure, you have:
- `page`: The current page that we are at
- `total_pages`: The total amount of pages. If you want all of the tokens, you can use this value to loop to get all
                 available pages of tokens.
- `data`: Contains the List of [Token](/docs/python-sdk/models/token) for the given page.

The [Token](/docs/python-sdk/models/token) model contains all of the informations that are required on a specific token. Here is his structure:

```py
@dataclass(slots=True, frozen=True)
class Token
    blockchain: str
    address: str
    decimals: int
    market_cap: Decimal
```

#### blockchain

The id of the blockchain that the pair is.

#### address

The address of the pair

#### decimals

The amount of decimals that the token has

#### market_cap

The market cap of the pair. It the market cap in USDT, and is written in Decimal format.

:::info
The market_cap is the only value returned by Blockchain APIs that is in a `Decimal` format.

We use the Python built-in `Decimal` class to maximize precision.
:::

</TabItem>
<TabItem value="async-python" label="Python-Async">

The <a href="/docs/python-sdk/blockchain-apis/tokens" target="_blank">tokens</a> method returns a <a href="/docs/python-sdk/models/tokens" target="_blank">Tokens</a> model.

Here is his structure:
```py
@dataclass(slots=True, frozen=True)
class Tokens
    page: int
    total_pages: int
    data: List[Token]
```

In this structure, you have:
- `page`: The current page that we are at
- `total_pages`: The total amount of pages. If you want all of the tokens, you can use this value to loop to get all
                 available pages of tokens.
- `data`: Contains the List of [Token](/docs/python-sdk/models/token) for the given page.

The [Token](/docs/python-sdk/models/token) model contains all of the informations that are required on a specific token. Here is his structure:

```py
@dataclass(slots=True, frozen=True)
class Token
    blockchain: str
    address: str
    decimals: int
    market_cap: Decimal
```

#### blockchain

The id of the blockchain that the pair is.

#### address

The address of the pair

#### decimals

The amount of decimals that the token has

#### market_cap

The market cap of the pair. It the market cap in USDT, and is written in Decimal format.

:::info
The market_cap is the only value returned by Blockchain APIs that is in a `Decimal` format.

We use the Python built-in `Decimal` class to maximize precision.
:::

</TabItem>
</Tabs>

### Print the result

In order to print the result, we built a pretty-print function that will print the result inside
of an array:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from typing import List

from blockchainapis.models import Token

def pretty_print_tokens(tokens: List[Token]):
    """Print the given tokens inside of an array

    :param token: The list of tokens to print
    :type token: Token
    """
    widths = [42, 15, 8, 24]
    print(f'| {"Token Address":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Decimals":<{widths[2]}} | {"Market Cap":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for token in tokens:
        print(f'| {token.address:<{widths[0]}} | {token.blockchain:<{widths[1]}} | {token.decimals:<{widths[2]}} | {token.market_cap:<{widths[3]}} |')
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
from typing import List

from blockchainapis.models import Token

def pretty_print_tokens(tokens: List[Token]):
    """Print the given tokens inside of an array

    :param token: The list of tokens to print
    :type token: Token
    """
    widths = [42, 15, 8, 24]
    print(f'| {"Token Address":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Decimals":<{widths[2]}} | {"Market Cap":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for token in tokens:
        print(f'| {token.address:<{widths[0]}} | {token.blockchain:<{widths[1]}} | {token.decimals:<{widths[2]}} | {token.market_cap:<{widths[3]}} |')
```

</TabItem>
</Tabs>

Then we add a call to our pretty print method inside of our code:

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```py showLineNumbers
from typing import List

from blockchainapis import BlockchainAPIsSync
from blockchainapis.models import Token

def pretty_print_tokens(tokens: List[Token]):
    widths = [42, 15, 8, 24]
    print(f'| {"Token Address":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Decimals":<{widths[2]}} | {"Market Cap":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for token in tokens:
        print(f'| {token.address:<{widths[0]}} | {token.blockchain:<{widths[1]}} | {token.decimals:<{widths[2]}} | {token.market_cap:<{widths[3]}} |')

blockchain_apis = BlockchainAPIsSync()

tokens = blockchain_apis.tokens(blockchain="ethereum")

# Print the current page that we are at.
print(f"Current page: {tokens.page}")

# Print the total amount of pages:
print(f"Total pages: {tokens.total_pages}")

# tokens.data contains the list of tokens, we use the pretty_print_token
# method in order to pretty print the top 10 tokens
# highlight-next-line
pretty_print_tokens(tokens.data[:10])
```

</TabItem>
<TabItem value="async-python" label="Python-Async">

```py showLineNumbers
import asyncio

from typing import List

from blockchainapis import BlockchainAPIs
from blockchainapis.models import Token

def pretty_print_tokens(tokens: List[Token]):
    widths = [42, 15, 8, 24]
    print(f'| {"Token Address":<{widths[0]}} | {"Blockchain ID":<{widths[1]}} | {"Decimals":<{widths[2]}} | {"Market Cap":<{widths[3]}} |')
    print(f'| {"-" * widths[0]} | {"-" * widths[1]} | {"-" * widths[2]} | {"-" * widths[3]} |')
    for token in tokens:
        print(f'| {token.address:<{widths[0]}} | {token.blockchain:<{widths[1]}} | {token.decimals:<{widths[2]}} | {token.market_cap:<{widths[3]}} |')


async def get_tokens_by_market_cap(blockchain: str):
    async with BlockchainAPIs() as blockchain_apis:
        tokens = await blockchain_apis.tokens(blockchain=blockchain)
        
        # Print the current page that we are at.
        print(f"Current page: {tokens.page}")

        # Print the total amount of pages:
        print(f"Total pages: {tokens.total_pages}")

        # tokens.data contains the list of tokens, we use the pretty_print_token
        # method in order to pretty print the top 10 tokens
        # highlight-next-line
        pretty_print_tokens(tokens.data[:10])

asyncio.run(get_tokens_by_market_cap("ethereum"))
```

</TabItem>
</Tabs>


