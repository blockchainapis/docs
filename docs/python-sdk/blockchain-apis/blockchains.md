---
title: blockchains
description: Get the list of blockchains supported by the API
keywords:
- Python
- Blockchains
- Ethereum
---

# blockchains

Get the list of blockchains supported by the API.

## Example call

```py
import asyncio

from BlockchainAPIs import BlockchainAPIs

async def print_blockchains():
    blockchain_apis = BlockchainAPIs()
    print(await api.blockchains())
    await blockchain_apis.close()

asyncio.run(print_blockchains())
```

## Return

The list of blockchains supported by the API.

Using this method, you can find the id that you can use for other function calls.

### Return type

List\[[Blockchain](https://api.blockchainapis.io)\]

### Example response

```json
[
    {
        "blockchain": "avalanche",
        "name": "Avalanche",
        "chain_id": 43114,
        "explorer": "https://snowtrace.io/"
    }

]
```
