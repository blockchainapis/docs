---
title: TooManyRequestsException
description: Thrown when you are doing more request than you are allowed to the API.
sidebar_position: 7
---

```py
class TooManyRequestsException(BlockchainAPIsException):
```

Thrown when you are doing more request than you are allowed to the API.

To prevent this exception you can:
- Lower the amount of requests that you make to the API per second
- Upgrade your subscription at: https://dashboard.blockchainapis.io/

## Params

### status_code

The error code returned by the call to the API
- type: `int`
- example: ` 429
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    Too many requests
    `

