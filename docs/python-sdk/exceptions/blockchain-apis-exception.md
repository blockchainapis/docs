---
title: BlockchainAPIsException
description: Thrown when the API returns us an Exception
---

```py
class BlockchainAPIsException(Exception, ABC):
```

Thrown when the API returns us an Exception

## Params

### error_code

The error code returned by the API
- type: `int`
- example: `None`

### detail

Some details about the error that occured
- type: `str`
- example: `None`

