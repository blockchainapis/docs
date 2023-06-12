---
title: UnauthorizedException
description: Thrown when you are trying to make an API request with an invalid or expiredAPI key.
sidebar_position: 7
---

```py
class UnauthorizedException(BlockchainAPIsException):
```

Thrown when you are trying to make an API request with an invalid or expired
API key.

To prevent this exception, you can:
- Make the request without an API key
- Update/get a valid API key at: https://dashboard.blockchainapis.io/

## Params

### status_code

The error code returned by the call to the API
- type: `str`
- example: ` 401
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    Unauthorized
    `

