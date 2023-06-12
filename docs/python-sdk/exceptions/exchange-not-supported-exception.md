---
title: ExchangeNotSupportedException
description: Thrown when an Invalid exchange id is given during a call to the API.
sidebar_position: 3
---

```py
class ExchangeNotSupportedException(BlockchainAPIsException):
```

Thrown when an Invalid exchange id is given during a call to the API.

To get the list of supported exchange ids, call `/exchanges`

## Params

### status_code

The error code returned by the call to the API
- type: `str`
- example: ` 422
    `

### detail

Some details about the error that occured
- type: `str`
- example: `
    Exchange with id "test" is not supported. You can get the list of valid exchange ids in /exchanges
    `

