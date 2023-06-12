---
title: "How to use the SDK"
description: "Learn how to use the Blockchain APIs SDK to do any API call"
sidebar_position: 4
---

At the end of this tutorial, you will know how to use the SDK to do any API call.

## SDK organisation

Here is how the SDK is organised:

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CodeBlock from "@theme/CodeBlock";

<Tabs groupId="programming-language" queryString>
<TabItem value="python" label="Python">

```
blockchainapis
├── BlockchainAPIs.py
├── BlockchainAPIsSync.py
├── exceptions
│   ├── BlockchainAPIsException.py
│   ├── BlockchainNotSupportedException.py
│   ├── ExchangeNotSupportedException.py
│   ├── ...
├── models
│   ├── AmountIn.py
│   ├── AmountOut.py
│   ├── Exchange.py
│   ├── Exchanges.py
│   ├── ...

```

:::tip
The code of the SDK is open source and can be found at: https://github.com/blockchainapis/blockchain-apis-python-client
:::

<Tabs groupId="part" queryString>
<TabItem value="main-class" label="Main Class">

In the tree above, you can see at the root two files:
- `BlockchainAPIs.py`
- `BlockchainAPIsSync.py`

Inside of each of these files you will find methods that allow you to interact with Blockchain APIs.
So you need to instanciate any of these classes this way:

```python showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()
# do some calls
```

Or for async:

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def create_instance():
    async with BlockchainAPIs() as blockchain_apis:
        # do some calls
        pass

asyncio.run(create_instance())
```

:::tip
We advise you to always use the `async` instance which is `BlockchainAPIs` as it is more performant. Use the `sync` instance: `BlockchainAPIsSync`
only if you already have a project and you don't want to bother with `async` Python.
:::

Once you have instantiate the main class, all you need to do in order to make an API call is to call one of the methods of the class.

For example, the method call below will print all of the blockchains:
```py showLineNumbers
from blockchainapis import BlockchainAPIsSync

blockchain_apis = BlockchainAPIsSync()

print(blockchain_apis.blockchains())
```

Or for async:
```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def create_instance():
    async with BlockchainAPIs() as blockchain_apis:
        print(await blockchain_apis.blockchains())

asyncio.run(create_instance())
```

:::tip
You can find all of the available methods in the [SDK Reference](/docs/python-sdk/blockchain-apis/)
:::

Each of the methods from the main class return a model. You can look at how you can use these models by folowing [this link](?part=models)

</TabItem>
<TabItem value="models" label="Models">

In the above tree, you can see a "models" folder. This folder contains the returned values of the API.

Each time you do an API call with the main class, one of the model is returned.

For example, with the call below:
```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def create_instance():
    async with BlockchainAPIs() as blockchain_apis:
        blockchains = await blockchain_apis.blockchains()

asyncio.run(create_instance())
```

The `blockchains` variable is a List containing [Blockchain](/docs/python-sdk/models/blockchain) models.

The [Blockchain](/docs/python-sdk/models/blockchain) model is a [Python dataclass](https://docs.python.org/3/library/dataclasses.html) that looks like this:
```py
@dataclass(slots=True, frozen=True)
class Blockchain
    blockchain: str
    name: str
    chain_id: int
    explorer: str
```

Since `blockchains` is a List (you can know it is a list by looking at the [return value](/docs/python-sdk/blockchain-apis/blockchains#returns) of the [blockchains](/docs/python-sdk/blockchain-apis/blockchains) method call), you can loop through the `blockchains` variable in order to gather some information:

```py showLineNumbers
# Create `blockchains` variable above
for blockchain in blockchains:
    # Here you can get some information, like for example get the id:
    blockchain_id = blockchain.blockchain
    print(blockchain_id)
```

</TabItem>
<TabItem value="exceptions" label="Exceptions">

In the [tree above](#sdk-organisation), you can see an `exceptions` folder, this folder contains all of the Exceptions that can be thrown by the API.

These exceptions are thrown in the following cases:

#### An invalid parameter

For example in the code below:
```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs

async def will_throw():
    async with BlockchainAPIs() as blockchain_apis:
        # Will throw at this line:
        invalid = await blockchain_apis.exchanges(blockchain="invalid_blockchain_id")

asyncio.run(will_throw())
```

Will throw a [BlockchainNotSupportedException](/docs/python-sdk/exceptions/blockchain-not-supported-exception):

```sh
Traceback (most recent call last):
  File "blockchain-apis-examples/examples/3-catch-exceptions/python/catch_exceptions.py", line 10, in <module>
    asyncio.run(will_throw())
  File "/usr/lib/python3.10/asyncio/runners.py", line 44, in run
    return loop.run_until_complete(main)
  File "/usr/lib/python3.10/asyncio/base_events.py", line 646, in run_until_complete
    return future.result()
  File "blockchain-apis-examples/examples/3-catch-exceptions/python/catch_exceptions.py", line 8, in will_throw
    invalid = await blockchain_apis.exchanges(blockchain="invalid_blockchain_id")
  File "blockchain-apis-python-client/src/blockchainapis/BlockchainAPIs.py", line 219, in exchanges
    ret = await self._do_request("/v0/exchanges/", params)
  File "blockchain-apis-python-client/src/blockchainapis/BlockchainAPIs.py", line 119, in _do_request
    raise BlockchainNotSupportedException(response.status, error_data["detail"]["detail"])
blockchainapis.exceptions.BlockchainNotSupportedException.BlockchainNotSupportedException: 422 - Blockchain with id "invalid_blockchain_id" is not supported. You can find a list of valid blockchain ids in /blockchains
```

You can easily catch this exception with the code below:

```py showLineNumbers
import asyncio

from blockchainapis import BlockchainAPIs
# Import the BlockchainNotSupportedException
from blockchainapis.exceptions import BlockchainNotSupportedException

async def will_throw():
    async with BlockchainAPIs() as blockchain_apis:
        try:
            invalid = await blockchain_apis.exchanges(blockchain="invalid_blockchain_id")
        except BlockchainNotSupportedException:
            print("The blockchain with id: `invalid_blockchain_id` is not supported by the API")

asyncio.run(will_throw())
```

#### You make more requests than allowed for your API key

Your API key have a limited amount of requests per second depending on your plan.

Without an API key, you get 40 requests per minute.

The exception thrown when this occurs is this one: [TooManyRequestsException](/docs/python-sdk/exceptions/too-many-requests-exception)

To prevent this Exception, you can:
- Get an API key if you don't have one following this tutorial: [Get your API key](/docs/tutorial/getting-started/get-api-key)
- Increase your plan to get more requests per second [inside of your dashboard](https://dashboard.blockchainapis.io/billing)

#### Your API key is invalid or expired

You get an [UnauthorizedException](/docs/python-sdk/exceptions/unauthorized-exception) if you put an invalid or expired API key.

To prevent this from hapenning, make sure that you copied the right API key from [your dashboard](https://dashboard.blockchainapis.io/api-key)

</TabItem>
</Tabs>

## To summarize

In order to interact with Blockchain APIs, you first need to instanciate the [Main Class](?part=main-class).
Then you can call the method that you want in order to gather the data that you need. Each of the method that you
call will return a [Model](?part=models).

Be careful, sometimes the API might return some [Exceptions](?part=exceptions) that you can catch.

</TabItem>
</Tabs>


