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
│   ├── ...

```

:::tip
The code of the SDK is open source and can be found at: https://github.com/blockchainapis/blockchain-apis-python-client
:::

### Main class

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

</TabItem>
</Tabs>


