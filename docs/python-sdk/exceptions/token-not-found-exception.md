---
title: TokenNotFoundException
description: Thrown when you try to get informations on a token that does not exist inside of our database.
---

```py
class TokenNotFoundException(BlockchainAPIsException):
```

Thrown when you try to get informations on a token that does not exist inside of our database.

At BlockchainAPIs, we only handle tokens that are inside of a liquidity pool.

You can get a list of all of the available tokens by calling `/tokens`

## Params

### status_code

The error code returned by the call to the API
- type: `str`
- example: ` 404
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    Token 0x8E870D67F660D95d5be530380D0eC0bd388289E1 not found for blockchain ethereum
    `

