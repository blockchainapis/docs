---
title: BlockchainAPIsException
description: Thrown when the API returns us an Exception
sidebar_position: 5
---

```py
class BlockchainAPIsException(Exception, ABC):
```

Thrown when the API returns us an Exception

## Params

### status_code

The status code returned by the API
- type: `int`
- example: `None`

### detail

Some details about the error that occured
- type: `str`
- example: `None`

