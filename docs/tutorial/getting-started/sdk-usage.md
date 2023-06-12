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

Each of the methods from the main class return a model. You can look at how you can use these models by folowing [this link]([models](?part=models))

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
</Tabs>

</TabItem>
</Tabs>


